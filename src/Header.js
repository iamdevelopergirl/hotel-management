import React from 'react';
import { Link } from 'react-router-dom'; 
import './styles/Header.css'; 

function Header(){
    return (
        <header>
          <nav>
            <div className="login-button-wrap">
              <button className="login-link">
                <Link to='/login' className="link">Login</Link>
              </button>
            </div>
          </nav>
        </header>
      );
}
export default Header;