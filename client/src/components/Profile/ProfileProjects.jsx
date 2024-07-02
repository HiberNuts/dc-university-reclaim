import { useContext } from "react"
import ProfileProjectCard from "./ProfileProjectCard"
import { ParentContext } from "../../contexts/ParentContext"

const ProfileProjects = ({projects=[]}) => {
    if(projects.length==0)
         return <></>
    return <div className="w-full">
        <div className="border-b-2 border-b-dimgray">
            <p className='my-2 text-[24px] text-left leading-tight text-black text-overflow-ellipsis font-helvetica-neue-bold  pb-3'>Projects</p>
        </div>
        <div className="my-10 grid grid-cols-3 gap-[32px]">

            {projects.map(project => <ProfileProjectCard key={project.id} {...project} />)}
        </div>

    </div>
}
export default ProfileProjects