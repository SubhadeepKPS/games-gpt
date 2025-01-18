import loader from "../../assets/Loader.webm";
const PageLoader = () => {
  return (
    <div>
      <video src={loader} autoPlay loop muted playsInline></video>
    </div>
  );
};

export default PageLoader;
