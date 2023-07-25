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

const DashboardPage: React.FC = () => {
  const indicators = useSelector((state: RootState) => state.dashboard.indicators)
  const user = useSelector((state: RootState) => state.auth.user)
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const dispatch = useDispatch();
  
  useEffect(() => {

    if (user === null) return;
    
    firebase.database.onValue(user?.uid, (snapshot) => {
      const data = snapshot.val()
      const sensor_list = [] as Sensor[]
      const list = data.sensors
      console.log(list)
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
    })
    
  }, []);

  return (
    <MainTemplate className='' title='DASHBOARD'>
      <div className="absolute"></div>
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
                      var color = ""
                      switch (item.status) {
                        case 'OFFLINE':
                          color = 'slate-500'
                          break;
                        case 'IDLE':
                          color = 'green-500'
                          break;
                        case 'LOW':
                          color = 'yellow-500'
                          break;
                        case 'MODERATE':
                          color = 'orange-500'
                          break;
                        case 'EXTREME':
                          color = 'red-500'
                      }
                      return <tr key={index} className='h-10 text-center cursor-pointer border-slate-700 border-y hover:bg-slate-800'>
                        <td className='px-5'>{
                          <div className={`text-${color} border-${color} border rounded-full`}>{item.status}</div>
                        }</td>
                        <td>{item.id}</td>
                        <td className="text-left">{item.description}</td>
                        <td>{item.zone}</td>
                        <td>{item.floor}</td>
                        <td>{item.status == "OFFLINE" ? "-":item.flame}</td>
                        <td>{item.status == "OFFLINE" ? "-":item.smoke}</td>
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