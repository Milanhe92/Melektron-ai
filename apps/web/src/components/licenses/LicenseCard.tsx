import Link from 'next/link';

interface LicenseCardProps {
  title: string;
  description: string;
  path: string;
  type: string;
}

export default function LicenseCard({ 
  title, 
  description, 
  path, 
  type 
}: LicenseCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 hover:border-purple-500 transition-all p-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <Link href={path} className={`inline-block ${
        type === 'PDF' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
      } text-white px-4 py-2 rounded-lg transition-all`}>
        {type === 'PDF' ? '📄 Преузми PDF' : '📝 Погледај детаље'}
      </Link>
    </div>
  );
}