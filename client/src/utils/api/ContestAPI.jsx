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
    console.log("BACKEND LATEST CONTEST-->",data);
    return data;
  } catch (error) {
     return {error:true,message:error?.message};
  }
}
export const upcomingContests=async()=>{
   try {
      const {data}=await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/contest/upcoming/3`
      );
      console.log("BACKEND UPCOMING CONTEST-->",data);
      return data;
   } catch (error) {
     return {error:true,message:error?.message};
   }
}
export const getPastContests=async()=>{
   try {
      const {data}=await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/contest/getPastContests`
      );
      console.log("BACKEND PAST CONTEST-->",data);
      return data;
   } catch (error) {
     return {error:true,message:error?.message};
   }
}
export const getContestByTitle=async(title=null)=>{
   try {
      const {data}=await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/contest/getContest/${destructureSlug(title)}`
      );
      console.log("BACKEND CONTEST DATA BY TITLE-->",data);
      return data;
   } catch (error) {
      return {error:true,message:error?.message};
   }
}
export const getContestProgram=async(AccessToken,submissionId)=>{
   try {
    console.log("T->",AccessToken)
    const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/program/getProgram`,{submissionId:submissionId},{
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      }});
    console.log("RESPOSNE FOR PROGRAM PAGE--->",data);
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
      return {error:true,message:error.message}
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
      return {error:true,message:error?.message};
  }
}

export const getLeaderboard=async(contestID)=>{
  try {
   const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contest/leaderboard?id=${contestID}`);
   console.log("LEADER BOARD RESPONSE-->",data);
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


//COMPILER HELPER FUNCITONS
  
export const compile = async (code) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/compile`, { content: code });
      
      console.log("RESPONSE FOR COMPILATION-->", res);
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

export const compileAndSubmit=async(code,submissionID)=>{
    try{
    // const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/compile-and-test`,{userCode: "// SPDX-License-Identifier: UNLICENSED\npragma solidity ^0.8.4;\n\ncontract TestContract {\n    uint256 private value;\n\n    function setValue(uint256 _value) public {\n        value = _value;\n    }\n\n    function getValue() public view returns (uint256) {\n        return value;\n    }\n}\n",submissionId:'6670307bbbf3246bdd7bc334'});
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/compile-and-test`,{userCode:code,submissionId:submissionID});
      
      console.log("RESPONSE FOR COMPILATION & TEST-->", res);
      return res.data;
      
    } catch (error) {
      console.error("Compile Error-->", error);
      return { error: true, message: "Failed to compile" };
    }
  }
