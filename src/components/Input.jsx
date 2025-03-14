import React, { useState } from 'react'
import search from '../assets/images/icon-search.svg'

const Input = ({ onSearch }) => {
    const [inputValue, setValue] = useState("");
    const [error, setError] = useState(false);

    const handleSearch = () => {
      if (!inputValue.trim()) {
        setError(true);
      } else {
        onSearch(inputValue);
        setValue('');
        setError(false);
      }
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

  return (
    <>
      <div className={`${!error ? 'border-0' : 'border-1 border-red hover:px-[24px] hover:py-[19px] hover:border-red'} hover:border-1 hover:border-violet cursor-pointer hover:px-[24px] hover:py-[19px] mt-[51px] flex justify-between mx-[15px] lg:mx-[351px] px-[25px] py-[15px] lg:py-[20px] rounded-[12px] bg-lightgray dark:bg-blackless`}>
        <input value={inputValue} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} className="w-full outline-none font-semibold text-[18px] text-blacker dark:text-white" type="text" placeholder='Search for any word...'/>
        <div className='flex items-center' onClick={() => handleSearch()}>
          <img src={search} alt="" />
        </div>
      </div>
      <p className={`${!error ? 'hidden' : 'block text-red mx-[15px] lg:mx-[351px]'}`}>Whoops, can't be empty...</p>
    </>
    
  )
}

export default Input
