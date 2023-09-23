import { MainTemplate } from '@components/template';
import Card from '@components/card';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import firebase from '@/services/firebase_api';
import { Sensor } from '@/utils/utility_types';
import { useDispatch } from 'react-redux';
import { dashboardActions } from '@/store/features/dashboard-slice';
import ReactNode from 'react';
import { Form, Link, useNavigate } from "react-router-dom";
import Modal from '@/components/modal'
import { BsFire } from 'react-icons/bs'
import StatusIndicator from '@/components/status_indicator';
import StatusCard from '@/components/status_card';


const DashboardPage: React.FC = () => {
  const indicators = useSelector((state: RootState) => state.dashboard.indicators)
  const isShowing = useSelector((state: RootState) => state.dashboard.modalShowing)
  const dispatch = useDispatch();


  const user = useSelector((state: RootState) => state.auth.user)
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [status, setStatus] = useState<"LOW" | "MODERATE" | "EXTREME" | "IDLE" | "OFFLINE">("OFFLINE");

  const navigate = useNavigate();
  
  useEffect(() => {

    if (user != null) {
      firebase.database.onValue(user.uid, (snapshot) => {
        const data = snapshot.val()
        const sensor_list = [] as Sensor[]
        const list = data.sensors
        for (const sensor_id in data.sensors) {
          const sensor: Sensor = {
            id: sensor_id,
            status: list[sensor_id].status,
            description: list[sensor_id].description,
            zone: list[sensor_id].zone,
            floor: list[sensor_id].floor,
            flame: list[sensor_id].flame,
            smoke: list[sensor_id].smoke,
            timestamp: list[sensor_id].timestamp
          }
          sensor_list.push(sensor)
        }
        dispatch(dashboardActions.setTriggeredAlarms(data.total_triggered));
        dispatch(dashboardActions.setTotalAlarms(data.total_sensors));
        setSensors(sensor_list)
        
        // get the difference between the current time and the last updated time 
        // if the difference is greater than 5 minutes, then the sensor is offline
        
        const current_time = new Date()
        const difference = current_time.getTime() - data.timestamp
        console.log(current_time.getTime(), difference)
        if (difference > 300000) { 
          setStatus("OFFLINE")
        }else{
          setStatus(data.status)
        }
        
      })

    } else {
      navigate('/signin', { replace: true })
    }
  }, []);

  return (
    <MainTemplate className='' title='DASHBOARD'>

      {
        selectedSensor != undefined ? <Modal selectedSensor={selectedSensor} isShowing={isShowing} onClose={() => dispatch(dashboardActions.setModalShowing(false))} /> : <></>
      }

      <div className='flex w-full h-full gap-5 p-5 pt-0'>
        <div className='flex flex-row w-full gap-5'>
          <div className='grid grid-rows-3 gap-3'>
            <StatusCard status={status} className='w-full h-full' />
            {
              indicators.map((item, index) =>
                <Card key={index} className='w-[280px] h-full p-3 bg-slate-900'>
                  <item.icon className='absolute w-[250px] h-[250px] text-slate-800 opacity-20 -z-0' />  
                  <div className='absolute top-0 left-0 grid w-full h-full place-content-center place-items-center'>
                    <div className='flex flex-col text-center'>
                      <p className='text-xl font-medium'>{item.title}</p>
                      <p className='font-bold font-montserrat text-[120px]'>{item.value}</p>
                    </div>
                  </div>
                </Card>)
            }
          </div>

          <div className='flex flex-col w-full h-full gap-2'>
            <Card className='flex w-full h-full p-0 bg-gradient-to-tr from-slate-800 to-slate-900'>
              <table className="w-full tablel-auto h-min">
                <thead className='h-14'>
                  <tr>
                    <th className='w-40'>Status</th>
                    <th className='w-40'>Sensor ID</th>
                    <th className='text-left'>Description</th>
                    <th className='w-32'>Floor No.</th>
                    <th className='w-32'>Zone No.</th>
                    <th className='w-32'>Flame</th>
                    <th className='w-32'>Smoke</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sensors.map((item, index) => {

                      return <tr key={index} className='h-10 text-center cursor-pointer border-slate-700 border-y hover:bg-slate-800' onClick={() => {
                        setSelectedSensor(item)
                        dispatch(dashboardActions.setModalShowing(true))
                      }}

                      >
                        <td className='px-5'>
                          <StatusIndicator status={item.status} />
                        </td>
                        <td>{item.id}</td>
                        <td className="text-left">{item.description}</td>
                        <td>{item.floor}</td>
                        <td>{item.zone}</td>
                        <td className='grid h-full place-items-center'>{item.status == "OFFLINE" || !item.flame ? "-" : <BsFire className="fill-red-500" />}</td>
                        <td>{item.status == "OFFLINE" ? "-" : item.smoke}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </Card>

          </div>
        </div>

      </div>
    </MainTemplate>
  );
};

export default DashboardPage;