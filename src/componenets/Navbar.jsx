import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { DEFAULT_PROFILE_PIC, BASE_URL } from "../utils/constants";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    // Hide the confirmation modal first
    setShowLogoutConfirm(false);

    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.log("Server logout failed", err);
    }

    dispatch(removeUser());
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <div className="navbar fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-red-400 to-blue-700 shadow-md flex justify-between items-center px-10 py-3">
        
        {/* Logo */}
        <div className="flex-1">
          <span
            className="text-white text-2xl font-extrabold cursor-pointer hover:text-yellow-200 transition duration-200"
            onClick={() => navigate("/")}
          >
            DevVibe
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              {/* Login & Signup */}
              <button
                className={`px-3 py-1 font-medium transition duration-200 ${
                  isActive("/login") && !location.state?.showSignup
                    ? "bg-white text-gray-800 rounded-full"
                    : "text-white hover:text-yellow-300"
                }`}
                onClick={() => navigate("/login", { state: { showSignup: false } })}
              >
                Login
              </button>
              <button
                className={`px-3 py-1 font-medium transition duration-200 ${
                  isActive("/login") && location.state?.showSignup
                    ? "bg-white text-gray-800 rounded-full"
                    : "text-white hover:text-yellow-300"
                }`}
                onClick={() => navigate("/login", { state: { showSignup: true } })}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              {/* Other buttons */}
              <button
                className={`px-3 py-1 font-medium transition duration-200 ${
                  isActive("/connections") ? "bg-white text-gray-800 rounded-full" : "text-white hover:text-yellow-300"
                }`}
                onClick={() => navigate("/connections")}
              >
                Connections
              </button>
              <button
                className={`px-3 py-1 font-medium transition duration-200 ${
                  isActive("/requests") ? "bg-white text-gray-800 rounded-full" : "text-white hover:text-yellow-300"
                }`}
                onClick={() => navigate("/requests")}
              >
                Requests
              </button>
              <button
                className={`px-3 py-1 font-medium transition duration-200 ${
                  isActive("/premium") ? "bg-white text-gray-800 rounded-full" : "text-white hover:text-yellow-300"
                }`}
                onClick={() => navigate("/premium")}
              >
                Premium
              </button>

              {/* Logout with confirmation */}
              <button
                className="px-3 py-1 font-medium transition duration-200 text-white hover:text-yellow-300"
                onClick={() => setShowLogoutConfirm(true)}
              >
                Logout
              </button>

              {/* Profile avatar */}
              <div
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-white hover:border-yellow-300 transition duration-200"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={user?.photoUrl?.trim() ? user.photoUrl : DEFAULT_PROFILE_PIC}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400 animate-gradient bg-opacity-50 z-50">
          <div className="bg-gray-600 rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-800"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
