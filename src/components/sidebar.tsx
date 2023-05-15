import { MdHistory, MdLayers, MdLogout, MdSettings, MdSpaceDashboard } from "react-icons/md";
import { Link, NavLink, useNavigate, redirect} from "react-router-dom"
const Sidebar: React.FC<{ className: string }> = (props) => {
    const sidebar_items = [
        { link: '/dashboard', title: "Dashboard", icon: MdSpaceDashboard },
        { link: '/layout', title: "Layout", icon: MdLayers },
        { link: '/history', title: "History", icon: MdHistory },
        { link: '/settings', title: "Settings", icon: MdSettings },
    ];

    const navigate = useNavigate();
    // sidebar
    const logout = () => {
        navigate("/");
        
    };

    return (
        <div className={"w-[18%] relative backdrop-blur-xl shadow-xl shadow-slate-800" + props.className}>
            <div className="min-w-fit">
                <h1 className='align-middle font-bold font-montserrat text-4xl text-center mb-10 mt-5 text-orange_peel'>PYRO</h1>
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
            <div className="absolute bottom-0 flex justify-center items-center w-full p-5">
                <button onClick={logout} className="flex gap-2 text-sm items-center justify-center">
                    <MdLogout className="inline-block " />
                    LOGOUT
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
