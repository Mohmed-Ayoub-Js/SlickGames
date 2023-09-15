import React from 'react';
import Appbar from '../Components/Home/Appbar';
import Class from '../Components/Home/Class';
import Games from '../Components/Home/Games';
import Search from '../Components/Home/Search';
import Like from '../Components/Home/Like';

const Home = ({ themeMode, toggleTheme }) => {
  return (
    <div>
      <Appbar themeMode={themeMode} toggleTheme={toggleTheme} />
      <div className='flex justify-between items-start gap-5 flex-col-reverse md:flex-row'>
        <div>
          <Class />
          <Search />
          <Like />
        </div>
        <div>
          <Games />
        </div>
      </div>
    </div>
  );
}

export default Home;
