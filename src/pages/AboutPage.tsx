const FEATURES = [
  { title: 'Ekle', text: '"Yeni kitap" butonu ile ad, yazar, tür, sayfa sayısı, durum, puan ve not girerek kitap ekle.' },
  { title: 'Listele', text: 'Kitaplar kartlar halinde listelenir; arama, durum ve tür filtresi ile sıralama seçenekleri vardır.' },
  { title: 'Güncelle', text: '"Düzenle" ile tüm bilgileri değiştir veya karttaki menüden durumu hızlıca güncelle.' },
  { title: 'Sil', text: '"Sil" butonu onay penceresi açar; onaylanınca kitap listeden kaldırılır.' }
];

const STACK = ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'LocalStorage'];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 pt-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Hakkında</h1>
        <p className="mt-2 text-slate-600">
          Kitaplığım, Web Geliştirme; JavaScript eğitimi kapsamında geliştirilmiş bir okuma listesi uygulamasıdır.
          Ekleme, listeleme, güncelleme ve silme (CRUD) işlemlerini içerir. Tüm veriler tarayıcının LocalStorage alanında
          tutulur; sunucu veya hesap gerekmez.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">Özellikler</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-indigo-700">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">Kullanılan teknolojiler</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <li key={s} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700">{s}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
