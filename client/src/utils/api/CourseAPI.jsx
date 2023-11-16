import axios from "axios";
import { toast } from "react-hot-toast";

export const getAllCourseStrapi = async () => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_CMS_URL
      }/courses?populate[whatYouLearn][populate]=*&populate[faq][populate]=*&populate[banner][populate]=*`
    );
    if (data) {
      return data.data;
    } else {
      return [];
    }
  } catch (error) {
    toast.error("Something went wrong");
    return [];
  }
};

export const getCoursebyNameStrapi = async (title) => {
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

export const getAllCourse = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/allCourses`);
    if (data.courses) {
      return data?.courses;
    } else {
      return [];
    }
  } catch (error) {
    toast.error("Something went wrong");
    return [];
  }
};

export const getCoursebyName = async (title) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/course/getCourse/${title.split("-").join(" ")}`
    );
    if (data.course) {
      return data.course;
    }
  } catch (error) {
    toast.error("Something went wrong");
    return error;
  }
};
