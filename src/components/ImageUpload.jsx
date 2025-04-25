const ImageUpload = ({ uploadImageHandler }) => {
  const showImageHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImageHandler(file);
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
      <label
        htmlFor="fileInput"
        className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all"
      >
        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={showImageHandler}
        />
        <span className="font-medium text-gray-700">
          Click or Drag to upload your image
        </span>
      </label>
    </div>
  );
};

export default ImageUpload;
