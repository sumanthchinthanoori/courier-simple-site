import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrackingHome = () => {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return alert("Please enter a tracking number");
    navigate(`/tracking/details?id=${trackingId}`);

  };

  const handlePickup = () => {
    const phone = "919959971831";
    const message = encodeURIComponent("Hi, I want to request a pickup.");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-2 sm:px-4 py-6 sm:py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col-reverse md:flex-row">
        
        {/* Left Side - Text/Form */}
        <div className="flex-1 px-6 sm:px-10 py-8 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 text-center sm:text-left">
            COURIER WORLD
          </h1>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
            Track Your Order Easily!
          </h2>

          <form
            onSubmit={handleTrack}
            className="flex flex-col sm:flex-row items-stretch gap-4 mb-4"
          >
            <label htmlFor="tracking-input" className="sr-only">Tracking Number</label>
            <input
              id="tracking-input"
              type="text"
              placeholder="Enter Tracking Number"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          <button
            onClick={handlePickup}
            className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-600 transition mb-4"
          >
            Request Pickup via WhatsApp
          </button>

          <p className="text-sm text-gray-600 text-center sm:text-left">
            Contact us: <span className="font-bold">9959971831</span>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 bg-blue-100 flex items-center justify-center p-0 overflow-hidden">
  {/* Desktop Image (shown on md and up) */}
  <img
    src="/desktop-illustration.png"
    alt="Courier Desktop"
    className="hidden md:block w-full h-full object-cover"
  />

  {/* Mobile Image (shown below md) */}
  <img
    src="/mobile-illustration.png"
    alt="Courier Mobile"
    className="block md:hidden w-full h-full object-cover"
  />
</div>


      </div>
    </div>
  );
};

export default TrackingHome;
