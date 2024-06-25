import axios from "axios";
import { toast } from "react-hot-toast";
import { getCurrentDate } from "../time";
import { destructureSlug } from "../generateSlug";



export const getUserData=async(shardId)=>{
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${shardId}`);
        console.log("USER PROFILE RESPONSE-->",data);
        return data;
      
       } catch (error) {
            return {error:true,message:error.message};
       }
}

export const getUserContestDetails=async(shardId)=>{
    try {
     const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contest/user/${shardId}`);
     console.log("CONTEST USER RESPONSE-->",data);
     return data;
   
    } catch (error) {
         return {error:true,message:error.message};
    }
  }
  
  