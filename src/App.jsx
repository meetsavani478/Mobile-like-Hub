import React, { createContext} from "react";
import { Routes, Route} from 'react-router-dom';
import Logins from './viewflie/Login';
import Project from './viewflie/Project';
import Registration from './viewflie/Registration';
import Update_profile from './viewflie/Update_profile';
import User from './viewflie/User';
import Email from './viewflie/Email';
import OTP from './viewflie/OTP';
import Newpassword from './viewflie/Newpassword';
import Buypage from './viewflie/Buypage';
import Iphone from './viewflie/Iphone';
import PhoneData from "./viewflie/PhoneData";
import Footer from "./viewflie/footer";
import Payment from './viewflie/Payment';
import About from "./viewflie/About";
import Addcart from './viewflie/Add_to_cart';
import AdProduct from './adminpanel/adproduct';
import List from './adminpanel/List'
const Error = () => {
    return <h1>404 Error</h1>;
}
export const UserContext = createContext();
const App = () => {
   
    return (<>
            <Routes>
                <Route path="/Registration" element={<Registration />} />
                <Route path="/Login" element={<Logins />} />
                <Route path="/About" element={<About />} />
                <Route path="/" element={<Project id={10}/>} />
                <Route path="/Project/:id" element={<Project />} />
                <Route path="/User" element={<User />} />
                <Route path='/Update_profile' element={<Update_profile />} />
                <Route path="/Phone_Details/:name/:id" element={<Iphone />} />
                <Route path="/PhoneData/:name/:id" element={<PhoneData />} />

                <Route path='/Payment' element={<Payment />} />
                <Route path="/footer" element={<Footer />} />
                <Route path="/Buy/:num" element={<Buypage />} />
                <Route path="/Email" element={<Email />} />
                <Route path="/Addcart" element={<Addcart/>} />
                <Route path="/OTP" element={<OTP />} />
                <Route path="/New_password" element={<Newpassword />} />
             
             
                <Route path="/adProduct" element={<AdProduct />} />
                <Route path="/Product-List" element={<List />} />
                
             
                <Route path="*" element={<Error />} />
            </Routes>
    </>
    );
}
export default App;
