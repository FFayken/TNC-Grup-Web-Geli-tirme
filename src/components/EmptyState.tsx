interface EmptyStateProps {
  filtered: boolean;
  onAdd: () => void;
}

export default function EmptyState({ filtered, onAdd }: EmptyStateProps) {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center">
      <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 6.04A8.97 8.97 0 0 0 6 3.75c-1.05 0-2.06.18-3 .51v14.25A8.99 8.99 0 0 1 6 18c2.3 0 4.4.87 6 2.29m0-14.25a8.97 8.97 0 0 1 6-2.29c1.05 0 2.06.18 3 .51v14.25A8.99 8.99 0 0 0 18 18a8.97 8.97 0 0 0-6 2.29m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3 className="mt-3 font-semibold text-slate-800">{filtered ? 'Eşleşen kitap yok' : 'Kitaplığın boş'}</h3>
      <p className="mt-1 text-sm text-slate-500">
        {filtered ? 'Arama veya filtreleri değiştirmeyi dene.' : 'İlk kitabını ekleyerek okuma listeni oluştur.'}
      </p>
      {!filtered && (
        <button onClick={onAdd} className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          Kitap ekle
        </button>
      )}
    </div>
  );
}
