import { useEffect, useState } from "react";
import { BASE_URL, DEFAULT_USER_PIC } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/ConnectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error("Error fetching connections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (loading) return <Shimmer />;

  if (!connections || !Array.isArray(connections)) {
    return (
      <h1 className="text-white text-xl text-center mt-10">Loading...</h1>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-white mb-6">Connections</h1>
        <div className="bg-red-400 rounded-xl shadow-xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-white mb-4">
            No Connections Found
          </h2>
          <p className="text-white mb-6">Try searching for new connections!</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Search New Connections
          </button>
        </div>
      </div>
    );
  }

  // ✅ Render scrollable container of connection cards
  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-start pt-24">
      <div
        className="bg-opacity-50 backdrop-blur-md w-[90%] max-w-xl rounded-2xl p-6
                   shadow-[0_0_25px_rgba(255,0,0,0.5)] border border-amber-300 transition-all duration-300"
      >
        <h1 className="font-bold text-3xl text-white mb-6 text-center">
          Connections
        </h1>

        {/* Scrollable Wrapper */}
        <div className="h-[460px] overflow-y-auto space-y-4 pr-2 scrollbar-hide">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;

            return (
              <div
                key={_id}
                className="flex items-center p-4 rounded-lg bg-red-400 text-white shadow-lg"
              >
                <img
                  src={photoUrl || DEFAULT_USER_PIC}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-white object-cover"
                />
                <div className="text-left ml-4">
                  <h2 className="font-bold text-lg text-yellow-200 capitalize">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-white/90 text-sm">
                      {age}, {gender}
                    </p>
                  )}
                  <p className="text-white/80 text-sm">
                    {about || "No bio available."}
                  </p>
                </div>
                <Link to={"/chat/" + _id} className="ml-auto">
                  <button className="btn btn-primary">Message</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
