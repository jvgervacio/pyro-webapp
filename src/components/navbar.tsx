import { useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
const Navbar: React.FC<{selected_index:number}> = (props) => {
    const nav_items = [
        { link: '/', title: "Home" },
        { link: '/track', title: "Track" },
        { link: '/features', title: "Features" },
        { link: '/about', title: "About Us" },
    ]
    return (
      <nav className="flex items-center justify-between max-w-screen-xl p-4 mx-auto align-middle animate-fade-in">
        <section className="logo"><a className="text-3xl font-black tracking-widest font-archivo text-portland_orange">PYRO</a></section>
        <section className="flex gap-10">
        {
          nav_items.map((item, index) => <Link className={"px-5 py-2 text-center w-max hover:text-orange-4001"} to={item.link}>{item.title}</Link>)
        }
        </section>
        <Link className="px-10 py-2 text-sm font-semibold text-center text-white transition-all duration-200 rounded shadow-sm w-min bg-portland_orange hover:brightness-125" to="/login">Login</Link>
      </nav>
    );
}

export default Navbar;
