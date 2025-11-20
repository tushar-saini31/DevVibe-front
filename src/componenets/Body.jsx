import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      console.log("Not logged in");
    }
  };

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      fetchUser();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/feed", { replace: true });
    }
  }, [user, location.pathname]);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Base background gradient for all non-auth pages */}
      {!isAuthPage && (
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400 animate-gradient"></div>
      )}

      {/* Auth page background */}
      {isAuthPage && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400 animate-gradient z-0"></div>
      )}

      {/* Watermark for auth pages */}
      {isAuthPage && (
        <div className="absolute inset-0 flex p-20 justify-center text-center z-0">
          <div className="text-amber-800 text-[10rem] font-extrabold opacity-15 select-none pointer-events-none leading-[1.1]">
            <div>Connect</div>
            <div>with</div>
            <div>DevVibe</div>
          </div>
        </div>
      )}

      {/* Foreground */}
      <div className="relative z-10 flex flex-col flex-grow min-h-screen w-full">
        <Navbar />

        {/* Main content with subtle grey background behind cards */}
        <main className="relative flex-grow flex items-center justify-center p-3 w-full">
          {/* Grey layer (only for non-auth pages) */}
          {!isAuthPage && (
            <div className="absolute inset-0 bg-gray-900 backdrop-blur-sm rounded-3xl shadow-lg max-w-3xl mx-auto z-0 h-185"></div>
          )}

          {/* Actual page content */}
          <div className="relative w-full max-w-6xl z-10">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Body;
