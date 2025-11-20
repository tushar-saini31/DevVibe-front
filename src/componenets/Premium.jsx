import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import goldMember from "../assets/gold_member.png";
import silverMember from "../assets/silver_member.png";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const { data } = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: function (response) {
          verifyPremiumUser();
        },
        modal: {
          ondismiss: function () {
            alert("Payment cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating order");
    }
  };

  return isUserPremium ? (
    <div className="text-center text-3xl font-bold m-20 text-green-500 ">
      You're already a Premium User 🎉
    </div>
  ) : (
    <div className="flex flex-col min-h-screen w-full  bg-amber-100">
     <div className="flex justify-center p-5 mt-15">
        <h1 className="text-gray-500 font-medium text-7xl">Premium </h1>
    </div>

      <div className="flex flex-row items-center  justify-center space-x-10 z-20 ">
        {/* Golden Membership */}
        <div className="card bg-amber-200 w-80 h-[500px] shadow-sm p-6">
          <figure className="px-10 pt-10">
            <img src={goldMember} alt="golden" className="rounded-xl" />
          </figure>
          <div className="card-body text-center text-black">
            <h2 className="text-xl font-bold">Golden Member</h2>
            <ul className="space-y-2">
              <li>- Chat with other people</li>
              <li>- 100 connection requests per day</li>
              <li>- Blue Tick</li>
              <li>- 3 Months</li>
            </ul>
            <button
              onClick={() => handleBuyClick("gold")}
              className="btn btn-primary mt-4"
            >
              Buy Now
            </button>
          </div>
        </div>
  
        {/* Silver Membership */}
        <div className="card bg-gray-200 w-80 h-[500px] shadow-sm p-6">
          <figure className="px-10 pt-10">
             <img src={silverMember} alt="silver" className="rounded-xl" />
          </figure>
          <div className="card-body text-center text-black">
            <h2 className="text-xl font-bold">Silver Member</h2>
            <ul className="space-y-2">
              <li>- Chat with other people</li>
              <li>- 50 connection requests per day</li>
              <li>- Black Tick</li>
              <li>- 1 Month</li>
            </ul>
            <button
              onClick={() => handleBuyClick("silver")}
              className="btn btn-secondary mt-4"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Premium;
