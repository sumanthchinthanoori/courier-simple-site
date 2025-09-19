import React, { useState, useEffect } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { database } from "../firebase";
import { Pencil, X, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Default tracking steps
const defaultSteps = [
  { label: "Parcel Booked", description: "Booking confirmed." },
  { label: "Picked Up", description: "Picked up by agent." },
  { label: "To Hyderabad", description: "En route to Hyderabad hub." },
  { label: "To USA", description: "En route to USA." },
  { label: "In USA", description: "Arrived in USA." },
  { label: "Delivered", description: "Delivered to recipient." }
];

// Initial form state
const initialForm = {
  trackingId: "",
  title: "",
  from: "",
  to: "",
  customer: "",
  weight: "",
  invoice: "",
  fromNumber: "",
  toNumber: "",
  serviceTrackingId: "",
  currentStep: 0,
  steps: defaultSteps
};

const getTrackingURL = (trackingNumber) => {
  if (!trackingNumber || typeof trackingNumber !== "string") return null;
  if (trackingNumber.startsWith("1Z")) return `https://www.ups.com/track?loc=en_IN&tracknum=${trackingNumber}`;
  if (trackingNumber.startsWith("922")) return `https://atlanticcourier.net/track/${trackingNumber}`;
  if (trackingNumber.startsWith("241951")) return `https://www.shreemaruti.com/track-shipment?trackingNumber=${trackingNumber}`;
  if (trackingNumber.startsWith("HNK") || trackingNumber.startsWith("PRO")) return `https://www.tpcindia.com/track-shipment`;
  return `https://www.fedex.com/fedextrack/?cntry_code=in&tracknumbers=${trackingNumber}`;
};

const AdminPanel = () => {
  const [form, setForm] = useState(initialForm);
  const [entries, setEntries] = useState({});
  const [search, setSearch] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterInvoice, setFilterInvoice] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showDelivered, setShowDelivered] = useState(false);

  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const ADMIN_PASSWORD = "courierworld917"; // ✅ Change this to your actual admin password



  useEffect(() => {
    return onValue(ref(database), (snapshot) => {
      setEntries(snapshot.val() || {});
    });
  }, []);

  const handleChange = (e, idx = null) => {
    const { name, value } = e.target;
    if (idx !== null) {
      const updatedSteps = [...form.steps];
      updatedSteps[idx][name] = value;
      setForm({ ...form, steps: updatedSteps });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      date: new Date().toISOString().split("T")[0]
    };
    try {
      await set(ref(database, form.trackingId), payload);
      alert("Saved");
      setForm(initialForm);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleEdit = (id) => setForm({ ...entries[id], trackingId: id });
  const handleDelete = (id) => window.confirm("Delete this entry?") && remove(ref(database, id));
  const handleResetFilters = () => {
    setSearch("");
    setFilterTo("");
    setFilterCustomer("");
    setFilterInvoice("");
    setFilterDate("");
    setShowDelivered(false);
  };

  const sortedEntries = Object.entries(entries).sort((a, b) => {
  const valA = (a[1][sortBy] || "").toString().toLowerCase();
  const valB = (b[1][sortBy] || "").toString().toLowerCase();
  if (sortOrder === "asc") return valA > valB ? 1 : -1;
  return valA < valB ? 1 : -1;
});

const filteredEntries = sortedEntries.filter(([id, e]) => {
  const matchesSearch = id.toLowerCase().includes(search.toLowerCase());
  const matchesTo = filterTo ? e.to?.toLowerCase().includes(filterTo.toLowerCase()) : true;
  const matchesCustomer = filterCustomer ? e.customer?.toLowerCase().includes(filterCustomer.toLowerCase()) : true;
  const matchesInvoice = filterInvoice ? e.invoice?.toLowerCase().includes(filterInvoice.toLowerCase()) : true;
  const matchesDate = filterDate ? e.date?.startsWith(filterDate) : true;
  const isDelivered = showDelivered ? e.currentStep === (e.steps?.length || 1) - 1 : true;
  return matchesSearch && matchesTo && matchesCustomer && matchesInvoice && matchesDate && isDelivered;
});


  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const tableData = filteredEntries.map(([id, e]) => [
      e.invoice, e.customer, e.fromNumber, e.toNumber, e.to, e.serviceTrackingId, id
    ]);
    autoTable(doc, {
      head: [["Invoice", "Customer", "From#", "To#", "To", "Service ID", "CW ID"]],
      body: tableData
    });
    doc.save("tracking-data.pdf");
  };

  const exportExcel = () => {
    const data = filteredEntries.map(([id, e]) => ({
      Invoice: e.invoice,
      Customer: e.customer,
      FromNumber: e.fromNumber,
      ToNumber: e.toNumber,
      To: e.to,
      ServiceTrackingId: e.serviceTrackingId,
      CW_TrackingId: id
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tracking");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "tracking-data.xlsx");
  };

      if (!isAuthenticated) {
  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect Password");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-blue-50 border border-blue-200 p-6 rounded shadow-md max-w-sm w-full"
      >
        <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">Admin Login</h2>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full p-2 mb-4 border border-blue-200 rounded bg-white"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}



  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-6 flex-wrap">
          <h1 className="text-2xl font-bold text-blue-700">Admin Panel</h1>
          <div className="text-right">
            <h3 className="text-xl font-bold">
              <span className="text-blue-500">COURIER</span>{" "}
              <span className="text-red-500">WORLD</span>
            </h3>
            <p className="tracking-wide text-gray-500 uppercase text-[10px] leading-tight">
              International and Domestic Services
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white shadow-md rounded p-6 border border-blue-100">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["trackingId", "Tracking ID"],
              ["title", "Title"],
              ["from", "From"],
              ["to", "To"],
              ["customer", "Customer"],
              ["weight", "Weight"],
              ["invoice", "Invoice"],
              ["fromNumber", "From Number"],
              ["toNumber", "To Number"],
              ["serviceTrackingId", "Service Tracking ID"]
            ].map(([name, placeholder]) => (
              <input
                key={name}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                className="bg-blue-50 p-2 rounded border border-blue-200"
                required={["trackingId", "title", "from", "to"].includes(name)}
              />
            ))}
            <input
              name="currentStep"
              type="number"
              placeholder="Current Step"
              value={form.currentStep}
              onChange={handleChange}
              className="bg-blue-50 p-2 rounded border border-blue-200"
            />
          </form>
        </div>

        {/* STEPS */}
        <div className="bg-white shadow-md rounded p-6 mt-6 border border-blue-100">
          <h2 className="font-semibold mb-2 text-blue-700">Steps</h2>
          {form.steps.map((step, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 mb-2">
              <input
                name="label"
                placeholder="Label"
                value={step.label}
                onChange={(e) => handleChange(e, i)}
                className="bg-blue-50 p-2 rounded border border-blue-200"
              />
              <input
                name="description"
                placeholder="Description"
                value={step.description}
                onChange={(e) => handleChange(e, i)}
                className="bg-blue-50 p-2 rounded border border-blue-200"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setForm({ ...form, steps: [...form.steps, { label: "", description: "" }] })}
            className="mt-2 text-blue-600 underline"
          >
            + Add Step
          </button>
          <button type="submit" onClick={handleSubmit} className="mt-4 ml-4 bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>

        {/* FILTERS + SORT */}
<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <input
    type="text"
    placeholder="Search by Tracking ID"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="p-2 border border-blue-200 rounded bg-blue-50"
  />
  <input
    type="text"
    placeholder="Search by Invoice"
    value={filterInvoice}
    onChange={(e) => setFilterInvoice(e.target.value)}
    className="p-2 border border-blue-200 rounded bg-blue-50"
  />
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="p-2 border border-blue-200 rounded bg-blue-50"
  >
    <option value="date">Sort By Date</option>
    <option value="invoice">Sort By Invoice</option>
    <option value="customer">Sort By Customer</option>
    <option value="to">Sort By Destination</option>
  </select>
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="p-2 border border-blue-200 rounded bg-blue-50"
  >
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
</div>


        

        {/* TOOLS */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <button onClick={exportPDF} className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-1">
              <FileDown size={16} /> PDF
            </button>
            <button onClick={exportExcel} className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-1">
              <FileDown size={16} /> Excel
            </button>
          </div>
          <button onClick={handleResetFilters} className="bg-gray-300 text-black px-4 py-2 rounded">
            Reset Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full text-sm border bg-white text-black">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                {["Invoice", "Customer", "From#", "To#", "To", "Service ID", "CW ID", "Progress", "Actions"].map((col, i) => (
                  <th key={i} className="px-2 py-1 border text-center">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map(([id, entry]) => (
                <tr key={id} className="border-t border-blue-200">
                  <td className="px-2 py-1 border text-center">{entry.invoice}</td>
                  <td className="px-2 py-1 border text-center">{entry.customer}</td>
                  <td className="px-2 py-1 border text-center">{entry.fromNumber}</td>
                  <td className="px-2 py-1 border text-center">{entry.toNumber}</td>
                  <td className="px-2 py-1 border text-center">{entry.to}</td>
                  <td className="px-2 py-1 border text-center">
                    <a href={getTrackingURL(entry.serviceTrackingId)} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {entry.serviceTrackingId}
                    </a>
                  </td>
                  <td className="px-2 py-1 border text-center">{id}</td>
                  <td className="px-2 py-1 border text-center">
                    <div className="relative w-full h-2 bg-blue-200 rounded overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (entry.currentStep / Math.max((entry.steps?.length || 1) - 1, 1)) * 100)}%`
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-2 py-1 border text-center space-x-1">
                    <button onClick={() => handleEdit(id)} className="text-blue-600"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(id)} className="text-red-600"><X size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
