import { Marker, Popup } from "react-map-gl";
import { Establishment } from "@utils/utility_types";
//@ts-ignore
import pulseLowLottie from "@assets/lottie/pulse_low.json";
import pulseMediumLottie from "@assets/lottie/pulse_medium.json";
import pulseHighLottie from "@assets/lottie/pulse_high.json";
import fireLowLottie from "@assets/lottie/fire_low.json";
import fireMediumLottie from "@assets/lottie/fire_medium.json";
import fireHighLottie from "@assets/lottie/fire_high.json";
import Lottie from "lottie-react";
import idleSVG from '@assets/svg/marker.svg';
import { useState } from "react";
import { MdClose } from "react-icons/md";

const EstablishmentMarker = (props: { establishment: Establishment, size: number }) => {
    const { establishment, size } = props;
    const { location } = establishment;
    const [showPopup, setShowPopup] = useState(false);
    var pulseLottie, flameLottie;
    
    switch (establishment.status) {
        case "LOW":
            pulseLottie = pulseLowLottie;
            flameLottie = fireLowLottie;
            break;
        case "MODERATE":
            pulseLottie = pulseMediumLottie;
            flameLottie = fireMediumLottie;
            break;
        case "EXTREME":
            pulseLottie = pulseHighLottie;
            flameLottie = fireHighLottie;
            break;
    }
    return (
        <Marker

            key={establishment.id}
            longitude={location.longitude}
            latitude={location.latitude}
            onClick={(e) => {

                setShowPopup(true);
            }}
            offset={establishment.status == "IDLE" ? [-size / 2, -size] : [-size / 2, -size / 2]}
            anchor={establishment.status == "IDLE" ? "bottom" : "center"}
        >
            
            <div className={`absolute`} style={{ width: size, height: size }}>

                {
                    establishment.status != "IDLE" ?
                        <>
                            <Lottie alt="Pulse animation"
                                animationData={pulseLottie}
                                autoPlay={true}
                                loop={true}
                                style={{ width: size * 10, height: size * 10 }}
                                className={"absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"}
                            />
                            <Lottie alt="Flame animation"

                                animationData={flameLottie}
                                autoPlay={true}
                                loop={true}
                                style={{ width: size, height: size }}
                                className="absolute top-0 left-0 z-10 cursor-pointer"
                            />
                        </>
                        :
                        <img src={idleSVG} alt="idle" className="w-full h-full cursor-pointer" style={{ width: size, height: size }} />

                }
                {
                showPopup ?
                    <Popup
                        longitude={location.longitude}
                        latitude={location.latitude}
                        closeOnClick={false}
                        onClose={() => setShowPopup(false)}
                        closeButton={false}
                        anchor="bottom"
                        offset={establishment.status == "IDLE" ? [0, size * -0.5] : [0, -size * 0.2]}
                        
                        
                        className="relative p-5 text-black"
                    >
                        <MdClose className="absolute text-xs cursor-pointer right-1 top-1 hover:text-red_crayola" onClick={(e) => setShowPopup(false)}></MdClose>
                        <div className="mt-3 text-center">
                            <h1 className="text-xl font-bold">{establishment.establishment_name}</h1>
                            <h1 className="text-sm font-bold">ALERT LEVEL: {establishment.status}</h1>
                        </div>
                    </Popup>
                    : <></>
            }
            </div>
        </Marker>
    );
};

export default EstablishmentMarker;