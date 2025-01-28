import { useSelector } from "react-redux";
// import { JSONLoader } from "langchain/document_loaders/fs/json";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { concat } from "@langchain/core/utils/stream";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Annotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import * as hub from "langchain/hub";

const promptTemplate = await hub.pull("rlm/rag-prompt");
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const LANGSMITH_API_KEY = import.meta.env.VITE_LANGSMITH_API_KEY;
const LANGSMITH_TRACING = true;

const useRAGpipeline = () => {
  const gamesDatabase = useSelector((store) => store.games);
  // console.log(gamesDatabase);

  //! Loading and parsing the JSON data
  const documents =
    gamesDatabase &&
    gamesDatabase.map(
      (game) =>
        new Document({
          id: `${game?.id}`,
          pageContent: { ...game }, // Combine relevant fields into pageContent
          metadata: `${game.title}: ${game.short_description}`, // Optional: include additional metadata
        })
    );
  //   console.log(documents);

  //! Funtion to split the json into chunks
  const splitJsonToChunks = async (documents) => {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
    });

    const allSplits = await textSplitter.splitDocuments(documents);
    console.log("Split length: ", allSplits.length);
    console.log("All splits: ", allSplits);
    return allSplits;
  };

  //! Initializing the OPENAI embedding model
  const embeddingModel = new OpenAIEmbeddings({
    apiKey: OPENAI_API_KEY,
    batchSize: 512,
    model: "text-embedding-3-large",
  });

  //! Embedding and storing document in Faiss Store
  const addDocumentsToMemoryVectorStore = async () => {
    try {
      const splitData = await splitJsonToChunks(documents);
      console.log("Split GameData: ", splitData);

      const vectorStore = await MemoryVectorStore.fromDocuments(
        splitData,
        embeddingModel
      );
      console.log("Documents successfully added to the Faiss vector store.");
      console.log("VectorStore: ", vectorStore);
      return vectorStore;
    } catch (error) {
      console.error("Error embedding documents:", error);
    }
  };
  const vectorStore = addDocumentsToMemoryVectorStore();
  console.log("VectorStore: ", vectorStore);

  //! Example: Asynchronous Retrieval
  const retrieve = async (question) => {
    try {
      const vectorStore = addDocumentsToMemoryVectorStore(); // Ensure vectorStore is ready
      const retrievedDocs = await vectorStore.similaritySearch(question, 5); // Retrieve 5 most similar documents
      return { context: retrievedDocs };
    } catch (error) {
      console.error("Error during retrieval:", error);
      return { context: [] };
    }
  };

  const exampleQuery = async () => {
    const response = await retrieve("What are the best games for kids?");
    console.log("Retrieved Context:", response.context);
  };

  exampleQuery;

  // const InputStateAnnotation = Annotation.Root({
  //   question: Annotation<string>,
  // });

  // const StateAnnotation = Annotation.Root({
  //   question: Annotation<string>,
  //   context: Annotation<Document[]>,
  //   answer: Annotation<string>,
  // });

  //   const retrieve = async (state) => {
  //     const retrievedDocs = await vectorStore.similaritySearch(state.question);
  //     return { context: retrievedDocs };
  //   };

  // const generate = async (state) => {
  //   const docsContent = state.context.map((doc) => doc.pageContent).join("\n");
  //   const messages = await promptTemplate.invoke({
  //     question: state.question,
  //     context: docsContent,
  //   });
  //   const response = await llm.invoke(messages);
  //   return { answer: response.content };
  // };

  // //! Creating the user prompt
  // const createPrompt = async () => {
  //   const fullPrompt = await promptTemplate.invoke({
  //     context: "(context goes here)",
  //     question: "(question goes here)",
  //   });
  //   const message = promptTemplate.messages;
  // };

  // const addDocumenttoVectorStore = async () => {
  //   await vectorStore.addDocuments(splitData);
  // };
};

export default useRAGpipeline;
