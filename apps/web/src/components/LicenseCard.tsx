// apps/web/src/components/licenses/LicenseCard.tsx
import React from 'react';

interface LicenseCardProps {
  title: string;
  description: string;
}

const LicenseCard = ({ title, description }: LicenseCardProps) => (
  <div className="border border-gray-700 rounded-lg p-4 mb-4">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

export default LicenseCard;