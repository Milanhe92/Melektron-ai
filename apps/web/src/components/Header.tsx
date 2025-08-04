import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-500">
          Melektron
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-purple-400 transition-colors">
                Почетна
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-400 transition-colors">
                О нама
              </Link>
            </li>
            <li>
              <Link href="/licenses" className="hover:text-purple-400 transition-colors">
                Лиценце
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}