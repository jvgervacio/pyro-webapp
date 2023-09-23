import { Sensor } from '@/utils/utility_types';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useEffect } from 'react';
import firebase from '@/services/firebase_api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { dashboardActions } from '@/store/features/dashboard-slice';
import StatusIndicator from './status_indicator';

interface ModalProps {
  isShowing: boolean;
  children?: React.ReactNode;
}

const Dialog: React.FC<ModalProps> = (props) => {
  const isShowing = useSelector((state: RootState) => state.dashboard.modalShowing)
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch();
  

  
  return (
    <>
      {props.isShowing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-opacity-80 backdrop-blur-sm">
          <div className="relative rounded-lg shadow-lg bg-slate-700 w-[500px] p-3">
            
            
            
          </div>

        </div>
      )}
    </>
  );
};

export default Dialog;