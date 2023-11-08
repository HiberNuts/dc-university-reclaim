import axios from "axios";
import { toast } from "react-hot-toast";
export const getAllCourse = async () => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_CMS_URL
      }/courses?populate[whatYouLearn][populate]=*&populate[faq][populate]=*&populate[banner][populate]=*`
    );
    if (data) {
      return data.data;
    }
  } catch (error) {
    toast.error("Something went wrong");
    return error;
  }
};

export const getCoursebyName = async (title) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_CMS_URL}/courses?filters[title][$eq]=${title.split("-").join(" ")}&populate=deep`
    );
    if (data) {
      return data.data[0];
    }
  } catch (error) {
    toast.error("Something went wrong");
    return error;
  }
};
