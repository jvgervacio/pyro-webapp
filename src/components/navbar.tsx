import { navmenuActions } from "@/store/features/navbar-slice";
import { AppDispatch, RootState } from "@/store/store";
import { MouseEventHandler } from "react";
import { GiCrossMark, GiHamburger, GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom"
import logosvg from '../assets/svg/logo.svg';
const Navbar: React.FC<{ className?: string }> = (props) => {
  const nav_items = [
    { link: '/', title: "Home" },
    { link: '/track', title: "Track" },
    { link: '/features', title: "Features" },
    { link: '/about', title: "About Us" },
  ]

  const dispatch = useDispatch<AppDispatch>();
  const isShowing = useSelector((state: RootState) => state.nav.isShowing, (prev, next) => prev === next);
  const isLogged = useSelector((state: RootState) => state.auth.isLogged, (prev, next) => prev === next);
  const toggleMenu: MouseEventHandler = (e) => {
    dispatch(navmenuActions.toggle())
  }

  return (
    <div className={props.className}>
      <nav className="relative flex items-center justify-between w-full max-w-screen-xl px-5 py-3 overflow-clip">
        <div className="flex items-center gap-10">
          <section className="flex items-center justify-center gap-1 align-middle logo">
            <img src={logosvg} alt="logo" className="h-[70px] w-full p-3" />
            <a className="text-xl font-semibold tracking-widest font-montserrat text-orange_peel">
              PYROSENSE
            </a>
          </section>
          <section className="hidden sm:gap-10 sm:flex">
            {
              nav_items.map((item, index) =>
                <NavLink key={index}
                  className={

                    ({ isActive }) =>
                      isActive ?
                        "text-orange_peel" :
                        "text-slate-400 hover:text-slate-300"
                  }
                  to={item.link}
                  replace={true}

                >

                  {item.title}

                </NavLink>)
            }
          </section>

        </div>
        <button className="text-4xl text-orange_peel sm:hidden" onClick={toggleMenu}>
          <GiHamburgerMenu />
        </button>
        <div className="items-center hidden gap-5 overflow-auto sm: sm:flex">
          {
            isLogged ? <Link className="w-auto button" to="/dashboard">Dashboard</Link> :
              <>
                <Link className="text-slate-300 hover:text-slate-200 min-w-fit" to="/signin">Sign in</Link>
                <Link className="w-auto button" to="/signup">Sign up</Link>
              </>
          }
        </div>



      </nav>
      {
        isShowing ?
          <section className='fixed z-50 flex flex-col items-center justify-center w-full h-full gap-10 text-3xl text-center bg-gradient-to-tr from-penn_blue to-gray-950 xl:hidden'>
            {
              nav_items.map((item, index) =>
                <NavLink key={index}
                  className={
                    ({ isActive }) =>
                      isActive ?  
                        "text-orange_peel " :
                        "text-slate-400 hover:text-slate-300 text-center"
                  }
                  to={item.link}
                  replace={true}
                >
                  {item.title}

                </NavLink>)

            }
            <br className=""></br>
            <div className="flex flex-col items-center w-full gap-10 px-10">
              {
                isLogged ? <Link className="text-3xl underline text-slate-300 hover:text-slate-200 underline-offset-8" to="/dashboard">Go to Dashboard</Link> :
                  <>
                    <Link className="text-3xl text-slate-300 hover:text-slate-200" to="/signin" onClick={toggleMenu}>Sign in</Link>
                    <Link className="text-3xl text-slate-300 hover:text-slate-200" to="/signup" onClick={toggleMenu}>Sign up</Link>
                  </>
              }
            </div>
            <button className="absolute right-5 top-5 text-orange_peel" onClick={toggleMenu}><MdClose className="text-5xl border-solid rounded-full border-1 border-orange_peel" /></button>
          </section>
          : <></>
      }
    </div>
  );
}

export default Navbar;
