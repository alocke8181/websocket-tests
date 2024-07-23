import {React} from "react";

const InfoBox = ({isConnected, message})=>{
    return (
    <div>
        <p>State: {''+isConnected}</p>
        <p>Message: {''+message}</p>
        </div>
    
    );
};

export default InfoBox;