
import React,{useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cssfail/OTP.css';
const OTP =()=>{

    const [Data,setData]=useState({OTP:null});
    const data = (event) =>{
        const {name,value}=event.target;
        setData((oldData)=>({
            ...oldData,
            [name]:value
        }))
    }
    const navigate=useNavigate();
    const Submit = async (e) =>{
        e.preventDefault();
   
        const {OTP}=Data;
        try{
        const Send = await Axios.post('http://localhost:4000/NEW_PASSWORD',{
            OTP},{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                }
            });
            const apiData = Send.data;
            console.log(apiData);
            if(apiData){
                navigate('/New_password');
            }else{
                window.alert(apiData.error);
            }
            
        }catch(error){
            console.log('Error fetching data:', error.response.data.error);
            window.alert(error.response.data.error);
        }
}
    return(<div className='OTP_body'>
    <form onSubmit={Submit} method="post" className="OTP_form">
        <h3 className='OTP_h3'>ENTER YOUR OTP PLEASE </h3>
        <div className="OTP_main">
            <i className="fa-solid fa-bell"></i>
            <input className='OTP_input' type="OTP" name="OTP" value={Data.OTP} required placeholder="OTP" onChange={data}/>
        </div>
        <br/>
        <button id="fun1" type="submit" className='OTP_button'> Submit </button>
    </form>
    </div>)
}
export default OTP