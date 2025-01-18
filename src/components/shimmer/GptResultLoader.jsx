import gptLoader from "../../assets/gpt-loader.webm";

const GptResultLoader = () => {
  return (
    <div>
      <video
        src={gptLoader}
        autoPlay
        loop
        muted
        playsInline
        className="w-64"
      ></video>
    </div>
  );
};

export default GptResultLoader;
