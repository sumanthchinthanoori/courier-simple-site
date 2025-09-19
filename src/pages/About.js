import React from "react";
import {
  FaYoutube,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-black px-4 py-10 flex flex-col items-center">
      <div className="max-w-4xl w-full">
      

        {/* CTA Section */}
        <div className="mt-3 bg-blue-600 text-white text-center py-10 px-4 rounded-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Try Courier World Now</h2>
          <p className="text-md sm:text-lg mb-4">Book your first parcel and experience fast, reliable delivery.</p>
           <p className="text-md sm:text-lg mb-4">Deliveries across 200+ countries.</p>
          <a href="tel:9959971831">
  <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition">
    Book Now
  </button>
</a>

        </div>

        {/* Highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-blue-50 p-6 rounded-2xl shadow-sm">
          <div className="text-center">
            <img src="/secure.png" alt="Secure" className="mx-auto w-20 h-20 mb-2" />
            <h3 className="text-lg font-semibold text-blue-700">Secure Handling</h3>
            <p className="text-gray-600">Your parcels are safe with us, from pickup to delivery.</p>
          </div>
          <div className="text-center">
            <img src="/tracking.png" alt="Tracking" className="mx-auto w-20 h-20 mb-2" />
            <h3 className="text-lg font-semibold text-blue-700">Real-time Tracking</h3>
            <p className="text-gray-600">Track your shipment every step of the way, live.</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Connect with us</h3>
          <div className="flex justify-center gap-6 text-2xl">
  <a href="https://www.youtube.com/@COURIERWORLD" target="_blank" rel="noopener noreferrer">
    <FaYoutube className="text-red-500 hover:scale-110 transition" />
  </a>
  <a href="https://wa.me/919959971831" target="_blank" rel="noopener noreferrer">
    <FaWhatsapp className="text-green-500 hover:scale-110 transition" />
  </a>
  <a href="https://www.facebook.com/courierworld.9170" target="_blank" rel="noopener noreferrer">
    <FaFacebook className="text-blue-600 hover:scale-110 transition" />
  </a>
  <a href="https://www.instagram.com/courierworld_917/" target="_blank" rel="noopener noreferrer">
    <FaInstagram className="text-pink-500 hover:scale-110 transition" />
  </a>
  <a href="https://x.com/courierworld917" target="_blank" rel="noopener noreferrer">
    <FaXTwitter className="text-gray-700 hover:scale-110 transition" />
  </a>
</div>

        </div>

        {/* FAQs */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">FAQs</h3>
          <div className="max-w-2xl mx-auto space-y-4">
            <details className="group border border-gray-200 rounded-xl p-5 shadow-sm open:shadow-md transition-all duration-200">
              <summary className="cursor-pointer text-blue-700 font-medium group-open:text-blue-800">
                How much does shipping cost?
              </summary>
              <p className="text-gray-600 mt-2">Shipping costs vary based on destination and parcel weight. Contact us for a quote.</p>
            </details>
            <details className="group border border-gray-200 rounded-xl p-5 shadow-sm open:shadow-md transition-all duration-200">
              <summary className="cursor-pointer text-blue-700 font-medium group-open:text-blue-800">
                What items can I ship?
              </summary>
              <p className="text-gray-600 mt-2">You can ship food, documents, electronics, clothing, and more. Restricted items list applies.</p>
            </details>
            <details className="group border border-gray-200 rounded-xl p-5 shadow-sm open:shadow-md transition-all duration-200">
              <summary className="cursor-pointer text-blue-700 font-medium group-open:text-blue-800">
                Do you offer pickup service?
              </summary>
              <p className="text-gray-600 mt-2">Yes! We offer doorstep pickup via WhatsApp booking or phone call.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
