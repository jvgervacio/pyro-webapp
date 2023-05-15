import { MdHistory, MdLayers, MdLogout, MdSettings, MdSpaceDashboard } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom"
const Topbar: React.FC<{ className?: string , title: string}> = (props) => {
    return (
        <div className='w-full flex justify-between items-center p-5 pb-0'>
            <h1 className='text-3xl font-semibold'>{props.title}</h1>
            <div className='flex items-center gap-5'>
                {/*circle shape*/}
                <a>Juan Dela Cruz</a>
                <div className='w-10 h-10 rounded-full bg-orange_peel'></div>
            </div>
        </div>
    );
}

export default Topbar;
