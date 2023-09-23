import { RootState } from "@/store/store";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdHistory, MdLayers, MdLogout, MdSettings, MdSpaceDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { Establishment } from '../utils/utility_types';
import firebase from '@/services/firebase_api';
import {RiRestartFill} from 'react-icons/ri';
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

    const onClick = () => {
        if(user === null) return;
        firebase.database.setValue(`${user.uid}/reset`, true);
        alert('Resetting Alarms...')
    }
    return (
        <div className='flex items-center justify-between w-full p-5 pb-0'>
            <h1 className='text-xl text-white'>Establishment: {EstablishmentName}</h1>
            <div className='flex items-center gap-5'>
                {/*circle shape*/}
                <button onClick={onClick} className='flex gap-3 p-2 px-5 rounded-lg bg-red_crayola hover:ring-2'>
                    <p>Restart Alarms</p>
                    <RiRestartFill className='text-2xl text-white' />
                </button>
                <GiHamburgerMenu className='text-3xl text-white sm:hidden' />
            </div>
        </div>
    );
}

export default Topbar;
