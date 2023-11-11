import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Paper, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, TextField, Button } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material';

import { login } from '../store/actions';
import Toast from "../components/Toast";
import LoginBoundary from "../boundaries/LoginBoundary";

const LoginPage = () => {
  const messages = useSelector(state => state.messages);
  const loading = useSelector(state => state.loading);

  const dispatch = useDispatch();
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

      const loginClass = new LoginBoundary();
      loginClass.test();
      dispatch(login(formData, navigate));    
  };

  return (
    <div className="form-page">
      <Toast messages={messages} />

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