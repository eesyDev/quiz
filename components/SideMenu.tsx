import React from 'react';
import { LuSearch } from "react-icons/lu";

const SideMenu = () => {
  return (
    <div className='side-menu fixed '>
      <div className="side-menu-inner flex flex-col">
        <button className='btn btn--bordered'><LuSearch/> Search in tests</button>
      </div>
    </div>
  )
}

export default SideMenu