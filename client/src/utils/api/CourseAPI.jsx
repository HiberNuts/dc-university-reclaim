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
export const getAllCourseWithPagination = async (page=1,limit=3) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/allCourses/pagination?page=${page}&limit=${limit}`);
    if (data.courses) {
      return data;
    } else {
      return {
        courses:[],
        totalItems:0
      };
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
export const getCoursebyIdAPI = async (id) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/getCourse?courseId=${id}`);
    if (data.course) {
      return data.course;
    }
  } catch (error) {
    toast.error("Something went wrong");
    return error;
  }
};

export const enrollCourseAPI = async ({ courseId, userId, accessToken }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/courseEnrolled`,
      {
        courseId: courseId,
        userId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
    // toast.success(data?.message);
  } catch (error) {
    // toast.error("Something went wrong while enrolling Course, Please try again");
    return error;
  }
};

export const courseProgressAPI = async ({ courseId, userId, accessToken }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/progress`,
      {
        courseId: courseId,
        userId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    // toast.error("Something went wrong while enrolling Course, Please try again");
    return error;
  }
};

export const updateCourseProgressAPI = async ({ updatesUserPorgress, courseId, userId, accessToken }) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/user/updateProgress`,
      {
        courseId,
        userId,
        updatedEnrolledCourse: updatesUserPorgress,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    // toast.error("Something went wrong!");
    return error;
  }
};

export const getUserCourseProgressPercentage = async ({ courseId, userId, accessToken }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/progressPercentage`,
      {
        courseId,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    // toast.error("Something went wrong!");
    return error;
  }
};

export const MintUserNftAPI = async ({ courseId, accessToken, walletAddress }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/mintNft`,
      {
        courseId,
        walletAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (data?.minted == true) {
      toast.success(data.message);
    }

    return data;
  } catch (error) {
    // toast.error("Something went wrong!");
    return error;
  }
};
