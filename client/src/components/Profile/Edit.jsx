import { LazyLoadImage } from "react-lazy-load-image-component";
import GreenButton from "../button/GreenButton";
import AVATAR from "../../assets/avatar.png";
import IMG_UPLOAD from "../../assets/img_upload.png";
import TWITTER from "../../assets/twitter.png";
import GITHUB from "../../assets/github.png";
import YOUTUBE from "../../assets/youtube.png";
import LINKEDIN from "../../assets/linkedin.png";
import DISCORD from "../../assets/discord.png";
import { useContext, useState } from "react";
import { ParentContext } from "../../contexts/ParentContext";
import axios from "axios";
const EditProfile = () => {
  const [img, setImg] = useState(null);
  const { loggedInUserData } = useContext(ParentContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
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

  const [preview,setPreview]=useState(AVATAR)

  const changehandler = (event) => {
    setData(prev => {
      return { ...prev, [event.target.id]: event.target.value }
    })
  }
  const saveHandler = async () => {
    var url;
    const notNullEntries = Object.entries(data).filter(entry => entry[1])
    const filteredData = notNullEntries.reduce((acc, curr) => {
      return { ...acc, [curr[0]]: curr[1] }
    }, {})


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
    }

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/updateuser`, url ? { ...filteredData, image: url, id: loggedInUserData._id } : { ...filteredData, id: loggedInUserData._id })
      .then(res => console.log(res))
  }
  return (
    <div className="py-[60px] px-[100px]">
      <div className="heading pb-10 border-b-2 flex ">
        <div className="flex-1 text-left">
          <p className='my-2 text-[64px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold'>Edit Profile</p>
        </div>
        <div className="flex-1 float-right flex justify-end items-center">
          <GreenButton
            onClick={saveHandler}
            text={"Save Changes"}
            isHoveredReq={true}
          />
        </div>
      </div>
      <div className="edit_section grid grid-cols-5 py-20">
        <div className="col-span-1">
          <div className="flex flex-col space-y-7 justify-center items-center">
            <LazyLoadImage src={preview} className="rounded-[16px] w-[180px] h-[180px] border-[2px]" />
            <label for="files" className="text-shardeumBlue cursor-pointer border-[2px] border-shardeumBlue rounded-[10px] py-[8px] px-[16px] flex space-x-1">
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
          <div className="box-1 bg-shardeumPink rounded-3xl border-[1px] p-10">
            <div>
              <p className='my-2 text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold border-b-[1px] pb-5'>Basic Information</p>
              <div className="py-5 grid grid-cols-2 gap-10">
                <div className="col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">First Name</label>
                  <input id="firstName" className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Enter your First Name" onChange={changehandler} />
                </div>
                <div className="col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Last Name</label>
                  <input className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Enter your Last Name" id="lastName" onChange={changehandler} />
                </div>
                <div className="col-span-2 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Description</label>
                  <input className="p-[16px] rounded-[12px] border-[0.5px] h-[100px]" placeholder="Enter your Introduction" id="description" onChange={changehandler} />
                </div>
                <div className="col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Occupation</label>
                  <select className="p-[16px] rounded-[12px] border-[0.5px]" id="occupation" onChange={changehandler}>
                    <option disabled className="opacity-[50%]">Please Select</option>
                    <option>Private</option>
                    <option>Government</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Work Experience</label>
                  <select className="p-[16px] rounded-[12px] border-[0.5px]" id="experience" onChange={changehandler}>
                    <option disabled className="opacity-[50%]">Please Select</option>
                    <option>Fresher</option>
                    <option>Less than 2 years</option>
                    <option>Less than 5 years</option>
                  </select>
                </div>
                <div className="col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Email Address</label>
                  <input className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Enter your email ID" id="email" onChange={changehandler} />
                </div>
                <div className="col-span-1 flex flex-col space-y-4">
                  <label className="text-[14px] leading-[14px] text-overflow-ellipsis font-helvetica-neue-bold">Website URL</label>
                  <input className="p-[16px] rounded-[12px] border-[0.5px]" placeholder="Enter your Website URL" id="portfolio" onChange={changehandler} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 box-1 bg-shardeumPink rounded-3xl border-[1px] p-10">
            <div className="py-5 grid grid-cols-2 gap-10">
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">
                  <div className="col-span-1">
                    <img src={TWITTER} />
                  </div>
                  <input className="col-span-8 outline-none" placeholder="Enter Username" id="twitter" onChange={changehandler} />
                  <div className="col-span-1 text-right  ">
                    <span className="text-shardeumBlue">connect</span>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">
                  <div className="col-span-1">
                    <img src={LINKEDIN} />
                  </div>
                  <input className="col-span-8 outline-none" placeholder="Enter Username" id="linkedIn" onChange={changehandler} />
                  <div className="col-span-1 text-right  ">
                    <span className="text-shardeumBlue">connect</span>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">

                  <div className="col-span-1">
                    <img src={YOUTUBE} />
                  </div>
                  <input className="col-span-8 outline-none" placeholder="Enter Username" id="youtube" onChange={changehandler} />
                  <div className="col-span-1 text-right  ">
                    <span className="text-shardeumBlue">connect</span>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">
                  <div className="col-span-1">
                    <img src={GITHUB} />
                  </div>
                  <input className="col-span-8 outline-none" placeholder="Enter Username" id="github" onChange={changehandler} />
                  <div className="col-span-1 text-right  ">
                    <span className="text-shardeumBlue">connect</span>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-shardeumWhite">
                  <div className="col-span-1">
                    <img src={DISCORD} />
                  </div>
                  <input className="col-span-8 outline-none" placeholder="Enter Username" id="discord" onChange={changehandler} />
                  <div className="col-span-1 text-right  ">
                    <span className="text-shardeumBlue">connect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EditProfile;