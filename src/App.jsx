import Home from "./components/Home";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          AI Image enhancer
        </h1>
        <p className="text-lg text-gray-500">
          Upload your Image and let AI enhance to in second
        </p>
      </div>
      <Home />
      <div className="text-center mt-5">
        <h2 className="text-lg text-gray-800">Powered by Image Inhancer</h2>
        <p className="text-lg text-gray-500">
          Developer ♥{" "}
          <a
            href="https://www.github.com/ashrafulislam08"
            className="underline"
          >
            Ashraful Islam
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
