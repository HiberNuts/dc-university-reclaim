import axios from "axios";

export const getUserData = async (shardId) => {
     try {
          const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${shardId}`);
          return data;

     } catch (error) {
          return { error: true, message: error.message };
     }
}

export const getUserContestDetails = async (shardId) => {
     try {
          const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contest/user/${shardId}`);
          return data;

     } catch (error) {
          return { error: true, message: error.message };
     }
}

