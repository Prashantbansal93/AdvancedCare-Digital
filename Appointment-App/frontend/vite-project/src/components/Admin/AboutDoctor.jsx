import React from "react";
import {
  HeartPulse,
  Phone,
  Mail,
  Award,
  Stethoscope,
  User,
  MapPin,
  Clock,
  Calendar,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router";

const AboutDoctor = () => {
  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url('/doctor.webp')",
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundColor: "#176fc7",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Doctor Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="md:flex">
            {/* Doctor Image */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
              <div className="relative group">
                <img
                  src="/doctor.jpeg"
                  alt="Dr. Dhara Singh"
                  className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl transform group-hover:scale-105 transition duration-300"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                  <span className="sr-only">Verified Professional</span>
                </div>
              </div>
            </div>

            {/* Doctor Details */}
            <div className="md:w-2/3 p-10">
              <div className="flex flex-col mb-4">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <User className="text-blue-600 h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Dr. Dhara Singh
                    </h1>
                    <p className="text-blue-600 font-medium">
                      Senior Consultant Cardiologist
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                    FACC
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                    FSCAI
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                    FHRS
                  </span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Board-certified cardiologist with over two decades of
                  experience in diagnosing and treating complex cardiac
                  conditions. Specializes in interventional cardiology with a
                  focus on minimally invasive procedures for optimal patient
                  outcomes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <Award className="text-blue-500 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium text-gray-800">20+ Years</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <Stethoscope className="text-blue-500 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Patients Treated</p>
                      <p className="font-medium text-gray-800">10,000+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications Section */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-10">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Award className="text-blue-600 h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Professional Qualifications
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-800 text-lg mb-4">
                  Medical Education
                </h3>
                <ul className="space-y-5">
                  {[
                    {
                      degree: "MBBS",
                      institution: "All India Institute of Medical Sciences",
                      year: "1998",
                    },
                    {
                      degree: "MD (Medicine)",
                      institution: "PGIMER Chandigarh",
                      year: "2002",
                    },
                    {
                      degree: "DM (Cardiology)",
                      institution: "AIIMS New Delhi",
                      year: "2006",
                    },
                  ].map((item, index) => (
                    <li key={index} className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800">
                          {item.degree}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.institution}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-800 text-lg mb-4">
                  Fellowships & Training
                </h3>
                <ul className="space-y-5">
                  {[
                    {
                      program: "Pediatric Cardiology",
                      institution: "Boston Children's Hospital",
                      year: "2008",
                    },
                    {
                      program: "Cardiac Electrophysiology",
                      institution: "Mayo Clinic",
                      year: "2010",
                    },
                    {
                      program: "Interventional Cardiology",
                      institution: "Cleveland Clinic",
                      year: "2012",
                    },
                  ].map((item, index) => (
                    <li key={index} className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800">
                          {item.program}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.institution}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-10">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Stethoscope className="text-blue-600 h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Clinical Expertise
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Adult & Pediatric Cardiology",
                "Cardiac Electrophysiology",
                "Echocardiography",

                "Heart Failure Management",
                "Interventional Procedures",
                "Coronary Angiography",
                "Pacemaker Implantation",
              ].map((expertise, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-start">
                    <HeartPulse className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {expertise}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100 backdrop-blur-sm bg-opacity-90">
          <div className="p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Contact Information
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Email Card */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center mb-4">
                  <Mail className="text-blue-600 mr-3" />
                  <h3 className="font-medium text-gray-800">Email</h3>
                </div>
                <a
                  href="mailto:dr.dhara.singh@clinic.com"
                  className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
                >
                  dr.dhara.singh@clinic.com
                </a>
              </div>

              {/* Phone Card */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center mb-4">
                  <Phone className="text-blue-600 mr-3" />
                  <h3 className="font-medium text-gray-800">Clinic Phone</h3>
                </div>
                <a
                  href="tel:+12345678"
                  className="text-blue-700 hover:text-blue-900 font-medium block mb-2 transition-colors"
                >
                  +1 (234) 567-8900
                </a>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Mon-Fri: 8:00 AM - 5:00 PM</span>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center mb-4">
                  <MapPin className="text-blue-600 mr-3" />
                  <h3 className="font-medium text-gray-800">Clinic Address</h3>
                </div>
                <address className="not-italic text-gray-700 font-medium">
                  HeartCare Speciality Clinic
                  <br />
                  123 Medical Tower, Health District
                  <br />
                  Gwalior, India 474001
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-blue-100 p-6 rounded-lg border border-blue-200">
          <h3 className="font-medium mb-4 flex items-center text-gray-800">
            <Calendar className="mr-2 text-blue-600" />
            Appointment Information
          </h3>
          <p className="text-gray-700 mb-2">
            New patient appointments typically scheduled within 3-5 business
            days
          </p>
          <Link to="/user/book-appointment">
            <button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
              Request Appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutDoctor;
