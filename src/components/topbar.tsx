import { GiHamburgerMenu } from "react-icons/gi";
import { MdHistory, MdLayers, MdLogout, MdSettings, MdSpaceDashboard } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom"
const Topbar: React.FC<{ className?: string, title: string }> = (props) => {
    return (
        <div className='flex items-center justify-between w-full p-5 pb-0'>
            <h1 className='text-xl text-white'>{props.title}</h1>
            <div className='flex items-center gap-5'>
                {/*circle shape*/}
                <a className="hidden sm:block">Juan Dela Cruz</a>
                <div className='hidden w-10 h-10 rounded-full sm:block bg-orange_peel'></div>
                <GiHamburgerMenu className='text-3xl text-white sm:hidden' />
            </div>
        </div>
    );
}

export default Topbar;
