import { Sensor } from '@/utils/utility_types';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useEffect } from 'react';
import firebase from '@/services/firebase_api';
import { HiStatusOffline } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import { set } from 'firebase/database';
import { BsFillExclamationCircleFill, BsFillExclamationOctagonFill, BsFillExclamationSquareFill, BsFillExclamationTriangleFill, BsFillOctagonFill, BsFillTriangleFill, BsShieldCheck } from 'react-icons/bs';
import { AiFillWarning } from 'react-icons/ai';
import idle_svg from '@/assets/svg/idle.svg'
import offline_svg from '@/assets/svg/offline.svg'
import low_svg from '@/assets/svg/low.svg'
import moderate_svg from '@/assets/svg/moderate.svg'
import extreme_svg from '@/assets/svg/extreme.svg'
import { ref } from 'firebase/storage';

interface ModalProps {
    status: "LOW" | "MODERATE" | "EXTREME" | "IDLE" | "OFFLINE";
    className?: string;
}

const StatusCard: React.FC<ModalProps> = (props) => {
    const [status, setStatus] = React.useState(props.status);
    const [color, setColor] = React.useState("rgb(100 116 139 / var(--tw-border-opacity))")
    const [icon, setIcon] = React.useState(idle_svg);
    useEffect(() => {
        
        setStatus(props.status)
        switch (props.status) {
            case 'OFFLINE':
                setColor('rgb(15 23 42)')
                setIcon(offline_svg);
                break;
            case 'IDLE':
                setColor('rgb(34 197 94)')
                setIcon(idle_svg);
                break;
            case 'LOW':
                setColor('rgb(234 179 8)')
                setIcon(low_svg)
                break;
            case 'MODERATE':
                setColor('rgb(249 115 22)')
                setIcon(moderate_svg)
                break;
            case 'EXTREME':
                setColor('rgb(239 68 68)')
                setIcon(extreme_svg)
        }
    }, [props, status, color])


    return (
        <div className={"p-2 rounded-lg shadow-sm shadow-slate-500 relative overflow-clip grid place-items-center "+props.className} style={{backgroundColor: color}}>
          <div className='flex flex-col gap-5 text-center'>
            <p className='text-xl text-white'>Alarm Status</p>
            <img src={icon} className='w-[130px] h-[130px]' />
            <p className='text-2xl font-bold text-white'>{status}</p>
          </div>
        </div>
    );
};

export default StatusCard;