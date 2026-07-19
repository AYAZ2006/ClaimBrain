import React, { useMemo, useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import {
  Search,
  Car,
  House,
  HeartPulse,
  CheckCircle2,
  Clock3,
  XCircle,
  FileText,
} from "lucide-react";

function History() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const claims = [
    {
      id: "CLM-1001",
      type: "Car",
      title: "Honda City",
      subtitle: "TS09AB1234",
      status: "Approved",
      amount: "₹42,500",
      date: "12 Jul 2026",
      description: "Front bumper and headlight damage",
    },
    {
      id: "CLM-1002",
      type: "Health",
      title: "Apollo Hospitals",
      subtitle: "Cashless Treatment",
      status: "Pending",
      amount: "₹18,000",
      date: "10 Jul 2026",
      description: "Knee surgery reimbursement",
    },
    {
      id: "CLM-1003",
      type: "Home",
      title: "Hyderabad Residence",
      subtitle: "Water Damage",
      status: "Rejected",
      amount: "₹85,000",
      date: "05 Jul 2026",
      description: "Inspection report incomplete",
    },
    {
      id: "CLM-1004",
      type: "Car",
      title: "Hyundai Creta",
      subtitle: "TS10CD4567",
      status: "Pending",
      amount: "₹31,000",
      date: "03 Jul 2026",
      description: "Rear bumper replacement",
    },
    {
      id: "CLM-1005",
      type: "Health",
      title: "Yashoda Hospitals",
      subtitle: "Medical Claim",
      status: "Approved",
      amount: "₹72,000",
      date: "29 Jun 2026",
      description: "Cardiac treatment",
    },
    {
      id: "CLM-1006",
      type: "Home",
      title: "Villa Insurance",
      subtitle: "Fire Damage",
      status: "Approved",
      amount: "₹2,40,000",
      date: "22 Jun 2026",
      description: "Kitchen restoration",
    },
  ];

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesType =
        typeFilter === "All" || claim.type === typeFilter;

      const matchesSearch =
        claim.id.toLowerCase().includes(search.toLowerCase()) ||
        claim.title.toLowerCase().includes(search.toLowerCase()) ||
        claim.subtitle.toLowerCase().includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [search, typeFilter]);

  const stats = {
    total: claims.length,
    approved: claims.filter((c) => c.status === "Approved").length,
    pending: claims.filter((c) => c.status === "Pending").length,
    rejected: claims.filter((c) => c.status === "Rejected").length,
  };

  const insuranceIcon = (type) => {
    switch (type) {
      case "Car":
        return <Car className="w-5 h-5 text-blue-500" />;
      case "Health":
        return <HeartPulse className="w-5 h-5 text-green-500" />;
      case "Home":
        return <House className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 size={14} />
            Approved
          </span>
        );

      case "Pending":
        return (
          <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Clock3 size={14} />
            Pending
          </span>
        );

      default:
        return (
          <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
            <XCircle size={14} />
            Rejected
          </span>
        );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900">
              Claim <span className="text-pink-500">History</span>
            </h1>

            <p className="mt-4 text-gray-500 text-lg">
              View and track all your insurance claims in one place.
            </p>
          </motion.div>
                    {/* Search & Filters */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">

              {/* Search */}

              <div className="relative w-full lg:w-[420px]">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search by Claim ID, Vehicle, Hospital..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-gray-200 bg-white pl-12 pr-5 py-3 outline-none shadow-sm focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Filter Buttons */}

              <div className="flex flex-wrap justify-center gap-3">

                {["All", "Car", "Health", "Home"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`rounded-full px-5 py-2 font-medium transition ${
                      typeFilter === type
                        ? "bg-pink-500 text-white shadow-lg"
                        : "bg-white border border-gray-200 hover:border-pink-500 hover:text-pink-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}

              </div>

            </div>
          </motion.div>

          {/* Statistics */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
          >

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6"
            >
              <p className="text-gray-500 text-sm">Total Claims</p>
              <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-green-50 rounded-3xl border border-green-200 shadow-sm p-6"
            >
              <p className="text-green-700 text-sm">Approved</p>
              <h2 className="text-4xl font-bold mt-2 text-green-700">
                {stats.approved}
              </h2>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-yellow-50 rounded-3xl border border-yellow-200 shadow-sm p-6"
            >
              <p className="text-yellow-700 text-sm">Pending</p>
              <h2 className="text-4xl font-bold mt-2 text-yellow-700">
                {stats.pending}
              </h2>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-red-50 rounded-3xl border border-red-200 shadow-sm p-6"
            >
              <p className="text-red-700 text-sm">Rejected</p>
              <h2 className="text-4xl font-bold mt-2 text-red-700">
                {stats.rejected}
              </h2>
            </motion.div>

          </motion.div>
                    {/* Claim Cards */}

          <div className="mt-12 space-y-6">
            {filteredClaims.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm py-20 text-center"
              >
                <FileText className="mx-auto w-16 h-16 text-gray-300" />

                <h2 className="mt-6 text-2xl font-bold text-gray-800">
                  No Claims Found
                </h2>

                <p className="mt-2 text-gray-500">
                  Try searching with another claim ID or insurance type.
                </p>
              </motion.div>
            ) : (
              filteredClaims.map((claim, index) => (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                  }}
                  className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-7"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                    {/* Left */}

                    <div className="flex gap-5">

                      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                        {insuranceIcon(claim.type)}
                      </div>

                      <div>

                        <div className="flex items-center gap-3 flex-wrap">

                          <h2 className="text-2xl font-bold text-gray-900">
                            {claim.title}
                          </h2>

                          {statusBadge(claim.status)}

                        </div>

                        <p className="text-pink-500 font-medium mt-1">
                          {claim.type} Insurance
                        </p>

                        <p className="text-gray-500 mt-3">
                          {claim.description}
                        </p>

                      </div>

                    </div>

                    {/* Right */}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                      <div>
                        <p className="text-gray-400 text-sm">
                          Claim ID
                        </p>

                        <h3 className="font-semibold mt-1">
                          {claim.id}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm">

                          {claim.type === "Car"
                            ? "Vehicle"
                            : claim.type === "Health"
                            ? "Hospital"
                            : "Property"}

                        </p>

                        <h3 className="font-semibold mt-1">
                          {claim.subtitle}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm">
                          Amount
                        </p>

                        <h3 className="font-semibold mt-1">
                          {claim.amount}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm">
                          Submitted
                        </p>

                        <h3 className="font-semibold mt-1">
                          {claim.date}
                        </h3>
                      </div>

                    </div>

                  </div>

                  {/* Bottom Buttons */}

                  <div className="mt-8 flex flex-wrap gap-4">

                    <button className="rounded-full bg-pink-500 text-white px-6 py-3 font-medium hover:bg-pink-600 transition">
                      View Details
                    </button>

                    {claim.status === "Pending" && (
                      <button className="rounded-full border border-pink-500 text-pink-500 px-6 py-3 font-medium hover:bg-pink-50 transition">
                        Track Claim
                      </button>
                    )}

                  </div>

                </motion.div>
              ))
            )}
          </div>
                  </div>
      </div>
    </>
  );
}

export default History;