
import ProfileProjectCard from "./ProfileProjectCard"

const ProfileProjects = ({projects=[]}) => {
    if(projects.length===0)
         return <></>
    return <div className="w-full">
        <div className="border-b-2 border-b-dimgray">
            <p className='my-2 text-[24px] text-left leading-tight text-black text-overflow-ellipsis font-helvetica-neue-bold  pb-3'>Projects</p>
        </div>
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-[32px]">

            {projects.map((project,i) => <ProfileProjectCard key={project.id} {...project} index={i} />)}
        </div>

    </div>
}
export default ProfileProjects