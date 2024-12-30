import React, { useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow p-4">
      <div className="flex justify-between items-center">
        {/* Search Bars */}
        <div className="flex gap-5">
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
        </div>

        {/* Right Section */}
        <div className="flex gap-5 items-center">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="block lg:hidden text-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-gray-100 px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between"
            >
              Month
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-32 z-10">
                {['January', 'February', 'March'].map((month) => (
                  <li key={month} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    {month}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filter Button */}
          <button className="bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center">
            Filter
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 10H6" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 6H3" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 14H9" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 18H12" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
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
