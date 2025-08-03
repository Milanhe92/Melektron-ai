import Link from 'next/link';
import LicenseCard from '@/components/licenses/LicenseCard';

export default function LicenseHub() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Лиценце и сертификати
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LicenseCard 
          title="Algolia ISO 27001 Сертификат" 
          description="Сертификат за усклађеност са стандардом ISO/IEC 27001:2022" 
          path="/licenses/algolia-iso-27001.pdf" 
          type="PDF"
        />

        <LicenseCard 
          title="CC0 1.0 Универзална лиценца" 
          description="Јавно добро - без ауторских права" 
          path="/licenses/cc0-1.0" 
          type="Детаљи"
        />

        <LicenseCard 
          title="CC BY 4.0 Креативне комоне" 
          description="Наведи аутора - Дозвољена адаптација" 
          path="/licenses/cc-by-4.0" 
          type="Детаљи"
        />

        <LicenseCard 
          title="MIT Лиценца" 
          description="Отворени код дозвољен за комерцијалну употребу" 
          path="/licenses/mit" 
          type="Текст"
        />
      </div>
    </div>
  );
}