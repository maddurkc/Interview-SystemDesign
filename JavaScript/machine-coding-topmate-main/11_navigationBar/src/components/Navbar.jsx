import { useState } from 'react';
import '../components/Navbar.css';

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const navToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className='nav'>
      <a href='#' className='nav__brand'>
        Home
      </a>
      <ul className={`nav__menu ${isActive ? 'nav__active' : ''}`}>
        <li className='nav__item'>
          <a href='#home' className='nav__link'>
            Home
          </a>
        </li>
        <li className='nav__item'>
          <a href='#about' className='nav__link'>
            About
          </a>
        </li>
        <li className='nav__item'>
          <a href='#portfolio' className='nav__link'>
            Portfolio
          </a>
        </li>
        <li className='nav__item'>
          <a href='#skills' className='nav__link'>
            Skills
          </a>
        </li>
        <li className='nav__item'>
          <a href='#contact' className='nav__link'>
            Contact
          </a>
        </li>
      </ul>
      <div
        onClick={navToggle}
        className={`nav__toggler ${isActive ? 'toggle' : ''}`}
      >
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
    </nav>
  );
}

export default Navbar;
