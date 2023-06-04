import { Marker, Popup,  } from "react-map-gl";
import { Establishment } from "@utils/utility_types";
//@ts-ignore
import flameLottie from '@assets/lottie/flame.json';
import pulseLottie from '@assets/lottie/pulse.json';
import Lottie from "lottie-react";

const EstablishmentMarker = (props: { establishment: Establishment, size: number }) => {
    const { establishment, size } = props;
    const { location } = establishment;
    
    return (
        <Marker
            key={establishment.id}
            longitude={location.longitude}
            latitude={location.latitude}
            onClick={(e) => {
                
            }}
            offset={[-size / 2, -size / 2]}
            
        >   
            <div className={`absolute w-[${size}] h-[${size}]`}>
                <Lottie alt="pulse icon"
                    animationData={pulseLottie}
                    autoPlay={true}
                    loop={true}
                    style={{ width: size * 10, height: size * 10 }}
                    className={"absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"}
                />
                <Lottie alt="flame icon"
                    animationData={flameLottie}
                    autoPlay={true}
                    loop={true}
                    style={{ width: size, height: size }}
                    className="absolute top-0 left-0 z-10"
                />
            </div>
        </Marker>
    );
};

export default EstablishmentMarker;