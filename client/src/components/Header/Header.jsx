import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Pivot as Hamburger } from 'hamburger-react'

const Header = () => {

  const [isHamburguerOpen, setHamburguerOpen] = useState(false)

  const alternateHamburguer = () => {
    setHamburguerOpen(!isHamburguerOpen)
  }
  
  const disableHamburguer = () => {
    setHamburguerOpen(false)
  }

  return <header>
    <Link onClick={ disableHamburguer } to={ "/" } className="logo-container">
      <img src="/assets/logo.svg" alt="logo" />
    </Link>

    <div className="hamburguer-container">
      <Hamburger color="#ffffff" toggled={isHamburguerOpen} toggle={ setHamburguerOpen } />

      <div className={ `dropdown-container ${ isHamburguerOpen ? "show" : "" }` }>
        <ul>
          <li>
            <Link onClick={ alternateHamburguer } to={ "/stages-scores" }>Stages scores</Link>
          </li>

          <li>
            <Link onClick={ alternateHamburguer } to={ "/news" }>News</Link>
          </li>
        </ul>
      </div>
    </div>

  </header>;
};

export default Header;
