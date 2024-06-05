import axios from "axios";
import { toast } from "react-hot-toast";

export const getContests = async (id = null) => {
  try {
    let endpoint = "/contests?populate=*";
    if (id) endpoint = `/contests/${id}?populate=*`;
    const { data } = await axios.get(
      `${import.meta.env.VITE_CMS_URL}${endpoint}`
    );

    return data;
  } catch (error) {
    return error;
  }
};


export const getLatestContests = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_CMS_URL}/contests?populate=*&pagination[limit]=3&sort[0]=createdAt:desc`
      );
  
      return data;
    } catch (error) {
      return error;
    }
  };

  export const getLatestContest = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_CMS_URL}/contests?populate=*&pagination[limit]=1&sort[0]=createdAt:desc`
      );
  
      return data;
    } catch (error) {
      return error;
    }
  };
