import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button'
import Axios from 'axios';
import Rating from '@mui/material/Rating';
const Like = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      Axios.get('http://localhost:100/api/game')
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  return (
    <div>
         <div className="md:grid md:grid-cols-2 md:gap-4 flex justify-center items-center flex-col">
      </div>
        <div className=' p-[10px] m-[20px] rounded-lg shadow-lg w-[300px] '>
           <h1>
            العاب قد تعجبك
           </h1>
           {Array.isArray(data) ? (
          data.map((item, index) => (
            <div key={index} className='drop-shadow-2xl p-[20px] flex justify-center items-center flex-col shadow-lg rounded-lg mt-[5px]'>
              <div>
                <img
                  className='rounded-lg shadow-lg hover:scale-90'
                  style={{ cursor: 'pointer', transition: '0.5s' }}
                  src={item.image}
                  alt=""
                />
              </div>
              <div>{item.game}</div>
              <div>{item.des}</div>
              <div className='flex justify-center items-center gap-[50px]'>
                <Rating name="read-only" value={item.value} readOnly />
                <p>{item.size}</p>
              </div>
              <div>
                <NavLink to={item.download}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '100%' }}
                  >
                    <p>تـــحميل</p>
                  </Button>
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <div>لا توجد عت</div>
        )}
        </div>
        
    </div>
    )
}

export default Like