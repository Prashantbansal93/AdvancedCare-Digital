import React from "react";

const ServiceCard = ({ title, description, icon, price }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg text-center  hover:shadow-xl transition-all duration-300">
      <div className="mb-4 text-center text-blue-600 text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      {price && (
        <div className="mt-3 text-blue-600 text-lg font-medium">₹{price}</div>
      )}
    </div>
  );
};

export default ServiceCard;
