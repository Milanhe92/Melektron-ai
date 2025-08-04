export default function CC0License() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center">CC0 1.0 Универзална лиценца</h1>
        <p className="text-center mb-6">Јавно добро - без ауторских права</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2>О лиценци</h2>
        <p>
          CC0 вам омогућава да одбаците сва ауторска права и сродна права над вашим делом,
          ефективно стављајући га у јавно добро за свачију неограничену употребу.
        </p>

        <h2>Кључна одредба</h2>
        <p>
          Када користите CC0, одричете се свих ауторских права у највећој могућој мери дозвољеној законом,
          укључујући и сродна права као што су извођачка, фонографска и емисионска права.
        </p>

        <h2>Како применити</h2>
        <p>
          Да бисте применили CC0 на свој рад, додајте следећу ознаку:
        </p>
        <pre className="bg-gray-800 p-4 rounded">
          {`<a href="https://creativecommons.org/publicdomain/zero/1.0/">
  <img src="https://licensebuttons.net/p/zero/1.0/88x31.png" alt="CC0" />
</a>`}
        </pre>

        <h2>Званични документ</h2>
        <p>
          Преузмите званични текст лиценце:
        </p>
        <a 
          href="/licenses/cc0-1.0.xmp.xml" 
          download
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
        >
          📥 Преузми XMP метаподатке
        </a>
      </div>
    </div>
  );
}