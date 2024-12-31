import React, { useState } from 'react';
import { useVisibility } from '../../contexts/VisibilityContext';


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);

  const toggleDropdown1 = () => setDropdown1Open(!dropdown1Open);
  const toggleDropdown2 = () => setDropdown2Open(!dropdown2Open);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { isVisible, toggleVisibility } = useVisibility();

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

          {/* Dropdown 1 */}
          <div className="relative">
            <button
              onClick={toggleDropdown1}
              className="bg-gray-100 px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between"
            >
              Month
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {dropdown1Open && (
              <ul className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-32 z-10">
                {['January', 'February', 'March'].map((month) => (
                  <li key={month} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    {month}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dropdown 2 */}
          <div className="relative">
            <button
              onClick={toggleDropdown2}
              className="bg-gray-100 px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between"
            >
              Month
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {dropdown2Open && (
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
          <button
          onClick={toggleVisibility}
        className="bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center"
      >
        Filter
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 10H6"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 6H3"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 14H9"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 18H12"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
          <div class="relative">

            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" fill="white" stroke="#B3B3B3" />
              <path
                d="M11.8598 25.5991L11.8598 25.599L11.8578 25.5937C11.6275 24.9821 11.6984 24.2919 12.0876 23.6488L12.0882 23.6478L13.2382 21.7378L13.2386 21.7372C13.3914 21.4826 13.521 21.1343 13.6119 20.8039C13.703 20.4732 13.7699 20.1075 13.7699 19.8099V16.9199C13.7699 13.4761 16.576 10.6699 20.0199 10.6699C23.4637 10.6699 26.2699 13.4761 26.2699 16.9199V19.8099C26.2699 20.1029 26.3369 20.4686 26.4275 20.8004C26.5183 21.1327 26.6473 21.4844 26.7984 21.7425L26.7983 21.7425L26.8011 21.7472L27.9406 23.6463C27.9407 23.6465 27.9409 23.6467 27.941 23.6469C28.2928 24.2365 28.3587 24.9486 28.1205 25.5976C27.8838 26.2424 27.3703 26.7321 26.7236 26.945L26.7205 26.946C24.5735 27.6682 22.2974 28.0299 20.0199 28.0299C17.7432 28.0299 15.4677 27.6685 13.3108 26.9465C12.5956 26.699 12.0816 26.209 11.8598 25.5991ZM12.5215 23.902L12.5215 23.902L12.5201 23.9044C12.2469 24.3639 12.1338 24.9141 12.3314 25.4248C12.5171 25.9411 12.9576 26.2887 13.4683 26.4631L13.4711 26.464C17.7539 27.8985 22.2951 27.8986 26.578 26.4643C27.0817 26.2964 27.4776 25.9151 27.6601 25.4097C27.8387 24.9154 27.7999 24.367 27.5176 23.901C27.5176 23.9009 27.5175 23.9008 27.5175 23.9008L26.37 21.9949C26.0349 21.4201 25.7699 20.4391 25.7699 19.7999V16.9199C25.7699 13.7438 23.196 11.1699 20.0199 11.1699C16.8543 11.1699 14.2699 13.7432 14.2699 16.9199V19.8099C14.2699 20.4477 13.9956 21.4388 13.67 21.9945L12.5215 23.902Z"
                fill="#A9A9A9" stroke="#B3B3B3" />
              <path
                d="M21.8075 11.4294L21.8075 11.4294L21.8031 11.4282C21.4954 11.3433 21.1954 11.2788 20.9034 11.2356L20.9034 11.2355L20.8943 11.2343C19.9798 11.116 19.0888 11.1796 18.247 11.4311L18.247 11.431L18.2371 11.4342C18.1525 11.4614 18.0551 11.4357 17.9909 11.3647C17.9251 11.292 17.9083 11.1945 17.9432 11.1088L17.9432 11.1088L17.9459 11.102C18.2812 10.2431 19.0969 9.68018 20.0301 9.68018C20.9642 9.68018 21.7766 10.2334 22.1123 11.0966C22.1499 11.201 22.1263 11.2992 22.0723 11.3614C22.024 11.4109 21.9514 11.4402 21.8801 11.4402C21.8584 11.4402 21.8346 11.4372 21.8075 11.4294Z"
                fill="#A9A9A9" stroke="#B3B3B3" />
              <path
                d="M20.02 30.3101C19.1634 30.3101 18.3304 29.9633 17.7236 29.3565C17.2358 28.8688 16.9161 28.2349 16.8094 27.5601H17.3167C17.4183 28.1017 17.6825 28.6096 18.0765 29.0036C18.59 29.5171 19.2971 29.8101 20.02 29.8101C21.3655 29.8101 22.4886 28.8384 22.7245 27.5601H23.2317C22.991 29.1169 21.6439 30.3101 20.02 30.3101Z"
                fill="#A9A9A9" stroke="#B3B3B3" />
            </svg>


          </div>

          {/* Profile */}
          <div className="relative">
            <div className="flex items-center justify-center">
              <img className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile" />
              <div className="space-y-0.2 font-medium text-left rtl:text-right ms-2">
                <div>Tanzir Rahman</div>
                <div className="text-xs text-gray-500">View profile</div>
              </div>
            </div>
          </div>
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
