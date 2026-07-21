import React from "react";

const Services = ({ name, description, src }) => {
  return (
    <div className="group w-full max-w-sm mx-auto relative z-0">
      <div
        className="bg-gradient-to-b from-blue-50 via-white to-white rounded-2xl border border-gray-200 shadow-md overflow-hidden
        transition duration-500 ease-in-out transform group-hover:-translate-y-2 group-hover:shadow-xl"
      >
        {/* Image */}
        <div className="h-40 w-full overflow-hidden relative">
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-2 bg">
          <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
