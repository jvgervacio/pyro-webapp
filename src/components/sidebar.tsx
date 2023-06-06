import { authActions } from "@/store/features/auth-slice";
import { AppDispatch } from "@/store/store";
import { getAuth } from "firebase/auth";
import { MdHistory, MdLayers, MdLogout, MdSettings, MdSpaceDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate, redirect} from "react-router-dom"
const Sidebar: React.FC<{ className: string }> = (props) => {
    const sidebar_items = [
        { link: '/dashboard', title: "Dashboard", icon: MdSpaceDashboard },
        { link: '/layout', title: "Layout", icon: MdLayers },
        { link: '/history', title: "History", icon: MdHistory },
        { link: '/settings', title: "Settings", icon: MdSettings },
    ];
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // sidebar
    const logout = () => {
        getAuth().signOut();
        dispatch(authActions.logout());
    };
    return (
        <div className={"w-[18%] relative backdrop-blur-xl shadow-xl shadow-slate-800" + props.className}>
            <div className="min-w-fit">
                <h1 className='mt-5 mb-10 text-4xl font-bold text-center align-middle font-montserrat text-orange_peel'>PYRO</h1>
                <ul className="flex flex-col flex-grow-[5]">
                    {
                        sidebar_items.map((item, index) =>
                            <NavLink key={index} to={item.link}
                                className={({ isActive }) =>
                                    isActive ?
                                        "flex items-center text-sm w-full p-5 pl-10 pr-5 gap-5 text-orange_peel border-r-2 border-orange_peel" :
                                        "flex items-center text-sm w-full p-5 pl-10 pr-5 gap-5 hover:text-white"}
                                
                                        replace = {true}
                                >
                                <item.icon className="inline-block text-xl" />
                                {item.title}
                            </NavLink>)
                    }
                </ul>
            </div>
            <div className="absolute bottom-0 flex items-center justify-center w-full p-5">
                <button onClick={logout} className="flex items-center justify-center gap-2 text-sm">
                    <MdLogout className="inline-block " />
                    LOGOUT
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
