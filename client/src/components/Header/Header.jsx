import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => {
  return (
    <nav className='navigation container'>
      <div className='logo'>
        <Link to='/'>Photo Booth</Link>
      </div>
      <div className='nav-items'>
        <NavLink to='/catalog'>Catalog</NavLink>
        <NavLink to='/upload'>Upload</NavLink>
      </div>
    </nav>
  );
};
