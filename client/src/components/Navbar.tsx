import React from 'react';
import { Moon, Sun, MoveRight} from 'lucide-react';
import Google from "../assets/google.png";
import { Link } from 'react-router-dom';
type NavbarProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center">
  <Link to="/">
    <img src="df_logo_256.png" alt='DevForces Logo - A community for developers' className="h-10  mr-2" />
  </Link>
</div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          {/* <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors duration-300">
            <Github size={24} />
          </a> */}
          <button className="flex items-center px-4 py-2  rounded-lg shadow-md transition-all duration-300">
            <img src={Google} alt='Google Logo' className="h-6 mr-2" />
            <span className="text-base font-medium pr-2 text-white">Sign in</span>
            <MoveRight size={25} color="#ffffff" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
