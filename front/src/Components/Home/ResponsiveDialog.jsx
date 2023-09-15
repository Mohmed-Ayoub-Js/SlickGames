import React , {useState , useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ResD() {
  const navigate = useNavigate();
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [type , setType] = useState('password');
  const [message , setMessage] = useState('');
  const [m , setM] = useState('عرض كلمة السر');
  const [colorb , setColor ] = useState('green');
  const [display, setDisplay] = useState('block');
  const [profile , setProfile] = useState('hidden');
  const handelSubmit =async () => {
  const res = await Axios.post('http://localhost:100/api/login', {
      email: email,
      password: password
    }
    );
    setMessage(res.data.message);
    console.log(res);
    if(res.data.message =='تم تسجيل الدخول بنجاح'){
      localStorage.setItem('token' , res.data.token );
      localStorage.setItem('id' ,res.data.id );
      navigate(`../createAccount/${res.data.token}`);
      setColor('green');
      setDisplay('hidden');
    } else {
      setColor('red');
    }
  }
  
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
   const handelType = () => {
    if(type === 'password'){
      setType('text');
      setM('اخفاء كلمة السر');
    } else {
      setType('password');
      setM('عرض كلمة السر');

    }
   }

   const link = localStorage.getItem("link");
   const id = localStorage.getItem("id");

   useEffect(() => {
     if (link) {
       setDisplay('hidden');
       setProfile('block');
     }
     if(id){
      setDisplay('hidden');
      setProfile('block');
     }
     if(link === null){
      setDisplay('block');
      setProfile('hidden');
     } if(id === null){
      setDisplay('block');
      setProfile('hidden');
     }
   },[]);
  return (
    <>
    <div className={profile}>
      <NavLink to={`../profile/${id}`}>
      <img style={{cursor:'pointer'}} src="https://static.vecteezy.com/system/resources/previews/027/703/220/non_2x/angry-character-mascot-gaming-logo-free-ai-generative-free-png.png" alt="" srcset=""width={50} height={50}/>
      </NavLink>
    </div>
    <div className={display}>
      <Button variant="outlined" onClick={handleClickOpen}>
       <p>تسجيل الدخول</p>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"تسجيل الدخول"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <h1 style={{color:colorb}}>{message}</h1>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="البريد الالكتروني"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {setEmail(e.target.value)}}
          />
         <TextField
            autoFocus
            margin="dense"
            id="name"
            label="كلمة السر"
            type={type}
            fullWidth
            variant="standard"
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <Button  onClick={handelType}>
            <p>{m}</p>
          </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            خروج
          </Button>
          <Button onClick={handelSubmit} autoFocus>
            تسجيل الدخول
          </Button>
          <NavLink to='../register'>
            <Button>
              ليس لدي حساب 
            </Button>
          </NavLink>
        </DialogActions>
      </Dialog>
    </div>
  </>
  );
}