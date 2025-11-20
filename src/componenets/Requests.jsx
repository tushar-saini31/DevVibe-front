import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/RequestSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa"; // 👈 Using React Icons
import Shimmer from "./Shimmer";

const Requests = () => {
  const request = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/user/request/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <Shimmer />;

  if (!request) return null;

  // ✅ Empty state UI
  if (request.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 text-center px-4">
        {/* 👇 Beautiful icon */}
        <FaUsers className="text-white text-7xl mb-6 drop-shadow-lg" />

        <h1 className="text-4xl font-bold text-white mb-4">No Requests Found</h1>
        <p className="text-white/90 text-lg mb-6 max-w-md">
          Looks like you don’t have any connection requests yet.  
          Explore amazing people and start connecting!
        </p>

        {/* 👇 Explore More Button */}
        <button
          onClick={() => navigate("/feed")}
          className="bg-white text-orange-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-orange-100 transition-all duration-300"
        >
          Explore More
        </button>
      </div>
    );

  // ✅ If requests exist
  return (
    <div className="min-h-screen ">
      <div className="text-center mb-8">
        <h1 className="font-bold text-3xl text-white mt-20">Users Requests</h1>
      </div>

      <div className="h-[550px] overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        {request.map((req) => {
          const { _id, firstName, lastName, age, gender, about } = req.fromUserId;

          return (
            <div
              key={_id}
              className="flex m-4 p-4 justify-between items-center rounded-xl bg-white/20 backdrop-blur-md lg:w-2/5 mx-auto 
                         shadow-[0_0_20px_rgba(255,100,0,0.4)] border border-orange-300 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-left mx-4 flex-grow">
                <h2 className="font-bold text-xl text-white capitalize">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-white/90">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-white/90">{about || "No bio available."}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  className="bg-green-500 hover:bg-green-400 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
                  onClick={() => reviewRequest("accepted", req._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
                  onClick={() => reviewRequest("rejected", req._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
