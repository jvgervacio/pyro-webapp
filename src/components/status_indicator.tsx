import { Sensor } from '@/utils/utility_types';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useEffect } from 'react';
import firebase from '@/services/firebase_api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { dashboardActions } from '@/store/features/dashboard-slice';

interface ModalProps {
    status: "LOW" | "MODERATE" | "EXTREME" | "IDLE" | "OFFLINE";
    className?: string;
}

const StatusIndicator: React.FC<ModalProps> = (props) => {
    const [status, setStatus] = React.useState(props.status);
    const [color, setColor] = React.useState("rgb(100 116 139 / var(--tw-border-opacity))")

    useEffect(() => {
        setStatus(props.status)
        switch (props.status) {
            case 'OFFLINE':
                setColor('rgb(100 116 139 / var(--tw-border-opacity))')
                break;
            case 'IDLE':
                setColor('rgb(34 197 94 / var(--tw-border-opacity))')
                break;
            case 'LOW':
                setColor('rgb(234 179 8 / var(--tw-border-opacity))')
                break;
            case 'MODERATE':
                setColor('rgb(249 115 22 / var(--tw-border-opacity))')
                break;
            case 'EXTREME':
                setColor('rgb(239 68 68 / var(--tw-border-opacity))')
        }
    }, [props, status, color])


    return (
        <>{
            
            <div className={"border border-yellow-500 rounded-full text-center " + props.className}  style={{color: color, borderColor: color}}>{status}</div>
        }
        </>
    );
};

export default StatusIndicator;