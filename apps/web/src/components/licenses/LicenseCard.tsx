import React from 'react';

interface LicenseCardProps {
  title: string;
  description: string;
  features: string[];
}

const LicenseCard = ({ title, description, features }: LicenseCardProps) => (
  <div className="border border-gray-300 rounded-lg p-6 mb-6 shadow-md">
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="mb-4">{description}</p>
    
    <ul className="list-disc pl-5 mb-4">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
      Odaberi licencu
    </button>
  </div>
);

export default LicenseCard;