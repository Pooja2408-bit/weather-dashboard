import React from 'react'

const Header = () => {
  return (
    <div className="site-header">
    <div className="container">
      <a href="index.html" className="branding">
        <img src="assets/images/logo.png" alt="" className="logo" />
        <div className="logo-type">
          <h1 className="site-title">Weather Forecast</h1>
          <small className="site-description">Search for weather worldwide</small>
        </div>
      </a>
    </div>
  </div>
  )
}

export default Header
