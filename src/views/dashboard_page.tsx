import { MainTemplate } from '@components/template';
import Card from '@components/card';
import { GiFire, GiMovementSensor, GiRingingAlarm } from 'react-icons/gi'
import { AiFillFire } from 'react-icons/ai'
import TwoWrapper from '@components/two';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import firebase from '@/services/firebase_api';
import { Sensor } from '@/utils/utility_types';
import { useDispatch } from 'react-redux';
import { dashboardActions } from '@/store/features/dashboard-slice';
import ReactNode from 'react';

const DashboardPage: React.FC = () => {
  const indicators = useSelector((state: RootState) => state.dashboard.indicators)
  const sensors = useSelector((state: RootState) => state.dashboard.sensors)

  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    firebase.firestore.onSnapshotDocument('users', "CPyh8WIQL8W0ivd4xYaoaTAhSsp2", (data) => {
      const list: [string, Sensor][] = []
      var n_triggered = 0;
      Object.entries(data.docs[0].data().sensors).forEach((sensor) => {
        const sensort = sensor as [string, Sensor]
        list.push(sensort)
        if (sensort[1].triggered) n_triggered++;

      })
      console.log("updated")
      dispatch(dashboardActions.setTotaAlarms(list.length));
      dispatch(dashboardActions.setTriggeredAlarms(n_triggered));
      dispatch(dashboardActions.setSensors(list));
    });
  }, [user]);

  return (
    <MainTemplate className='' title='DASHBOARD'>
      <div className='flex w-full h-full gap-5 p-5 pt-0'>
        <div className='flex flex-col w-full gap-5 grow-[3]'>
          <div className='flex justify-between w-full gap-6 h-min'>
            {
              indicators.map((item, index) =>
                <Card key={index} className='w-full h-[100px] bg-slate-900'>
                  <div className='flex flex-col gap-1'>
                    <h1 className='text-[12px] text-white opacity-75 font-montserrat'>{item.title}</h1>
                    <p className='text-5xl font-black text-white font-archivo'>{item.value}</p>
                    <item.icon className='absolute right-[-10px] top-[-10px] text-[120px] opacity-25' />
                  </div>
                </Card>)
            }
          </div>
          {/* <Card className='flex h-full bg-gradient-to-tr from-slate-800 to-slate-900'>
            <TwoWrapper className = "absolute top-0 left-0 w-full h-full bg-transparent"/>
            <button className='absolute right-5 bottom-5 button'>reset</button>
          </Card> */}
          <div className='flex flex-col h-full gap-2'>
            <div className='flex'>
              <h1>Sensors</h1>
              <div className=''>

              </div>
            </div>
            <Card className='flex h-full p-0 bg-gradient-to-tr from-slate-800 to-slate-900'>
              <table className="w-full tablel-auto h-min">
                <thead className='h-14'>
                  <tr>
                    <th className='w-40'>Status</th>
                    <th className='w-40'>Sensor ID</th>
                    <th className='text-left'>Description</th>
                    <th className='w-32'>Zone No.</th>
                    <th className='w-32'>Floor No.</th>
                    <th className='w-32'>Flame</th>
                    <th className='w-32'>Smoke</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sensors.map((item, index) => {

                      return <tr key={index} className='h-10 text-center border-slate-700 border-y hover:bg-slate-800'>
                        <td className='px-5'>{
                          item[1].alert_level == 0 ? 
                          <div className='text-green-500 border border-green-500 rounded-full'>Neutral</div> : 
                          item[1].alert_level == 1 ? 
                          <div className='text-yellow-500 border border-yellow-500 rounded-full'>Low</div> : 
                          item[1].alert_level == 2 ? 
                          <div className='text-orange-500 border border-orange-500 rounded-full'>Moderate</div> : 
                          <div className='text-red-500 border border-red-500 rounded-full'>Extreme</div> 
                        }</td>
                        <td>{item[0]}</td>
                        <td className='text-left'>{item[1].description}</td>
                        <td>{item[1].zone}</td>
                        <td>{item[1].floor}</td>
                        <td className='grid h-10 place-items-center'>{item[1].flame_sensor ? <AiFillFire className='text-2xl text-red-600'/> : <AiFillFire className='text-2xl text-slate-500'/>}</td>
                        <td>{item[1].smoke_sensor}</td>
                        
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