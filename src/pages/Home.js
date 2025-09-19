import React from "react";

const HomePage = () => {
  return (
    <div className="bg-white text-black w-full">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white text-black">
        {/* Left Side: Text + Button */}
        <div className="md:w-1/2 text-center md:text-left space-y-5 order-2 md:order-1">
          {/* Brand Block */}
          <div className="mb-4">
            <h3 className="text-xl font-bold">
              <span className="text-blue-500">COURIER</span>{" "}
              <span className="text-red-500">WORLD</span>
            </h3>
            <p className="tracking-wide text-gray-500 uppercase" style={{ fontSize: '10px' }}>
              International and Domestic Services
            </p>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold">Premium delivery made easy</h1>
          <p className="text-gray-700 text-sm">
            Experience the best courier service in Telangana & Andhra Pradesh, with international delivery options for USA, UK, Canada, and more.
          </p>
          <button className="mt-4 px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800">
            <a href="tel:9959971831">Get Started</a>
          </button>

          {/* Box Image on Mobile */}
          <div className="mt-10 md:hidden flex justify-center">
            <img src="/courier-box.png" alt="Box" className="w-60" />
          </div>
        </div>

        {/* Right Side: Box image for Desktop */}
        <div className="md:w-1/2 mb-10 md:mb-0 hidden md:flex justify-center order-1 md:order-2">
          <img src="/courier-box.png" alt="Box" className="w-80" />
        </div>
      </section>

      {/* Countries Section */}
      <section className="bg-gray-100 text-center py-10 px-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase">We are couriering to countries like</h2>
        <h1 className="text-2xl md:text-3xl font-bold mt-2">
          USA UK AUSTRALIA CANADA GERMANY &amp; GULF COUNTRIES
        </h1>
      </section>

      {/* Documents Section */}
      <section className="bg-gray-50 py-12 px-6 md:px-20">
        <h2 className="text-center text-lg font-semibold mb-8">DOCUMENTS REQUIRED</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
          {/* International Parcel */}
          <div className="bg-white rounded-xl p-6 shadow space-y-3">
            <h3 className="font-bold text-lg">INTERNATIONAL PARCEL</h3>
            <p className="font-semibold">Receivers details</p>
            <p className="text-sm text-gray-600">Full name</p>
            <p className="text-sm text-gray-600">H.No./ Flat No. / Apt No.</p>
            <p className="text-sm text-gray-600">Street</p>
            <p className="text-sm text-gray-600">City</p>
            <p className="text-sm text-gray-600">State - Zip Code</p>
            <p className="text-sm text-gray-600">Country</p>
            <p className="text-sm text-gray-600">International Contact No</p>
            <p className="font-semibold">Senders details</p>
            <p className="text-sm text-gray-600">Senders Aadhar Xerox</p>
            <p className="text-sm text-gray-600">Senders Phone No.</p>
          </div>

          {/* International Medicines */}
          <div className="bg-white rounded-xl p-6 shadow space-y-3">
            <h3 className="font-bold text-lg">INTERNATIONAL MEDICINES</h3>
            <p className="font-semibold">Medicines</p>
            <p className="text-sm text-gray-600">Original Prescription</p>
            <p className="text-sm text-gray-600">Original Bill</p>
            <p className="font-semibold">Receivers details</p>
            <p className="text-sm text-gray-600">Receivers Passport Xerox</p>
            <p className="text-sm text-gray-600">Receivers Visa Xerox</p>
            <p className="text-sm text-gray-600">Receivers Full Address</p>
            <p className="font-semibold">Senders details</p>
            <p className="text-sm text-gray-600">Senders Aadhar Xerox</p>
            <p className="text-sm text-gray-600">Senders Phone No.</p>
          </div>

          {/* Domestic Parcel */}
          <div className="bg-white rounded-xl p-6 shadow space-y-3">
            <h3 className="font-bold text-lg">DOMESTIC PARCEL</h3>
            <p className="font-semibold">Receivers details</p>
            <p className="text-sm text-gray-600">Full name</p>
            <p className="text-sm text-gray-600">H.No./ Flat No. / Apt No.</p>
            <p className="text-sm text-gray-600">Street</p>
            <p className="text-sm text-gray-600">City</p>
            <p className="text-sm text-gray-600">State - Pin Code</p>
            <p className="text-sm text-gray-600">Contact No</p>
            <p className="font-semibold">Senders details</p>
            <p className="text-sm text-gray-600">Senders Aadhar Xerox</p>
            <p className="text-sm text-gray-600">Senders Phone No.</p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white text-black">
        {/* Left Text */}
        <div className="md:w-1/2 text-center md:text-left space-y-3">
          <h2 className="text-2xl md:text-2xl font-bold">We the Courier World Provides</h2>
          <p className="text-gray-700 text-sm">
            Courier World offers reliable international and domestic courier services. </p>
            <p className="text-gray-700 text-sm">
            Our services include medicine delivery, document shipping, food parcels, and ecommerce logistics.  </p>
            <p className="text-gray-700 text-sm">
            We ensure timely pickups and secure delivery with real-time tracking support. </p>
            <p className="text-gray-700 text-sm">
            Trusted by thousands, Courier World is committed to speed, safety, and affordability. </p>
            <p className="text-gray-700 text-sm">
            Whether it’s personal or business shipping, we deliver your trust with every parcel. </p>

         </div>

        {/* Right YouTube Video */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/22Ys5xOWmGY"
              title="Courier World Promo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
