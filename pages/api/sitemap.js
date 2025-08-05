export default function handler(req, res) {
  const pages = ['/', '/about', '/contact'] // Dodaj sve rute
  
  res.setHeader('Content-Type', 'text/xml')
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `
      <url>
        <loc>https://melektron.com${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
    `).join('')}
  </urlset>`)
  res.end()
}