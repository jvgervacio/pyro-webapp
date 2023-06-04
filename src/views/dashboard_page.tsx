import { MainTemplate } from '@components/template';
import Card from '@components/card';
import { GiMovementSensor, GiRingingAlarm} from 'react-icons/gi'
import TwoWrapper from '@components/two';

const DashboardPage: React.FC = () => {
  const card_data = [
    { title: "TOTAL SENSORS", icon: GiMovementSensor },
    { title: "TRIGGERED SENSORS", icon: GiRingingAlarm },
    { title: "TRIGGERED SENSORS", icon: GiRingingAlarm },
    { title: "TRIGGERED SENSORS", icon: GiRingingAlarm },
  ]
  return (
    <MainTemplate className='' title='DASHBOARD'>
      <div className='flex w-full h-full gap-5 p-5 pt-0'>
        <div className='flex flex-col w-full gap-5 grow-[3]'>
          <div className='flex justify-between w-full gap-3 h-min'>
            {
              card_data.map((item, index) =>
                <Card key={index} className='w-full h-[100px] backdrop-blur-sm bg-gradient-to-br from-orange_peel to-vermillion'>
                  <div className='flex flex-col gap-1'>
                    <h1 className='text-white opacity-75 font-montserrat'>{item.title}</h1>
                    <p className='text-5xl font-black text-white font-archivo'>23</p>
                    <item.icon className='absolute right-[-10px] top-[-10px] text-[130px] opacity-25' />
                  </div>
                </Card>)
            }
          </div>
          <Card className='flex h-full bg-gradient-to-tr from-slate-800 to-slate-900'>
            <TwoWrapper className = "absolute top-0 left-0 w-full h-full bg-transparent"/>
            <button className='absolute right-5 bottom-5 button'>reset</button>
          </Card>
        </div>
        <Card className='flex w-[300px] h-full bg-gradient-to-tr from-slate-800 to-slate-900 grow-1'>

        </Card>
      </div>
    </MainTemplate>
  );
};

export default DashboardPage;