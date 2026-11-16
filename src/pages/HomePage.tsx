import { useCallback, useMemo, useState } from 'react';
import type { Book, BookInput, SortOption, StatusFilter } from '../interfaces/Book';
import { useBooks } from '../hooks/useBooks';
import StatsBar from '../components/StatsBar';
import FilterBar from '../components/FilterBar';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import Toast from '../components/Toast';

export default function HomePage() {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('hepsi');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState<SortOption>('yeni');

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Book | undefined>();
  const [toDelete, setToDelete] = useState<Book | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);

  const counts = useMemo<Record<StatusFilter, number>>(
    () => ({
      hepsi: books.length,
      okunacak: books.filter((b) => b.status === 'okunacak').length,
      okunuyor: books.filter((b) => b.status === 'okunuyor').length,
      okundu: books.filter((b) => b.status === 'okundu').length
    }),
    [books]
  );

  // Listeleme (Read): arama + filtre + sıralama
  const visible = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr');
    const list = books.filter(
      (b) =>
        (status === 'hepsi' || b.status === status) &&
        (!genre || b.genre === genre) &&
        (!q || b.title.toLocaleLowerCase('tr').includes(q) || b.author.toLocaleLowerCase('tr').includes(q))
    );
    return [...list].sort((a, b) => {
      switch (sort) {
        case 'eski':
          return a.createdAt.localeCompare(b.createdAt);
        case 'baslik':
          return a.title.localeCompare(b.title, 'tr');
        case 'puan':
          return b.rating - a.rating;
        default:
          return b.createdAt.localeCompare(a.createdAt);
      }
    });
  }, [books, search, status, genre, sort]);

  const openAdd = () => {
    setEditing(undefined);
    setFormOpen(true);
  };

  const openEdit = (book: Book) => {
    setEditing(book);
    setFormOpen(true);
  };

  const closeForm = useCallback(() => setFormOpen(false), []);

  const handleSubmit = (data: BookInput) => {
    if (editing) {
      updateBook(editing.id, data);
      setToast(`"${data.title}" güncellendi`);
    } else {
      addBook(data);
      setToast(`"${data.title}" eklendi`);
    }
    setFormOpen(false);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    deleteBook(toDelete.id);
    setToast(`"${toDelete.title}" silindi`);
    setToDelete(null);
  };

  const filtered = Boolean(search || genre || status !== 'hepsi');

  return (
    <div className="space-y-6 pt-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Okuma Listem</h1>
          <p className="mt-1 text-slate-500">Okuduğun, okumakta olduğun ve okuyacağın kitapları takip et.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Yeni kitap
        </button>
      </section>

      <StatsBar books={books} />

      <FilterBar
        search={search}
        onSearch={setSearch}
        status={status}
        onStatus={setStatus}
        genre={genre}
        onGenre={setGenre}
        sort={sort}
        onSort={setSort}
        counts={counts}
      />

      {visible.length === 0 ? (
        <EmptyState filtered={filtered && books.length > 0} onAdd={openAdd} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Kitap listesi">
          {visible.map((b) => (
            <BookCard
              key={b.id}
              book={b}
              onEdit={openEdit}
              onDelete={setToDelete}
              onStatusChange={(id, s) => {
                updateBook(id, { status: s, ...(s !== 'okundu' ? { rating: 0 } : {}) });
                setToast('Durum güncellendi');
              }}
            />
          ))}
        </section>
      )}

      <Modal open={formOpen} title={editing ? 'Kitabı düzenle' : 'Yeni kitap ekle'} onClose={closeForm}>
        {/* key: düzenlenen kitap değiştiğinde formun sıfırlanması için */}
        <BookForm key={editing?.id ?? 'yeni'} initial={editing} onSubmit={handleSubmit} onCancel={closeForm} />
      </Modal>

      <ConfirmDialog
        open={toDelete !== null}
        title="Kitabı sil"
        message={`"${toDelete?.title ?? ''}" kitaplığından silinecek. Bu işlem geri alınamaz.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />

      <Toast message={toast} onDone={clearToast} />
    </div>
  );
}
