import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-black top-0 w-full flex flex-col md:flex-row justify-between items-center text-white px-4 py-3 shadow relative">
            {/* Title always left on mobile and desktop */}
            <div className="w-full md:w-auto flex justify-between items-center">
                <p className='text-3xl font-semibold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text rounded-md border-4 border-transparent overflow-hidden mb-2 md:mb-0'>
                    𝕋𝕒𝕝𝕖𝕟𝕥𝕊𝕥𝕣𝕚𝕧𝕖
                </p>
                {/* Hamburger for mobile */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex flex-row justify-center items-center gap-4">
                <NavButton>About</NavButton>
                <NavButton>Contact</NavButton>
                <NavButton>
                    <Link to="/user/register" className="text-white no-underline">Sign Up</Link>
                </NavButton>
                <NavButton>
                    <Link to="/user/login" className="text-white no-underline">Sign In</Link>
                </NavButton>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-black shadow-lg flex flex-col items-center z-50 md:hidden">
                    <NavButton className="w-full">About</NavButton>
                    <NavButton className="w-full">Contact</NavButton>
                    <NavButton className="w-full">
                        <Link to="/user/register" className="text-white no-underline w-full block">Sign Up</Link>
                    </NavButton>
                    <NavButton className="w-full">
                        <Link to="/user/login" className="text-white no-underline w-full block">Sign In</Link>
                    </NavButton>
                </div>
            )}
        </nav>
    );
};

// Button component for consistent style
function NavButton({ children, className = "" }) {
    return (
        <button
            className={`text-white px-4 py-2 rounded hover:bg-gray-800 transition ${className}`}
        >
            {children}
        </button>
    );
}

export default Navbar;