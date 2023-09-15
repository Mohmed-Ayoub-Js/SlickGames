import React , {useState} from 'react'
import Appbar from '../Components/Home/Appbar';
import Class from '../Components/Home/Class';
import Search from '../Components/Home/Search';
import Like from '../Components/Home/Like';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
const Register = ({ themeMode, toggleTheme }) => {
  const [message, setMessage] = useState('انشاء حساب');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const handleSubmit = async (e) => {
    if(password != password2) {
        alert('Passwords do not match');
    } else {    
          const res = await Axios.post('http://localhost:100/api/register', {
            email: email,
            password: password,
            username: username,
          })
         setMessage(`${res.data.message}`); 
    }
  };
  
  return (
    <div>
      <Appbar themeMode={themeMode} toggleTheme={toggleTheme} />
      <div className='flex justify-between items-start gap-5 flex-col-reverse md:flex-row'>
        <div>
          <Class />
          <Search />
          <Like />
        </div>
        <center className='mt-[50px]'>
            <h1 className='text-3xl font-bold'> {message} </h1>
            <Stack
      component="form"
      sx={{
        width: '25ch',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        label='البريد الالكتروني'
        onChange={(e) => {setEmail(e.target.value)}}
      />

      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        label='اسم المستخدم'
        onChange={(e) => {setUsername(e.target.value)}}
      />
      <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
        variant="filled"
        label='كلمة السر' 
        type='password'
        onChange={(e) => {setPassword(e.target.value)}}
      />
     <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
        variant="filled"
        label='اعادة كلمة السر'
        type='password' 
        onChange={(e) => {setPassword2(e.target.value)}}
      />
      <Button variant="contained" onClick={handleSubmit}><p>تسجيل الدخول</p></Button>
      <NavLink to='../'>
        <p>
          الرجوع
        </p>
      </NavLink>
    </Stack>
        </center>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Register