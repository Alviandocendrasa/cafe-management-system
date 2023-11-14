import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { Paper, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, TextField, Button } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import Toast from "../components/Toast";
import { apiCall, setTokenHeader} from '../services/api';

const LoginPage = () => {
  const { setCurrentUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setFormData(prevState => (
        {
            ...prevState,
            [event.target.name]: event.target.value
        }
    ))
  }

  const handleSubmit = (event) => {    
      // Prevent page reload
      event.preventDefault();

      login(formData);  
  };

  const login = async (userData) => {
      try {
        const res = await apiCall("post", `/api/auth/login`, userData);

        localStorage.setItem("jwtToken", res.data.token);
        setTokenHeader(res.data.token);
    
        setCurrentUser(res.data.user);

        navigate('/', { replace: true });
      } catch(err){
        console.log(err);
        toast.error(err.message);
      }
  }

  return (
    <div className="form-page">
      <Toast />

      <Paper className="paper" sx={{ minWidth: 325, minHeight: 400 }}>
        <form className="login-form" name="loginForm" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <FormControl
              sx={{width: '25ch' }}
              margin="normal"
            >
              <TextField 
                id="username"
                name="username" 
                label="Username" 
                variant="outlined" 
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>           

          <div>
            <FormControl
              sx={{width: '25ch' }}
              margin="normal"
            >
              <InputLabel htmlFor="password" required>Password</InputLabel>
                <OutlinedInput 
                  id="password" 
                  name="password" 
                  label="Password" 
                  value={formData.password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  required

                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
            </FormControl>
          </div>

          <div style={{marginTop: '12px'}}>
            <Button variant="contained" size="large" type="submit">Login</Button>
          </div>        
        </form>
      </Paper>
    </div>
  )
}

export default LoginPage;