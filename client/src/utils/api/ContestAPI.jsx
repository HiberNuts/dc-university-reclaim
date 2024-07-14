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


export const getLatestContestsStrapi = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_CMS_URL}/contests?populate=*&pagination[limit]=3&sort[0]=createdAt:desc`
      );
  
      return data;
    } catch (error) {
      return error;
    }
  };

export const getLatestContestStrapi = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_CMS_URL}/contests?populate=*&pagination[limit]=1&sort[0]=createdAt:desc`
      );
  
      return data;
    } catch (error) {
      return error;
    }
  };

export const getPastContestsStrapi=async ()=>{
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

// PREVIEW STRAPI CALLS START 
export const getAllPreviewContest=async()=>{
   try {
    const {data}=await axios.get(`${import.meta.env.VITE_CMS_URL}/contests?publicationState=preview&filters[publishedAt][$null]=true&populate=deep`);
    console.log("DATA :",data);
    return data;
   } catch (error) {
     return error;
   }
}

export const getPreviewContest=async(contestID)=>{
  try {
    const {data}=await axios.get(`${import.meta.env.VITE_CMS_URL}/contests/${contestID}?publicationState=preview&filters[publishedAt][$null]=true&populate=deep`);
    console.log("DATA :",data);
    return data;
  } catch (error) {
    return error;
  }
}

export const getProgramScreenData=async(contestID)=>{
  try {
    // Fetch contest data
    const { data: contestData } = await axios.get(`${import.meta.env.VITE_CMS_URL}/contests/${contestID}?publicationState=preview&filters[publishedAt][$null]=true&populate=deep`);
    
    // Fetch program data with contestID filter
    const { data: programData } = await axios.get(`${import.meta.env.VITE_CMS_URL}/programs?publicationState=preview&filters[contestid][$eq]=${contestID}&filters[publishedAt][$null]=true`);
    
    // Combine contest data with the matching program data
    const combinedData = {
      ...contestData,
      program: programData.data
    };
    
    console.log("COMBINED DATA:", combinedData);
    return combinedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
   
}

// PREVIEW STRAPI ENDS 


// export const getContestProgram=async(id)=>{
//     try {
//       const {data}=await axios.get(
//         `${import.meta.env.VITE_CMS_URL}/programs?populate=*&filters[contestid][$eq]=${id}`
//       );
//       return data;
//     } catch (error) {
//        return error;
//     }
// }
//BACKEND
export const getLatestContest=async()=>{
  try {
    const {data}=await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/contest/latest`
    );
    // console.log("BACKEND LATEST CONTEST-->",data);
    return data;
  } catch (error) {
     return {error:true,message:error?.message};
  }
}
export const upcomingContests=async()=>{
   try {
      const {data}=await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/contest/upcoming/10`
      );
      // console.log("BACKEND UPCOMING CONTEST-->",data);
      return data;
   } catch (error) {
     return {error:true,message:error?.message};
   }
}
export const getPastContests=async(page=1,limit=3)=>{
   try {
      const {data}=await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/contest/getPastContests?page=${page}&limit=${limit}`
      );
      // console.log("BACKEND PAST CONTEST-->",data);
      return data
   } catch (error) {
     return {error:true,message:error?.message};
   }
}
export const getContestByTitle=async(title=null)=>{
   try {
      const {data}=await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/contest/getContest/${destructureSlug(title)}`
      );
      // console.log("BACKEND CONTEST DATA BY TITLE-->",data);
      return data;
   } catch (error) {
      return {error:true,message:error?.message};
   }
}
export const getContestProgram=async(AccessToken,submissionId)=>{
   try {
    const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/program/getProgram`,{submissionId:submissionId},{
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      }});
    // console.log("RESPOSNE FOR PROGRAM PAGE--->",data);
       return data;
   } catch (error) {
      return {error:true,message:error?.message};
   }
}
export const getContestSolution=async(title)=>{
  try {
    const {data}=await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/contest/solution?title=${destructureSlug(title)}`
    );
    return data;
 } catch (error) {
    return {error:true,message:error?.message};
 }
}
export const registerContest=async(AccessToken,contestId=null)=>{
   try {
    if(contestId!=null)
      {
          const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contest/register`,{contest:contestId}, {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
            }});
          return data;
      }
   } catch (error) {
      return {error:true,message:error?.response?.statusText}
   }
}
export const alreadyRegistered=async(AccessToken,contestId=null)=>{
  try {
    if(contestId!=null)
      {
          console.log("CHECKING REGISTRATION OF  CONTEST[+]");
          const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contest/alreadyRegistered`,{contest:contestId}, {
            headers: {
              Authorization: `Bearer ${AccessToken}`,
            }});
          console.log("RESPOSNE FOR CHECKING[-] ",data);
          return data;
      }
  } catch (error) {
      console.log("ERR IN CHECKING: ",error);
      return {error:true,message:error?.response?.statusText};
  }
}

export const getLeaderboard=async(contestID)=>{
  try {
   const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contest/leaderboard?id=${contestID}`);
  //  console.log("LEADER BOARD RESPONSE-->",data);
   return data;
 
  } catch (error) {
       return {error:true,message:error.message};
  }
}


//COMPILER HELPER FUNCITONS
  
export const compile = async (code) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/compile`, { content: code });
      
      // console.log("RESPONSE FOR COMPILATION-->", res);
      if (res.status === 200) {
        if(res.data.errors)
        {
          return { error: true,message:res.data.errors[0].formattedMessage?.replace(/\n/g, '<br\>')};
        }  
        let byteCode=res.data.contracts["test.sol"].TestContract.evm.bytecode.object;
        return { error: false,byteCode:byteCode,message: "Compiled Successfully" };
      }
    } catch (error) {
      console.error("Compile Error-->", error);
      return { error: true, message: "Failed to compile" };
    }
  };

export const compileAndSubmit=async(code,submissionID,address)=>{
    try{
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/compile-and-test`,{userCode:code,submissionId:submissionID,walletAddress:address});
      
      // console.log("RESPONSE FOR COMPILATION & TEST-->", res);
      return res.data;
      
    } catch (error) {
      console.error("Compile Error-->", error);
      return { error: true, message: "Failed to compile" };
    }
  }
