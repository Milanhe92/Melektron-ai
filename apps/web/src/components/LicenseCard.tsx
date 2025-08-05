// components/LicenseCard.tsx
interface LicenseCardProps {
  title: string;
  description: string;
  path: string; // Add this line
  type: string;
}

export default function LicenseCard({
  title,
  description,
  path, // Add this parameter
  type
}: LicenseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {type}
        </span>
        <a 
          href={path} 
          className="text-blue-600 hover:text-blue-800 font-medium"
          download
        >
          Преузми
        </a>
      </div>
    </div>
  );
}