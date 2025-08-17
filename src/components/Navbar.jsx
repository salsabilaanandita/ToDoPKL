import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Logo.png";
import Profil from "../assets/Profil.jpeg";


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const profileData = {
    name: "Salsabila Anandita Putri",
    email: "salsabilaananditaputri@gmail.com",
    position: "Front-End Developer Student",
    department: "PPLG - SMK Wikrama",
    bio: "SMK student passionate about front-end development, especially in React and Tailwind CSS. Interested in building modern, user-friendly web applications and continuously learning new technologies.",
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <nav className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white shadow-lg p-6">
        <div className="flex items-center mb-8">
          <img src={Logo} alt="Your Company" className="h-10 w-auto mr-2" />
          <span className="font-bold text-lg text-gray-800">ToDoPKL</span>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              to="/"
              className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 font-medium transition"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 font-medium transition"
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/status"
              className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 font-medium transition"
            >
              Status
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white shadow-md flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <img src={Logo} alt="Your Company" className="h-8 w-auto mr-2" />
          <span className="font-bold text-lg text-gray-800">ToDoPKL</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 transition"
            onClick={() => setShowProfileModal(true)}
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
            <span className="font-medium">Salsabila</span>
          </button>
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Desktop profile button - moved to top right but with name */}
      <div className="hidden md:flex fixed top-4 right-4 z-20 items-center gap-4 bg-white p-2 rounded-full shadow-sm">
        <button 
          className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1 rounded-full transition"
          onClick={() => setShowProfileModal(true)}
        >
          <span className="font-medium">Salsabila</span>
          <img
            src={Profil}
            alt="User"
            className="h-10 w-10 rounded-full"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed inset-0 z-20 bg-white pt-16 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 font-medium transition" 
            onClick={toggleMobileMenu}
          >
            Dashboard
          </Link>
          <Link 
            to="/tasks" 
            className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 font-medium transition" 
            onClick={toggleMobileMenu}
          >
            Tasks
          </Link>
          <Link 
            to="/status" 
            className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 font-medium transition" 
            onClick={toggleMobileMenu}
          >
            Status
          </Link>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Profile</h2>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <img
                src={Profil}
                alt="User"
                className="h-24 w-24 rounded-full mb-4"
              />
             
              <h3 className="text-lg font-semibold text-gray-800">{profileData.name}</h3>
              <p className="text-gray-600">{profileData.position}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-medium w-1/3 text-gray-500">Email:</span>
                <span className="text-gray-800">{profileData.email}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-medium w-1/3 text-gray-500">Major - School:</span>
                <span className="text-gray-800">{profileData.department}</span>
              </div>
              <div className="pt-2">
                <span className="font-medium block mb-2 text-gray-500">Bio:</span>
                <p className="text-gray-800">{profileData.bio}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowProfileModal(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}