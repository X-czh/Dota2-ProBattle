import React from 'react';
import './styles.scss';

class Header extends React.Component {
  render() {
    return (
        <header className="page_header">
          <nav className="navbar_menu">
            <ul id="navbar_list">
              <a className="menu_link"><li>Dota2 ProBattle</li></a>
              <a className="menu_link"><li>Section1</li></a>
              <a className="menu_link"><li>Section2</li></a>
              <a className="menu_link"><li>Section3</li></a>
              <a className="menu_link"><li>Section4</li></a>
            </ul>
          </nav>
        </header>
    );
  }
}

export default Header;
