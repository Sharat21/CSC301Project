import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import './TripDetails.css';
const Bar = () => {
    const links = [
        { id: 1, site: "home" },
        { id: 2, site: "accommodation" },
        { id: 3, site: "activities" },
        { id: 4, site: "budget" },
        { id: 5, site: "destination" },
        { id: 6, site: "restaurants" }
    ];

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='shadow-md w-full fixed top-0 left-0 bar'>
            <div className="md:px-10 py-4 px-7 md:flex justify-between items-center text-white navbarcolor">

                <div className="md:hidden">
                    {menuOpen ? (
                        <FaTimes onClick={toggleMenu} className="text-2xl cursor-pointer" />
                    ) : (
                        <FaBars onClick={toggleMenu} className="text-2xl cursor-pointer" />
                    )}
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 flex transition-all duration-500 ease-in ${menuOpen ? 'top-12' : 'top-[-490px]'}`}>
                    {links.map(({ id, site }) => (
                        <li key={id} className="px-6 cursor-pointer capitalize font-medium hover:text-slate-400 duration-200 my-5 md:my-1 flex-grow">
                            {site}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Bar;