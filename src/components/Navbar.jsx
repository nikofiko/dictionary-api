import React, { useState } from 'react'
import logo from '../assets/images/logo.svg'
import thememoon from '../assets/images/icon-moon.svg'
import arrowdown from '../assets/images/icon-arrow-down.svg'

const Navbar = ({ toggleDarkMode }) => {
  const [font, setFont] = useState("inter");
  const [fontName, setFontName] = useState("Sans Serif");
  const [menu, showMenu] = useState(false);

  const handleFontClick = (font) => {
    setFontName(font); // Ustaw nazwę czcionki na klikniętą
  };

  const handleFontName = (font) => {
    setFont(font); // Ustaw nazwę czcionki
    let rot = document.getElementById("root")
    if(document.body.classList.length > 0){
      rot.removeAttribute("class")
      rot.classList.add(`font-${font}`)
    }
    rot.classList.add(`font-${font}`)
  };

  const handleMenu = () => {
    showMenu(!menu);
  };


  return (
    <div className='flex justify-between items-center px-3 lg:px-[351px] pt-[58px] dark:bg-blackest'>
      <div>
         <img src={logo} alt="" />
      </div>
      <div className='flex gap-[40px]'>
        <div onClick={handleMenu} className='flex gap-[18px] relative cursor-pointer'>
          <p className={`text-[18px] font-${font} font-bold dark:text-white`}>{fontName}</p>
          <div className='flex items-center'>
            <img src={arrowdown} alt="" />
          </div>

          {/* menu */}
          <div className={`${menu ? 'flex' : 'hidden'} absolute top-10 right-1 shadow-custom dark:shadow-customdark text-[18px] font-bold flex-col gap-[16px] pl-[24px] pr-[69px] py-[24px] rounded-2xl bg-white dark:bg-blackest`}>
            <p onClick={() => {handleFontClick("Sans Serif");handleFontName("inter");}} className='font-inter min-w-[89px] hover:text-violet cursor-pointer dark:text-white'>Sans Serif</p>
            <p onClick={() => {handleFontClick("Serif");handleFontName("lora");}} className='font-lora hover:text-violet cursor-pointer dark:text-white'>Serif</p>
            <p onClick={() => {handleFontClick("Mono");handleFontName("incon");}} className='font-incon hover:text-violet cursor-pointer dark:text-white'>Mono</p>
          </div>
        </div>
        <div className='flex gap-[20px]'>
          <div className="checkbox-wrapper-2 pt-1">
            <input onClick={toggleDarkMode} type="checkbox" className="sc-gJwTLC ikxBAC"></input>
          </div>
          <div>
            <svg className="text-gray dark:text-violet" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar


