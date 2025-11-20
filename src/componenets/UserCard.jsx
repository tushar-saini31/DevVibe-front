import { useDispatch } from "react-redux";
import { BASE_URL, DEFAULT_PROFILE_PIC } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { motion } from "framer-motion";

const UserCard = ({ user }) => {
  if (!user) return <p>Loading...</p>;

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          scale: 1.03,
          y: -6,
          boxShadow: "0px 12px 35px rgba(255,105,180,0.4)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-80 bg-gray-700 text-white backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 transform"
      >
        {/* Image with Gradient Border */}
        <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-3xl">
          <img
            className="w-full h-72 object-cover rounded-t-2xl border-4 border-black"
            src={photoUrl || DEFAULT_PROFILE_PIC}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_PROFILE_PIC;
            }}
            alt="User Profile"
          />
        </div>

        {/* Info Section */}
        <div className="p-5 space-y-3 group">
          {/* Name */}
          <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600 flex items-center justify-center gap-2 drop-shadow-lg">
            🧑‍💻 {firstName} {lastName}
          </h2>

          {/* Age & Gender */}
          {age && gender && (
            <div className="flex justify-center gap-3 mt-1">
              <span className="px-3 py-1 bg-pink-700/40 rounded-full text-sm font-medium">
                🎂 {age} yrs
              </span>
              <span className="px-3 py-1 bg-purple-700/40 rounded-full text-sm font-medium">
                🚻 {gender}
              </span>
            </div>
          )}

          {/* Bio */}
          <p className="text-center text-gray-300 italic">
            {about || "💬 This user hasn't added a bio yet!"}
          </p>

          {/* Buttons */}
          <div className="flex justify-between mt-5 space-x-4">
            <motion.button
              whileTap={{
                scale: 1.2,
                boxShadow: "0px 0px 12px rgba(255,255,255,0.3)",
              }}
              className="flex-1 bg-gray-800 hover:bg-gray-500 text-sm font-semibold py-2 rounded-2xl transition duration-200"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              ❌ Ignore
            </motion.button>

            <motion.button
              whileTap={{
                scale: 1.2,
                boxShadow: "0px 0px 15px rgba(255,105,180,0.6)",
              }}
              className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-700 text-white text-sm font-semibold py-2 rounded-2xl transition duration-200"
              onClick={() => handleSendRequest("interested", _id)}
            >
              ❤️ Interested
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserCard;
