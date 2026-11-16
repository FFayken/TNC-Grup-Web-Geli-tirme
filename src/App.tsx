import { useEffect, useState } from 'react';
import Header, { type PageKey } from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function readPage(): PageKey {
  return window.location.hash === '#/hakkinda' ? 'hakkinda' : 'kitaplar';
}

export default function App() {
  const [page, setPage] = useState<PageKey>(readPage);

  // Basit hash tabanlı sayfa geçişi (ek router kütüphanesi gerektirmez)
  useEffect(() => {
    const onHash = () => setPage(readPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="min-h-screen">
      <Header current={page} />
      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {page === 'kitaplar' ? <HomePage /> : <AboutPage />}
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Kitaplığım · React + TypeScript + Tailwind CSS · Veriler tarayıcınızda (LocalStorage) saklanır
      </footer>
    </div>
  );
}
