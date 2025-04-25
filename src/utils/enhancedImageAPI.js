import axios from "axios";
import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = `https://techhk.aoscdn.com/`;
const MAXIMUM_RETRIES = 20;

export const enhancedImageAPI = async (file) => {
  try {
    // call api and enhanced image
    const taskId = await uploadImage(file);
    console.log(`Image uploaded successfully Task ID: ${taskId}`);
    const enhancedImageData = await PollForEnhancedImage(taskId);
    console.log(`Enhanced Image Data:`, enhancedImageData);
    return enhancedImageData.image;
  } catch (error) {
    console.log("Error enhancing image", error.message);
    toast.error(error.message);
  }
};

const uploadImage = async (file) => {
  // code to upload image
  // api/tasks/visual/scale -- post
  const formData = new FormData();
  formData.append("image_file", file);
  const { data } = await axios.post(
    `${BASE_URL}api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );
  if (!data?.data.task_id) {
    throw new Error("Failed to upload image. Task id not found");
  }
  return data.data.task_id;
};

const fetchEnhancedImage = async (task_id) => {
  // fetch enhanced image
  // /api/tasks/visual/scale/{task_id} -- get
  const { data } = await axios.get(
    `${BASE_URL}api/tasks/visual/scale/${task_id}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );
  console.log(data);
  if (!data?.data) {
    throw new Error(`Failed to fetched enhanced image! Image not found`);
  }
  return data.data;
};

const PollForEnhancedImage = async (taskId, retries) => {
  const result = await fetchEnhancedImage(taskId);

  if (result.state === 4) {
    console.log(`Processing...(${retries}/${MAXIMUM_RETRIES}) `);

    if (retries >= MAXIMUM_RETRIES) {
      throw new Error("Max retries reached. Please try again.");
    }

    // wait 2 second
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return PollForEnhancedImage(taskId, retries + 1);
  }

  return result;
};
