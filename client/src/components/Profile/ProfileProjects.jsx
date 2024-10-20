
import ProfileProjectCard from "./ProfileProjectCard"

const ProfileProjects = ({ projects = [] }) => {
    return <div className="w-full">
        <p className="relative text-left  mt-[-1.00px]
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text text-wrap font-orbitron font-semibold text-transparent text-[24px] tracking-[0] leading-[50px] whitespace-nowrap">
            Projects
        </p>
        {
            projects.length > 0 ?
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-[32px]">

                    {projects.slice(0, 2).map((project, i) => <ProfileProjectCard key={project.id} {...project} index={i} />)}
                </div> :
                <p>-</p>
        }

    </div>
}
export default ProfileProjects