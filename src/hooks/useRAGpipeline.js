import { useSelector } from "react-redux";
// import { JSONLoader } from "langchain/document_loaders/fs/json";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatOpenAI } from "@langchain/openai";
import * as hub from "langchain/hub";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const LANGSMITH_API_KEY = import.meta.env.VITE_LANGSMITH_API_KEY;
const LANGSMITH_TRACING = true;

const useRAGpipeline = () => {
  const gamesDatabase = useSelector((store) => store.games);
  // console.log(gamesDatabase);

  const createPrompt = async () => {
    const promptTemplate = await hub.pull("rlm/rag-prompt");
    const fullPrompt = await promptTemplate.invoke({
      context: "(context goes here)",
      question: "(question goes here)",
    });
    const message = promptTemplate.messages;
  };

  // Loading and parsing the JSON data
  const documents =
    gamesDatabase &&
    gamesDatabase.map(
      (game) =>
        new Document({
          id: `${game.id}`,
          pageContent: { ...game }, // Combine relevant fields into pageContent
          metadata: `${game.title}: ${game.short_description}`, // Optional: include additional metadata
        })
    );
  //   console.log(documents);

  // Initializing the OPENAI embedding model
  const embeddingModel = new OpenAIEmbeddings({
    apiKey: OPENAI_API_KEY,
    batchSize: 512,
    model: "text-embedding-3-large",
  });

  // Initializing vector store with embedding model (FAISS)
  const vectorStore = new FaissStore(embeddingModel, {});

  // const openaiLLM = new ChatOpenAI({
  //   model: "gpt-4o-mini",
  //   temperature: 0,
  // });

  // Funtion to split the json into chunks
  const splitJsonToChunks = async (gamesDatabase) => {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    console.log(gamesDatabase);

    // const docs = [{ pageContent: gamesDatabase }];
    // console.log("docs: ", docs);

    const allSplits = await textSplitter.splitDocuments(gamesDatabase);
    console.log(allSplits.length);
    console.log(allSplits);
    return allSplits;
  };
  const splitData = splitJsonToChunks(documents);

  const addDocumenttoVectorStore = async () => {
    await vectorStore.addDocuments(splitData);
  };
};

export default useRAGpipeline;
