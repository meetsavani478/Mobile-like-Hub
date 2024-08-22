import React,{useState} from 'react';
import Axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './Cssfail/Npassword.css';

const Npassword =()=>{
    const [Data,setData]=useState({new_pass:null,new_pass_1:null});
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
   
        const {new_pass,new_pass_1}=Data;
        try{
            const Send_1 = await Axios.post('https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/New_login',{
                new_pass,new_pass_1},{
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
    
                    }
                });
            const apiData = Send_1.data;
            console.log(apiData);
            if(apiData){
                navigate('/Login');
            }else{
                window.alert(apiData.error);
            }
            
        }catch(error){
            console.log('Error fetching data:', error.response.data.error);
            window.alert(error.response.data.error);
        }
    }
    return(<div className='center_pass'>
    <form onSubmit={Submit} method="post" className='N_form'>
        <h3 className='N_h3'>ENTER YOUR PASSWORD </h3>
        <div className="N_main">
            <i className="fa-solid fa-key"></i>
            <input className='N_input' type="password" name="new_pass" required placeholder="new_password" onChange={data}/>
        </div>
        <br/>
        <div className="N_main">
            <i className="fa-solid fa-key"></i>
            <input type="password" className='N_input' name="new_pass_1" required placeholder="conform_password" onChange={data}/>
        </div>
        <br/>
        <button className='N_button' id="fun1" type="submit">Submit </button>
    </form>
    </div>);
}

export default Npassword

  