import { RootState } from "@/store/store";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdHistory, MdLayers, MdLogout, MdSettings, MdSpaceDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { Establishment } from '../utils/utility_types';
import firebase from '@/services/firebase_api';
const Topbar: React.FC<{ className?: string, title: string }> = (props) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [EstablishmentName, setEstablishmentName] = useState<string>('Establishment Name')
    const [establishments, setEstablishments] = useState<Establishment[]>([]);
    useEffect(() => {
        if(user === null) return;
        firebase.firestore.getDocument('users', user.uid).then((doc) => {
            setEstablishmentName(doc.establishment_name)
        })
    }, [])
    return (
        <div className='flex items-center justify-between w-full p-5 pb-0'>
            <h1 className='text-xl text-white'>{props.title}</h1>
            <div className='flex items-center gap-5'>
                {/*circle shape*/}
                <a className="hidden sm:block">{EstablishmentName}</a>
                <div className='hidden w-10 h-10 rounded-full sm:block bg-orange_peel'></div>
                <GiHamburgerMenu className='text-3xl text-white sm:hidden' />
            </div>
        </div>
    );
}

export default Topbar;
