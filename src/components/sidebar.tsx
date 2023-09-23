import { authActions } from "@/store/features/auth-slice";
import { AppDispatch } from "@/store/store";
import { getAuth } from "firebase/auth";
import { GiFlame } from "react-icons/gi";
import { MdHistory, MdLayers, MdLogout, MdSettings, MdSpaceDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate, redirect} from "react-router-dom"
import logo_svg from '../assets/svg/logo.svg';

const Sidebar: React.FC<{ className: string }> = (props) => {
    const sidebar_items = [
        { link: '/dashboard', title: "Dashboard", icon: MdSpaceDashboard },
    ];
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // sidebar
    const logout = () => {
        getAuth().signOut();
        dispatch(authActions.logout());
        navigate('/');
    };
    return (
        <div className={"relative hidden sm:block" + props.className}>
            <div className="pl-3 min-w-fit ">
                <img src={logo_svg} alt="logo" className="h-[100px] w-full p-3"/>
                <h1 className='mb-10 font-bold text-center align-middle xl:text-xl text-orange_peel font-montserrat sm:text-2xl'>PYRO</h1>
                
                <ul className="flex flex-col flex-grow-[5] gap-5">
                    {
                        sidebar_items.map((item,  index) =>
                            <NavLink key={index} to={item.link}
                                className={
                                    ({ isActive }) => {
                                        return "container flex items-center text-sm w-full text-center justify-center " + (isActive ?
                                             "text-orange-400 justify-center" :
                                            "text-slate-300 hover:text-white ")
                                    }
                                    
                                    }
                
                                        replace = {true}
                                >
                                <item.icon className="inline-block align-middle sm:text-6xl" />
                                <p className="hidden">{item.title}</p>
                            </NavLink>)
                    }
                </ul>
            </div>
            <div className="absolute bottom-0 flex items-center justify-center w-full p-5">
                <button onClick={logout} className="flex items-center justify-center gap-2 text-sm">
                    <MdLogout className="inline-block text-5xl" />
                    <p className="hidden">LOGOUT</p>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
