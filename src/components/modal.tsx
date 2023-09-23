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
  selectedSensor: Sensor;
  isShowing: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [zone, setZone] = React.useState(props.selectedSensor.zone);
  const [floor, setFloor] = React.useState(props.selectedSensor.floor);
  const [description, setDescription] = React.useState(props.selectedSensor.description);
  const [flame, setFlame] = React.useState("-");
  const [smoke, setSmoke] = React.useState("-");
  const [status, setStatus] = React.useState(props.selectedSensor.status);
  const isShowing = useSelector((state: RootState) => state.dashboard.modalShowing)
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    setIsEditing(false)
    setZone(props.selectedSensor.zone)
    setFloor(props.selectedSensor.floor)
    setDescription(props.selectedSensor.description)

    if(props.selectedSensor.status === 'OFFLINE'){
      setSmoke("-")
      setFlame("-")
    }else{
      setSmoke(String(props.selectedSensor.smoke))
      setFlame(props.selectedSensor.flame ? "Detected" : "Not Detected")
    }
    
  }, [props.selectedSensor])
  
  const saveDetails = async () => {
    console.log('saving details')
    await firebase.database.updateValue(`${user?.uid}/sensors/${props.selectedSensor.id}`, {
      zone: zone,
      floor: floor,
      description: description
    })
    dispatch(dashboardActions.setModalShowing(false))
    setIsEditing(false)
  }

  
  return (
    <>
      {props.isShowing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-opacity-80 backdrop-blur-sm">
          <div className="relative rounded-lg shadow-lg bg-slate-700 w-[500px] p-3" onClick={() => {}}>
            <div className='flex flex-row items-center justify-between border-b-[1px] border-spacing pb-2 border-slate-600'>
              <h1 className='w-1/2 text-lg text-white'>Sensor Details</h1>
              <MdClose className='text-2xl text-white cursor-pointer hover:text-red-600' onClick={props.onClose} />
            </div>
            <div className='flex flex-row'>
              <div className='flex flex-col items-center w-full gap-5 mt-5'>
                <p className='text-xl font-bold'>SENSOR ID: {props.selectedSensor?.id}</p>
                <StatusIndicator status={props.selectedSensor?.status} className='w-[200px] font-bold text-xl'/>
                <div className='flex flex-col items-center gap-2'>
                  <p>Flame: <span className='font-bold'>{flame}</span></p>
                  <p>Smoke: <span className='font-bold'>{smoke}</span></p>
                </div>
                <div className='flex flex-row justify-between gap-10'>
                  <div className='flex flex-row items-center gap-2'>
                    <label className="text-white">
                      Floor:
                    </label>
                    {
                      isEditing ?
                        <div className="relative flex flex-row bg-transparent rounded-lg mt-5-1 h-7 w-28">
                          <button data-action="decrement" className="w-20 h-full text-white rounded-l outline-none cursor-pointer bg-slate-600" onClick={()=>setFloor(floor-1)}>
                            <span className="m-auto text-2xl font-thin">-</span>
                          </button>
                          <input type="number" className="flex items-center w-full font-semibold text-center text-black outline-none bg-slate-300" name="custom-input-number" value={floor} min="0" max="999" onChange={(e)=>setFloor(Number(e.target.value))}></input>
                          <button data-action="decrement" onClick={()=>setFloor(floor+1)} className="w-20 h-full text-white rounded-r outline-none cursor-pointer bg-slate-600">
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div> :
                        <p>{floor}</p>
                    }
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <label className="text-white">
                      Zone:
                    </label>
                    {
                      isEditing ?
                        <div className="relative flex flex-row bg-transparent rounded-lg mt-5-1 h-7 w-28">
                          <button data-action="decrement" className="w-20 h-full text-white rounded-l outline-none cursor-pointer bg-slate-600" onClick={()=>setZone(zone-1)}>
                            <span className="m-auto text-2xl font-thin">-</span>
                          </button>
                          <input type="number" className="flex items-center w-full font-semibold text-center text-black outline-none bg-slate-300" value={zone} min="0" max="999" onChange={(e)=>setZone(Number(e.target.value))}></input>
                          <button data-action="decrement" className="w-20 h-full text-white rounded-r outline-none cursor-pointer bg-slate-600">
                            <span className="m-auto text-2xl font-thin" onClick={()=>setZone(zone+1)}>+</span>
                          </button>
                        </div> :
                        <p>{zone}</p>
                    }

                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col mt-5'>
              <label className='text-white'>Description:</label>
              <textarea className='w-full h-20 p-2 text-white rounded-md bg-slate-600' placeholder='Description about the sensor' disabled={!isEditing} value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className='flex flex-row items-center border-t-[1px] border-spacing pt-2 border-slate-600 gap-2 justify-end'>
              {
                isEditing ? <>
                  <button className='p-2 px-8 text-white rounded-md bg-emerald-700' onClick={saveDetails}>Save Details</button>
                </>
                  : <button className='p-2 px-8 text-white rounded-md bg-rose-700' onClick={() => setIsEditing(true)}>Edit Details</button>
              }
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default Modal;