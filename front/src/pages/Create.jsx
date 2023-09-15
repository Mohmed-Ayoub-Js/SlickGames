import React, { useState, useEffect } from 'react';
import Appbar from '../Components/Home/Appbar';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const Create = ({ themeMode, toggleTheme }) => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(''); // تحتاج إلى تحديد متغير لاسم المستخدم

  useEffect(() => {
    Axios.get('http://localhost:100/check', {
      headers: {
        "my-token": localStorage.getItem("token"),
      }
    })
      .then((res) => {
        setMessage(res.data.message);
        setData(res.data);
        console.log(data);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  }, []);
const link = localStorage.getItem("link")
  return (
    <div>
      <div>
        <Appbar themeMode={themeMode} toggleTheme={toggleTheme} dis='hidden' />
      </div>
      <div className='flex justify-center items-center mt-[50px]'>
        {/* استخدم NavLink للانتقال إلى صفحة الملف الشخصي */}
        <NavLink to={`../profile/${link}`}>
          <Button>
            <p>حسابي</p>
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default Create;
