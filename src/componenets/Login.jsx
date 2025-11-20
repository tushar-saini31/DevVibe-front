import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Show signup if Navbar passes state
useEffect(() => {
  // Show login by default
  if (location.state?.showSignup) {
    setIsLoginForm(false);
  } else {
    setIsLoginForm(true);
  }
}, [location.key, location.state]);


  const handleSignUp = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Something went wrong.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Invalid credentials.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn-ilajckf.nitrocdn.com/utLabjbGVjpaYDQkazoKnooguTzYeQRR/assets/images/optimized/rev-86d95f4/tamediacdn.techaheadcorp.com/wp-content/uploads/2022/02/16051143/MicrosoftTeams-image-38-1.png')",
      }}
    >
      <div className="flex justify-center my-10">
        <div className="bg-gray-500/60 backdrop-blur-sm shadow-lg border border-gray-500 p-8 rounded-xl w-96 text-center">
          <h2 className="text-white text-2xl font-bold mb-4">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={isLoginForm ? handleLogin : handleSignUp} // ✅ handles Enter key
          >
          {/* Signup fields */}
          {!isLoginForm && (
            <>
              <div className="p-2">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="p-2">
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Email & Password */}
          <div className="p-2">
            <input
              type="email"
              value={email}
              placeholder="mail@site.com"
              required
              className="w-full p-2 rounded bg-gray-800 text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="p-2">
            <input
              type="password"
              value={password}
              required
              placeholder="Password"
              className="w-full p-2 rounded bg-gray-800 text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {/* Submit button */}
          <div className="mt-4">
            <button
              className="w-40 p-2 bg-purple-600 text-white rounded-lg"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
         </form>
          {/* Toggle form link */}
          <p
            className="text-blue-400 cursor-pointer mt-2"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm
              ? "Don't have an account yet?"
              : "Have an account already?"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
