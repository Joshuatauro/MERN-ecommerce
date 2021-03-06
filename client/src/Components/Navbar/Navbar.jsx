import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'

import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <h1 className="navbar__header">HoodieZone</h1>
        <ul className="navbar__links">
          <li>
            <Link className="navbar__link"></Link>
          </li>
          <li>
            <Link className="navbar__link">
              Wishlist
              <span className="navbar__icon">
                <AiOutlineHeart size="25" />
                <span className="navbar__wishlist">0</span>
              </span>
            </Link>
          </li>
          <li>
            <Link className="navbar__link">
            Cart
              <span className="navbar__icon">
                <AiOutlineShoppingCart size="25" />
                <span className="navbar__wishlist">0</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
