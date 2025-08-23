interface LicenseCardProps {
  name?: string;
  title?: string;  // Dodano
  version?: string;
  license?: string;
  author?: string;
  description?: string;
  repository?: string;
  path?: string;   // Dodano
  type?: string;   // Dodano
}

export default function LicenseCard({
  name,
  title,
  version,
  license,
  author,
  description,
  repository,
  path,
  type
}: LicenseCardProps) {
  const displayTitle = title || name || 'Unknown';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {displayTitle}
        </h3>
        {(version || type) && (
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {version ? `v${version}` : type}
          </span>
        )}
      </div>
      
      {license && (
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
            license === 'MIT' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : license === 'Apache-2.0'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : license === 'BSD-2-Clause' || license === 'BSD-3-Clause'
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            {license}
          </span>
        </div>
      )}

      {author && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <span className="font-medium">Author:</span> {author}
        </p>
      )}

      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {description}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        {repository && (
          <a
            href={repository}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Repository
          </a>
        )}
        
        {path && (
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download {type || 'File'}
          </a>
        )}
      </div>
    </div>
  )
}