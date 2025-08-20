import { Link } from "react-router-dom";
import { useState } from "react";
import Profile from "../assets/Profile.png";
import { LayoutDashboard, CheckSquare, BarChart3 } from "lucide-react";

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

  const navLinks = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Tasks", path: "/tasks", icon: <CheckSquare className="h-5 w-5" /> },
    { name: "Status", path: "/status", icon: <BarChart3 className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white shadow-lg p-6">
        
        {/* Profile (sampingan) */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-3 p-3 mb-8 rounded-md hover:bg-gray-50 transition"
        >
          <div className="relative">
            <img
              src={Profile}
              alt="User"
              className="h-12 w-12 rounded-full shadow-md"
            />
            {/* titik hijau status aktif */}
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-sm font-semibold text-gray-800">Salsabila</h2>
            <p className="text-xs text-gray-500">PKL</p>
          </div>
        </button>

        {/* Nav Links */}
        <ul className="flex flex-col gap-3">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 font-medium 
                          hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-sm transition-all duration-200"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white shadow-md flex items-center justify-between h-16 px-4">
        <button 
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-2"
        >
          <div className="relative">
            <img src={Profile} alt="User" className="h-8 w-8 rounded-full" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-gray-800 text-sm">Salsabila</span>
            <span className="text-xs text-gray-500">PKL</span>
          </div>
        </button>

        <button
          onClick={toggleMobileMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          {isMobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed inset-0 z-20 bg-white pt-16 ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-4 pt-2 pb-3 space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 font-medium 
                        hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-sm transition-all duration-200"
              onClick={toggleMobileMenu}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
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
  <div className="relative mb-4">
    <img
      src={Profile}
      alt="User"
      className="h-24 w-24 rounded-full"
    />
    <span className="absolute bottom-2 right-2 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></span>
  </div>
  <h3 className="text-lg font-semibold text-gray-800">{profileData.name}</h3>
  <p className="text-gray-600">{profileData.position}</p>
</div>
    <div className="space-y-3">
      <div className="flex border-b border-gray-200 pb-3">
        <span className="font-medium w-1/6 text-gray-500">Email:</span>
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