import axios from "axios";
import { toast } from "react-hot-toast";
import { getCurrentDate } from "../time";
import { destructureSlug } from "../generateSlug";

export const getContests = async (title = null) => {
  try {
    let endpoint = "/contests?populate=*";
    if (title) endpoint = `/contests?populate=*&filters[title][$eq]=${destructureSlug(title)}`;
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

export const getPastContests=async ()=>{
  try {
    const currentDateTime=getCurrentDate();
    const { data } = await axios.get(
      `${import.meta.env.VITE_CMS_URL}/contests?populate=*&sort[0]=createdAt:desc&filters[endDate][$lt]=${currentDateTime}`
    );
    return data;

  } catch (error) {
    return error;
  }
}  

export const getContestProgram=async(id)=>{
    try {
      const {data}=await axios.get(
        `${import.meta.env.VITE_CMS_URL}/programs?populate=*&filters[contestid][$eq]=${id}`
      );
      return data;
    } catch (error) {
       return error;
    }
}

export const compile = async (code) => {
  try {
    console.log("COMPILER CODE--->", code);
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/compile`, { content: code });
    
    console.log("RESPONSE FOR COMPILATION-->", res);
    if (res.status === 200) {
      let byteCode=res.data.contracts["test.sol"].NewContract.evm.bytecode.object;
      return { error: false,byteCode:byteCode,message: "Compiled Successfully" };
    }
  } catch (error) {
    console.error("Compile Error-->", error);
    return { error: true, message: "Failed to compile" };
  }
};

export const registerContest=async(AccessToken,contestId)=>{
   try {
    console.log("REGISTERING CONTEST[+]");
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contest/register`,{contest:contestId}, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      }});
    console.log("RESPOSNE FOR REGISTERING[-] ",res);
    return res.data;
   } catch (error) {
      console.log("ERROR IN REGISTERING[-]");
      console.log(error.message);
      return {error:true,message:error.message}
   }
}