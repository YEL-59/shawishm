import React, { useState } from 'react';
import { useVisibility } from '../../contexts/VisibilityContext';

import { Link, useLocation } from 'react-router-dom';
import { useDropdown } from '../../contexts/DropdownContext';

import DateFilter from '../datefilter/DateFilter';
import FilterIcon from '../../assets/icons/FilterIcon';
import { useUser } from '../../contexts/UserProvider';
import Personicon from '../../assets/icons/Personicon';


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);

  const toggleDropdown1 = () => setDropdown1Open(!dropdown1Open);
  const toggleDropdown2 = () => setDropdown2Open(!dropdown2Open);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { dropdownData, setDropdownData } = useDropdown();
  const { isVisible, toggleVisibility } = useVisibility();
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const isSetting = location.pathname === '/settings';
  const { user } = useUser();



  const handleDropdown1Select = (value) => {
    setDropdownData((prev) => ({ ...prev, dropdown1: value }));
    setDropdown1Open(false);
  };

  const handleDropdown2Select = (value) => {
    setDropdownData((prev) => ({ ...prev, dropdown2: value }));
    setDropdown2Open(false);
  };


  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <header className="bg-white shadow p-4">
      <div className="flex justify-between items-center">
        {/* Search Bars */}
        {!isDashboard && !isSetting && (<div className="flex gap-5">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex items-center border rounded-lg border-gray-300 bg-white pr-7 overflow-hidden transition-all duration-300 ease-in-out">
              <input
                type="text"
                className="placeholder-gray-500 focus:outline-none p-2 focus:border-blue-500"
                placeholder="Search here"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="text-gray-500"
              >
                <path
                  d="M8.625 16.3125C4.3875 16.3125 0.9375 12.8625 0.9375 8.625C0.9375 4.3875 4.3875 0.9375 8.625 0.9375C12.8625 0.9375 16.3125 4.3875 16.3125 8.625C16.3125 12.8625 12.8625 16.3125 8.625 16.3125ZM8.625 2.0625C5.0025 2.0625 2.0625 5.01 2.0625 8.625C2.0625 12.24 5.0025 15.1875 8.625 15.1875C12.2475 15.1875 15.1875 12.24 15.1875 8.625C15.1875 5.01 12.2475 2.0625 8.625 2.0625Z"
                  fill="#A9A9A9"
                />
                <path
                  d="M16.5001 17.0626C16.3576 17.0626 16.2151 17.0101 16.1026 16.8976L14.6026 15.3976C14.3851 15.1801 14.3851 14.8201 14.6026 14.6026C14.8201 14.3851 15.1801 14.3851 15.3976 14.6026L16.8976 16.1026C17.1151 16.3201 17.1151 16.6801 16.8976 16.8976C16.7851 17.0101 16.6426 17.0626 16.5001 17.0626Z"
                  fill="#A9A9A9"
                />
              </svg>
            </div>
          ))}
        </div>)}


        {/* Right Section */}
        <div className="flex gap-5 items-center ml-auto">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="block lg:hidden text-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {!isDashboard && !isSetting && (<> {/* Dropdown 1 */}
            <div className="relative">
              <button
                onClick={toggleDropdown1}
                className="bg-transparent border px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between"
              >
                {dropdownData.dropdown1 || 'BMD'}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {dropdown1Open && (
                <ul className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-32 z-10">
                  {['All', 'BMD', 'CR', 'CT'].map((item) => (
                    <li
                      key={item}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDropdown1Select(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dropdown 2 */}
            <div className="relative">
              <button
                onClick={toggleDropdown2}
                className="bg-transparent border px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between"
              >
                {dropdownData.dropdown2 || 'Select Year'}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {dropdown2Open && (
                <ul className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-32 z-10">
                  {['ALL', 'With Image', 'Without Images'].map((year) => (
                    <li
                      key={year}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDropdown2Select(year)}
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* <div>

            <DateFilter/>
            
          </div> */}

            {/* Filter Button */}
            <button
              onClick={toggleVisibility}
              className="bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center"
            >
              Filter

              <FilterIcon className="text-sm" />

            </button></>)}




          {/* User Profile */}
          <Link to="/profile">
            <div className="relative">
              <div className="flex items-center justify-center">
                <img
                  className="rounded-full w-9 h-9"
                  src={Personicon}
                  alt="profile"
                />
                {user && <div className="space-y-0.2 font-medium text-left ms-2">
                  <div>{user?.username || 'User'}</div>
                  <div className="text-xs text-gray-500">   View profile </div>
                </div>}
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4">
          <ul className="space-y-2">
            <li className="border-b py-2">Menu Item 1</li>
            <li className="border-b py-2">Menu Item 2</li>
            <li className="border-b py-2">Menu Item 3</li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
