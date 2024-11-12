import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from "../AuthContex.jsx";


const AdLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const id =1;

        // Simulate server-side validation
        if (email === 'admin@gmail.com' && password === 'admin123') {
          login('admin',id); 
                sessionStorage.setItem('isLoggedIn', '1');
                sessionStorage.setItem('id', id);
           navigate('/admin/dashboard');
        } else {
          setError('Invalid login credentials');
        }
    };


        return (
            
            <div className="Login">
                <h5 style={{textAlign:"center"}}>Admin Login</h5>
                <form onSubmit={handleLogin}>
                    <br/>
                    {error && <p>{error}</p>}
                    <input type="email" name="username" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                    <input type="button" value="Login" onClick={handleLogin} />
                    
                </form>
            </div>
            
        );
    
}

export default AdLogin;