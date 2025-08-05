import LicenseCard from '@/components/LicenseCard';

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Лиценце и сертификати</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LicenseCard 
            title="Algolia ISO 27001 Сертификат" 
            description="Сертификат за усклађеност са стандардом ISO/IEC 27001:2022" 
            path="/licenses/algolia-iso-27001.pdf" 
            type="PDF"
          />
          
          <LicenseCard 
            title="OpenAI API Лиценца" 
            description="Лиценца за употребу OpenAI API сервиса" 
            path="/licenses/openai-api-license.pdf"
            type="PDF"
          />
          
          <LicenseCard 
            title="Google Cloud Platform Сертификат" 
            description="Сертификат за усклађеност са GCP безбедносним стандардима" 
            path="/licenses/gcp-certificate.pdf"
            type="PDF"
          />
          
          <LicenseCard 
            title="AWS Социјални Медији Сертификат" 
            description="Сертификат за интеграцију са AWS социјалним медијима" 
            path="/licenses/aws-social-media.pdf"
            type="PDF"
          />
        </div>
      </div>
    </div>
  );
}