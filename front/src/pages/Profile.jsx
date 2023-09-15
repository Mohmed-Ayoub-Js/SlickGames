import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Appbar from '../Components/Home/Appbar';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import  Button  from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
const Profile = ({ themeMode, toggleTheme }) => {
  const handelRemove = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('address');
    localStorage.removeItem('city');
    localStorage.removeItem('state');
    localStorage.removeItem('country');
    localStorage.removeItem('pincode');
    localStorage.removeItem('role');
    localStorage.removeItem('image');
    window.location.reload();
    window.location.href = '/';
  }
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(`http://localhost:100/user/${id}`);
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Appbar themeMode={themeMode} toggleTheme={toggleTheme} setting={<LogoutIcon/>}/>
      {data.map((item, index) => (
      <div key={index}>
        <div>
          <div className="flex justify-center items-center flex-col">
            <div className="flex justify-center items-center flex-col rounded-lg shadow-2xl">
            <img src="https://static.vecteezy.com/system/resources/previews/027/703/220/non_2x/angry-character-mascot-gaming-logo-free-ai-generative-free-png.png" alt="" srcset=""width={200} height={200} />
              <h5 className="">{item.username}</h5>
            </div>
          </div>
        </div>
        <div>
      </div>
      </div>
      ))}
        <div className='flex justify-center items-center flex-col'>
        <NavLink to='../add'>
          <Button><p className='text-lime-500'>اضافة لعبة</p></Button>
        </NavLink>
          <Button onClick={handelRemove}><p className='text-red-500'>تسجيل الخروج</p></Button>
        </div>
      </div>
  );
};

export default Profile;
