import React from 'react'
import InputFields from './InputFields'

const HeroContainer = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url("/assets/images/beautiful-rainbow-nature.jpg")` }}>

    <div className="container">
      <InputFields></InputFields>

    </div>
  </div>
  )
}

export default HeroContainer
