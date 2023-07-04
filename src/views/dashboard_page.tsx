import { MainTemplate } from '@components/template';
import Card from '@components/card';
import { GiMovementSensor, GiRingingAlarm } from 'react-icons/gi'
import TwoWrapper from '@components/two';

const DashboardPage: React.FC = () => {
  const card_data = [
    { title: "TOTAL SENSORS", icon: GiMovementSensor },
    { title: "TRIGGERED SENSORS", icon: GiRingingAlarm },
    { title: "TOTAL ZONES", icon: GiRingingAlarm },
  ]
  return (
    <MainTemplate className='' title='DASHBOARD'>
      <div className='flex w-full h-full gap-5 p-5 pt-0'>
        <div className='flex flex-col w-full gap-5 grow-[3]'>
          <div className='flex justify-between w-full gap-6 h-min'>
            {
              card_data.map((item, index) =>
                <Card key={index} className='w-full h-[100px] bg-slate-900'>
                  <div className='flex flex-col gap-1'>
                    <h1 className='text-[12px] text-white opacity-75 font-montserrat'>{item.title}</h1>
                    <p className='text-5xl font-black text-white font-archivo'>23</p>
                    <item.icon className='absolute right-[-10px] top-[-10px] text-[130px] opacity-25' />
                  </div>
                </Card>)
            }
          </div>
          {/* <Card className='flex h-full bg-gradient-to-tr from-slate-800 to-slate-900'>
            <TwoWrapper className = "absolute top-0 left-0 w-full h-full bg-transparent"/>
            <button className='absolute right-5 bottom-5 button'>reset</button>
          </Card> */}
          <Card className='container flex flex-col h-full bg-gradient-to-tr from-slate-800 to-slate-900'>
            <h1>Sensor</h1>
            <ul className='flex flex-col w-full divide-y'>
                <li className='w-full py-2 rounded-lg bg-slate-800 bg-clip-border '>asd</li>
              </ul>
          </Card>
        </div>
        {/* <Card className='flex w-[300px] h-full bg-gradient-to-tr from-slate-800 to-slate-900 grow-1'>

        </Card> */}
      </div>
    </MainTemplate>
  );
};

export default DashboardPage;