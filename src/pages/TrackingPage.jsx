  import React, { useEffect, useState } from "react";
  import { useSearchParams } from "react-router-dom";
  import { initializeApp } from "firebase/app";
  import { getDatabase, ref, get } from "firebase/database";
  import { CheckCircle2 } from "lucide-react";

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDZ0aV1WyiYEYY8OU7YlIAL6T1GxFgYLZg",
    authDomain: "courier-tracking-f48b1.firebaseapp.com",
    databaseURL: "https://courier-tracking-f48b1-default-rtdb.firebaseio.com",
    projectId: "courier-tracking-f48b1",
    storageBucket: "courier-tracking-f48b1.appspot.com",
    messagingSenderId: "525250641077",
    appId: "1:525250641077:web:39c04ae879a4a36cfd52fc",
    measurementId: "G-MS0GB18GQ9"
  };

  // Firebase init
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const TrackingPage = () => {
    const [params] = useSearchParams();
    const trackingId = params.get("id");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const snapshot = await get(ref(db, trackingId));
          if (snapshot.exists()) {
            setData(snapshot.val());
          } else {
            setData({ error: "Tracking ID not found." });
          }
        } catch (err) {
          setData({ error: "Failed to fetch data." });
        } finally {
          setLoading(false);
        }
      };

      if (trackingId) {
        fetchData();
      }
    }, [trackingId]);

    if (loading) {
      return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (!data || data.error) {
      return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <p className="text-red-600 text-lg font-medium">
            {data?.error || "Something went wrong."}
          </p>
        </div>
      );
    }

    return (
      <main className="min-h-screen bg-gray-100 p-4 flex justify-center items-start">
        <section className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 border mt-10">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
            Tracking Details
          </h2>

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">{data.title || "Delivery Box"}</h3>
            <p className="text-sm text-gray-500 break-all">#Tracking ID: {trackingId}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border text-sm mb-6">
            <div><span className="text-gray-500">From:</span> <strong>{data.from}</strong></div>
            <div><span className="text-gray-500">To:</span> <strong>{data.to}</strong></div>
            <div><span className="text-gray-500">Customer:</span> <strong>{data.customer}</strong></div>
            <div><span className="text-gray-500">Weight:</span> <strong>{data.weight}</strong></div>
          </div>

          {/* Timeline Stepper */}
          <div className="space-y-6 relative">
            {Array.isArray(data.steps) && data.steps.map((step, index) => {
              const isCompleted = index <= data.currentStep;

              return (
                <div key={index} className="flex items-start relative">
                  {/* Vertical Line */}
                  {index !== data.steps.length - 1 && (
                    <span className="absolute left-3 top-6 w-0.5 h-full bg-gray-300 z-0"></span>
                  )}

                  <div className="relative z-10">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${isCompleted ? 'bg-green-500' : 'bg-blue-400'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{step.label}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    );
  };

  export default TrackingPage;
