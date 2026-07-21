import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaStethoscope,
  FaCalendarCheck,
  FaUserMd,
  FaChartLine,
  FaClinicMedical,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaUsers,
  FaAmbulance,
  FaUserInjured,
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const googleMapsAddress =
    "https://www.google.com/maps/place/Dr.+Dhara+Singh+Cardiologist+Gwalior/@26.2074677,78.1875243,17z/data=!3m1!4b1!4m6!3m5!1s0x3976c58532a04d8f:0x85bf1eea1722efa2!8m2!3d26.2074677!4d78.1900992!16s%2Fg%2F11q_7s_k5g?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D";

  const features = [
    {
      icon: <FaUserMd className="text-red-600 text-3xl" />,
      title: "Expert Cardiologist",
      description:
        "Board-certified specialist with extensive experience in cardiac care.",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-3xl" />,
      title: "Services",
      description:
        "State-of-the-art testing for accurate heart health assessment.",
      path: "/services", // Only this card will be clickable
    },
    {
      icon: <FaChartLine className="text-green-600 text-3xl" />,
      title: "Preventive Care",
      description:
        "Personalized plans to maintain and improve cardiovascular health.",
    },
    {
      icon: <FaClinicMedical className="text-purple-600 text-3xl" />,
      title: "Rehabilitation",
      description: "Structured programs for recovery after cardiac events.",
    },
    {
      icon: <FaCalendarCheck className="text-yellow-600 text-3xl" />,
      title: "Easy Scheduling",
      description: "Convenient online appointment booking system.",
      contact: true,
    },
    {
      icon: <FaHeartbeat className="text-red-500 text-3xl" />,
      title: "Chronic Care",
      description: "Management plans for ongoing cardiac conditions.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="relative py-24 px-4 sm:px-6 lg:px-8 text-center bg-blue-900 text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 41, 107, 0.7), rgba(0, 41, 107, 0.7)), url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
              <FaHeartbeat className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome To Advanced{" "}
            <span className="text-red-300">Cardiac Care</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Comprehensive heart health services with personalized treatment
            plans from leading cardiologists.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-red-600 text-white cursor-pointer font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Register Now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-white/10 cursor-pointer border-2 border-white text-white font-medium rounded-lg hover:bg-white/20 transition duration-300"
            >
              Patient Login
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Delivering exceptional cardiac care through innovative treatments
              and compassionate service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const cardContent = (
                <>
                  {feature.contact && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                      <a
                        href="tel:+919893210862"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:underline"
                      >
                        CALL NOW
                      </a>
                    </div>
                  )}
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {feature.description}
                  </p>
                  {feature.contact && (
                    <div className="text-center mt-4">
                      <a
                        href="tel:+919893210862"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaPhoneAlt className="mr-2" /> +91-9893210862
                      </a>
                    </div>
                  )}
                </>
              );

              return feature.path ? (
                <Link
                  to={feature.path}
                  key={index}
                  className="relative bg-white p-6 rounded-lg shadow hover:shadow-lg transition hover:ring-2 hover:ring-blue-400 block h-full"
                >
                  {cardContent}
                </Link>
              ) : (
                <div
                  key={index}
                  className="relative bg-white p-6 rounded-lg shadow hover:shadow-lg transition h-full"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center">
                <FaHeart className="mr-2" /> 95%
              </div>
              <div className="text-gray-600">Patient Satisfaction</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center">
                <FaUsers className="mr-2" /> 25+
              </div>
              <div className="text-gray-600">Specialists</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center">
                <FaUserInjured className="mr-2" /> 10K+
              </div>
              <div className="text-gray-600">Patients Treated</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center">
                <FaAmbulance className="mr-2" /> 24/7
              </div>
              <div className="text-gray-600">Emergency Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div
          className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 41, 107, 0.9), rgba(0, 41, 107, 0.9)), url('https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Heart Health?
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Our team of cardiac specialists is here to provide the care and
            support you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-white cursor-pointer text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            >
              Get Started Today
            </button>
            <a
              href="tel:+919893210862"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300 flex items-center justify-center"
            >
              <FaPhoneAlt className="mr-2" /> Call for Appointments
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <a href="tel:+919893210862" className="hover:text-gray-300">
                  +91-9893210862
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a
                  href="mailto:singhdhara42@gmail.com"
                  className="hover:text-gray-300"
                >
                  singhdhara42@gmail.com
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Monday - Friday, 8:00 AM - 7:00 PM EST
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Clinic Address</h3>
            <a
              href={googleMapsAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start"
            >
              <FaMapMarkerAlt className="mr-2 mt-1" />
              <address className="not-italic text-sm">
                Advanced Cardiac Care Clinic
                <br />
                G2 Vasundhra Tower, Kailash Vihar-30 Patel Nagar
                <br />
                Gwalior, India 474001
              </address>
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gray-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-gray-300">
                  Appointments
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Advanced Cardiac Care. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
