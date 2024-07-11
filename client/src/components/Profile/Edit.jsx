import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from "react-hot-toast";
import GreenButton from "../button/GreenButton";
import {IMG_UPLOAD,REMOVE,TWITTER_PNG as TWITTER,GITHUB_PNG as GITHUB,YOUTUBE,LINKEDIN,DISCORD_PNG as DISCORD,DRAWER as HAMBURGER} from "../../Constants/Assets"
import { useContext, useState } from "react";
import { ParentContext } from "../../contexts/ParentContext";
import axios from "axios";
import { useEffect, useRef } from "react";
const EditProfile = () => {
  const [img, setImg] = useState(null);
  const { loggedInUserData } = useContext(ParentContext)
  console.log(loggedInUserData)
  const [showError, setShowError] = useState(false)
  const [projects, setProjects] = useState([])
  const [projectValues, setProjectValues] = useState({ title: "", URL: "", description: "" })
  const addProjectHandler = () => {
    if (!projectValues.title || !projectValues.URL || !projectValues.description) return
    setProjects(prev => {
      if (!prev.length) return [{ id: 1, ...projectValues }]
      else return [...prev, { id: prev[prev.length - 1].id + 1, ...projectValues }]
    })
    setProjectValues({ title: "", URL: "", description: "" })
  }

  useEffect(() => {
    if (loggedInUserData?.projects) {
      setProjects(loggedInUserData.projects)
    }
  }, [loggedInUserData])
  const projectChangeHandler = (event) => {
    setProjectValues(prev => {
      return { ...prev, [event.target.id]: event.target.value }
    })
  }

  const projectRemoveHandler = (id) => {
    setProjects(prev => prev.filter(project => project.id != id))
  }


  const [data, setData] = useState({
    shardId: "",
    username: "",
    description: "",
    portfolio: "",
    experience: "",
    email: "",
    occupation: "",
    twitter: "",
    linkedIn: "",
    youtube: "",
    github: "",
    discord: ""
  })

  const [errors, setErrors] = useState({
    shardId: '',
    email: '',
    portfolio: '',
  });
  const errorRef = useRef();
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    setPreview(loggedInUserData.image)
  }, [loggedInUserData])

  const changehandler = (event) => {
    const { id, value } = event.target;
    let errorMsg = '';

    switch (id) {
      case 'shardId':
        if (/\s/.test(value)) {
          errorMsg = 'Shard ID should not contain spaces';
        } else if (/^\d+$/.test(value)) {
          errorMsg = 'Shard ID should not be composed entirely of numbers';
        } else {
          errorMsg = '';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMsg = 'Invalid email address';
        }
        else
          errorMsg = ''
        break;
      case 'portfolio':
        const urlRegex = /^https?:\/\/.+/;
        if (!urlRegex.test(value)) {
          errorMsg = 'URL should start with http:// or https://';
        }
        else
          errorMsg = ''
        break;
      default:
        break;
    }
    if (errorMsg != '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: errorMsg,
      }));
      setShowError(true);
    }
    else {
      setErrors({ shardId: '', email: '', portfolio: '' })
      setShowError(false);
      setData(prev => {
        return { ...prev, [event.target.id]: event.target.value }
      })
    }

  }
  const saveHandler = async () => {
    if (showError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (data?.shardId.length < 5) {
      toast.error("Shard ID must be have atleast 5 characters!!");
      return;
    }
    if (data?.email == "default") {
      toast.error("Please enter valid email to continue!");
      return;
    }
    var url;
    const notNullEntries = Object.entries(data).filter(entry => entry[1] && loggedInUserData[entry[0]]!=entry[1])

    if(!notNullEntries.length && !img && (!projects.length || JSON.stringify(projects)==JSON.stringify(loggedInUserData.projects))){
      toast.error("No changes to save")
      return
    }

    const filteredData = notNullEntries.reduce((acc, curr) => {
      return { ...acc, [curr[0]]: curr[1] }
    }, {})
    console.log(filteredData)
    if (img) {
      const formData = new FormData();
      formData.append("files", img);
      const res = await fetch(`${import.meta.env.VITE_CMS_URL}/upload?populate=*`, {
        method: "POST",
        body: formData,
        redirect: "follow",
      })
        .then(res => res.json())
        .catch((error) => console.error(error));
      url = res[0].url
      if(loggedInUserData.image){
        const userImageKey=loggedInUserData.image.substring(loggedInUserData.image.lastIndexOf('/') + 1)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/deleteImage`,{key:userImageKey})
      }
    }

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/updateuser`,
      url ? { ...filteredData, image: url, id: loggedInUserData._id, projects } : { ...filteredData, id: loggedInUserData._id, projects }
      , {
        headers: {
          Authorization: `Bearer ${loggedInUserData.accessToken}`,
        },
      }
    )
      .then(res => {
        if (res.data.error) {
          console.log("errr->", res.data)
          toast.error("This Shard ID is already in use")
        }
        else {
          setShowError(false)
          window.location.reload();
        }
      })
    
  }
  useEffect(() => {
    if (loggedInUserData._id) {
      setData((prevData) => ({
        ...prevData,
        shardId: loggedInUserData?.shardId,
        email: loggedInUserData?.email
      }))
    }
  }, [loggedInUserData])
  return (
    <div className="py-[60px] px-5 md:px-[100px] bg-shardeumPink ">
      <Toaster />
      <div className="heading pb-10 border-b-2 flex ">
        <div className="flex-1 text-left">
          <p className='my-2 text-[48px] md:text-[64px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold'>Edit Profile</p>
        </div>
        <div className="flex-1 float-right flex justify-end items-center">
          <GreenButton
            onClick={saveHandler}
            text={"Save Changes"}
            isHoveredReq={true}
          />
        </div>
      </div>
      <div className="edit_section grid grid-cols-1 space-y-5 md:space-y-0  md:grid-cols-5 py-10  md:py-20">
        <div className="col-span-1">
          <div className="flex flex-col space-y-7 justify-center items-center">
            <LazyLoadImage src={preview} className="rounded-[16px] w-[180px] h-[180px] border-[2px]" />
            <label for="files" className="text-shardeumBlue bg-white cursor-pointer border-[2px] border-shardeumBlue rounded-[10px] py-[8px] px-[16px] flex space-x-1">
              <div className="py-1"><img src={IMG_UPLOAD} /></div>
              <div className="mt-[2px]"><span>Change Avatar</span></div>
            </label>
            <input
              className="hidden"
              id="files"
              type="file"
              onChange={(e) => {
                setImg(e.target.files[0]);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result);
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="box-1  bg-white rounded-3xl border-[1px] p-2 md:p-10">
            <div>
              <p className='my-2 text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold border-b-[1px] pb-5'>Basic Information</p>
              <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Shard ID</label>
                  <input id="shardId" defaultValue={loggedInUserData?.shardId ?? ""} className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Enter your username" onChange={changehandler} />
                  {showError && errors.shardId != "" && <p className="text-red-500 text-[12px]">{errors?.shardId}</p>}
                </div>
                <div ref={errorRef} className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Your Name</label>
                  <input className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Enter your Name" id="username" defaultValue={loggedInUserData?.username ?? ''} onChange={changehandler} />
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Description</label>
                  <input className="p-[16px] rounded-[12px] border-[0.5px] h-[100px]" placeholder="Enter your Introduction" id="description" defaultValue={loggedInUserData?.description ?? ''} onChange={changehandler} />
                </div>
                <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Occupation</label>
                  <select className="p-[16px] rounded-[12px] border-[0.5px]" id="occupation" defaultValue={loggedInUserData?.occupation ?? ''} onChange={changehandler}>
                    <option disabled className="opacity-[50%]">Please Select</option>
                    <option>Private</option>
                    <option>Government</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Work Experience</label>
                  <select className="p-[16px] rounded-[12px] border-[0.5px]" id="experience" onChange={changehandler}>
                    <option disabled className="opacity-[50%]">Please Select</option>
                    <option>Fresher</option>
                    <option>Less than 2 years</option>
                    <option>Less than 5 years</option>
                  </select>
                </div>
                {
                  loggedInUserData?.email == "default" ?
                    <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                      <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Email Address</label>
                      <input className="p-[16px] rounded-[12px] border-[0.5px] " placeholder="Enter your email ID" id="email" defaultValue={loggedInUserData?.email ?? ''} onChange={changehandler} />
                      {showError && errors.email != "" && <p className="text-red-500 text-[12px]">{errors?.email}</p>}
                    </div>
                    :
                    <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                      <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Email Address</label>
                      <input className="p-[16px] rounded-[12px] border-[0.5px] cursor-not-allowed" disabled placeholder="Enter your email ID" id="email" defaultValue={loggedInUserData?.email ?? ''} onChange={changehandler} />
                      {showError && errors.email != "" && <p className="text-red-500 text-[12px]">{errors?.email}</p>}
                    </div>
                }
                <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Website URL</label>
                  <input className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Enter your Website URL" id="portfolio" defaultValue={loggedInUserData?.portfolio ?? ''} onChange={changehandler} />
                  {showError && errors.portfolio != "" && <p className="text-red-500 text-[12px]">{errors?.portfolio}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 box-1 bg-white rounded-3xl border-[1px] p-2 md:p-10">
            <p className='my-2 text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold border-b-[1px] pb-5'>On the web</p>

            <div className="py-5 grid col-span-1 md:grid-cols-2 gap-10">
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">
                  <div className="col-span-1">
                    <img src={TWITTER} />
                  </div>
                  <input className="col-span-9 outline-none bg-shardeumWhite" defaultValue={loggedInUserData?.twitter ?? ''} placeholder="Enter Username" id="twitter" onChange={changehandler} />

                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">
                  <div className="col-span-1">
                    <img src={LINKEDIN} />
                  </div>
                  <input className="col-span-9 outline-none bg-shardeumWhite" defaultValue={loggedInUserData?.linkedIn ?? ''} placeholder="Enter Username" id="linkedIn" onChange={changehandler} />

                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">

                  <div className="col-span-1">
                    <img src={YOUTUBE} />
                  </div>
                  <input className="col-span-9 outline-none bg-shardeumWhite" defaultValue={loggedInUserData?.youtube ?? ''} placeholder="Enter Username" id="youtube" onChange={changehandler} />

                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">
                  <div className="col-span-1">
                    <img src={GITHUB} />
                  </div>
                  <input className="col-span-9 outline-none bg-shardeumWhite" defaultValue={loggedInUserData?.github ?? ''} placeholder="Enter Username" id="github" onChange={changehandler} />

                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">
                  <div className="col-span-1">
                    <img src={DISCORD} />
                  </div>
                  <input className="col-span-9 outline-none bg-shardeumWhite" defaultValue={loggedInUserData?.discord ?? ''} placeholder="Enter Username" id="discord" onChange={changehandler} />

                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 box-1 bg-white rounded-3xl border-[1px] p-2 md:p-10">
            <p className='my-2 text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold border-b-[1px] pb-5'>Project Links</p>


            <div className="py-5 grid grid-cols-4 gap-2 md:gap-10">
              <div className="md:col-span-2 col-span-4 flex flex-col space-y-4">
                <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Link Title</label>
                <input id="title" className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Enter the title" onChange={projectChangeHandler} value={projectValues.title} />
              </div>
              <div className="md:col-span-2 col-span-4 flex flex-col space-y-4">
                <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">URL</label>
                <input id="URL" className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Enter link" onChange={projectChangeHandler} value={projectValues.URL} />
              </div>
              <div className="col-span-3 flex flex-col space-y-4">
                <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">description</label>
                <input id="description" className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Type here..." onChange={projectChangeHandler} value={projectValues.description} />
              </div>
              <div className="col-span-1 text-center flex items-end space-y-4">
                <GreenButton
                  onClick={addProjectHandler}
                  text={"Add"}
                  isHoveredReq={true}
                />
              </div>
            </div>


            {
              projects.map(project => <div key={project.id} className="w-full mt-5 bg-white   p-[16px] rounded-[12px] border">

                <div className="flex justify-between">

                  <div className="flex items-center">
                    <img src={HAMBURGER} className="w-[24px] h-[24px] mr-[12px]" />
                    <p className="text-[16px]">{project.title}</p>
                  </div>

                  <div className="flex items-center">
                    <a className="mr-[12px] text-blue-800 underline cursor-pointer">{project.URL}</a>
                    <img src={REMOVE} className="w-[24px] h-[24px] cursor-pointer" onClick={() => projectRemoveHandler(project.id)} />
                  </div>

                </div>

                <p className="mt-5">{project.description}</p>



              </div>)

            }

          </div>

        </div>

      </div>
    </div>
  )
}

export default EditProfile;