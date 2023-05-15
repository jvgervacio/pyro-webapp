import { Link, NavLink, useNavigate } from "react-router-dom"
const Navbar: React.FC<{ className?: string }> = (props) => {
  const nav_items = [
    { link: '/', title: "Home" },
    { link: '/track', title: "Track" },
    { link: '/features', title: "Features" },
    { link: '/about', title: "About Us" },
  ]
  return (
    <div className={props.className}>
      <nav className="flex items-center w-full max-w-screen-xl justify-between py-2">
        <div className="flex gap-20 items-center">
          <section className="logo">
            <a className="font-montserrat font-bold  text-orange_peel text-3xl tracking-widest">
              PYRO
            </a>
          </section>
          <section className="flex gap-10">
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
                  replace = {true}
                  >
                  
                  {item.title}

                </NavLink>)
            }
          </section>
        </div>
        <div className="flex gap-5 items-center">
          <Link className="text-slate-300 hover:text-slate-200" to="/signin">Sign in</Link>
          <Link className="button" to="/signup">Sign up</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
