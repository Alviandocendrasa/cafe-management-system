import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   

    const showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } 
        else {
            x.type = "password";
    }
    }

    const handleLoginSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        //const authentication = getAuth();
        //signInWithEmailAndPassword(authentication, email, password)
        /*       .then((response) => {
                toast.success('Login Successfully !')
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                console.log(response.user)
                setTimeout(() => {
                    navigate('/')
                    console.log(response.user)
                  }, 2000);
              })
              .catch(error => {   
                switch(error.code) {
                    case 'auth/user-not-found':
                        toast.error('User email not found !')
                    break;
                    case 'auth/wrong-password':
                        toast.error('Wrong password !')
                    break;
                    default:
                }
            }) */
    };

    const navigate = useNavigate();

  /*   const navigateSignup = () => {
        navigate('/Signup');
    }; */

  return (
    <div className="login-container">
        <ToastContainer
            position="top-center"
            autoClose={1000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />

          <div>
            <h1 className="login-title">Login</h1>
          </div>
          
          <form className="login-form" name="loginForm" onSubmit={handleLoginSubmit}>
            <div className ="input-group">
              <label>Email</label>
              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required /> 
            </div>

            <div>
              <label>Show Password</label>
              <input type="checkbox" className="checkbox" onClick={showPassword} />
            </div>

            <div>
                <button type="submit" className="submit-button">Login</button>
            </div>        
          </form>
        </div>
  )
}

export default LoginForm