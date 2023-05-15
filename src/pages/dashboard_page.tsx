import { MainTemplate } from '../components/template';
import Card from '../components/card';
import { GiMovementSensor, GiRingingAlarm, GiFire } from 'react-icons/gi'
import { } from 'react-icons/'

const DashboardPage: React.FC = () => {
  const card_data = [
    { title: "TOTAL SENSORS", icon: GiMovementSensor },
    { title: "TRIGGERED SENSORS", icon: GiRingingAlarm },
    { title: "TRIGGERED SENSORS", icon: GiRingingAlarm },
    { title: "TRIGGERED SENSORS", icon: GiRingingAlarm },
  ]
  return (
    <MainTemplate className='' title='DASHBOARD'>
      <div className='w-full h-full flex p-5 pt-0 gap-5'>
        <div className='flex flex-col w-full gap-5 grow-[3]'>
          <div className='flex justify-between h-min w-full gap-3'>
            {
              card_data.map((item, index) =>
                <Card className='w-full h-[100px] backdrop-blur-sm bg-gradient-to-br from-orange_peel to-vermillion'>
                  <div className='flex flex-col gap-1'>
                    <h1 className='text-white font-montserrat opacity-75'>{item.title}</h1>
                    <p className='text-white text-5xl font-archivo font-black'>23</p>
                    <item.icon className='absolute right-[-10px] top-[-10px] text-[130px] opacity-25' />
                  </div>
                </Card>)
            }
          </div>
          <Card className='flex w-full h-full bg-gradient-to-tr from-slate-800 to-slate-900'></Card>
        </div>
        <Card className='flex w-[300px] h-full bg-gradient-to-tr from-slate-800 to-slate-900 grow-1'></Card>
      </div>
    </MainTemplate>
  );
};

export default DashboardPage;