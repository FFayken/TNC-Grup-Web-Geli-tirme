import { STATUS_LABELS, type Book, type ReadingStatus } from '../interfaces/Book';
import StarRating from './StarRating';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onStatusChange: (id: string, status: ReadingStatus) => void;
}

const STATUS_STYLES: Record<ReadingStatus, string> = {
  okunacak: 'bg-slate-100 text-slate-700 ring-slate-200',
  okunuyor: 'bg-amber-50 text-amber-800 ring-amber-200',
  okundu: 'bg-emerald-50 text-emerald-700 ring-emerald-200'
};

const SPINE: Record<ReadingStatus, string> = {
  okunacak: 'bg-slate-300',
  okunuyor: 'bg-amber-400',
  okundu: 'bg-emerald-500'
};

export default function BookCard({ book, onEdit, onDelete, onStatusChange }: BookCardProps) {
  return (
    <article className="animate-fade-in relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <span className={`absolute inset-y-0 left-0 w-1 ${SPINE[book.status]}`} aria-hidden="true" />
      <div className="flex flex-1 flex-col gap-3 p-4 pl-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900" title={book.title}>{book.title}</h3>
            <p className="truncate text-sm text-slate-500">{book.author}</p>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[book.status]}`}>
            {STATUS_LABELS[book.status]}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="rounded bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">{book.genre}</span>
          {book.pages > 0 && <span>{book.pages} sayfa</span>}
          {book.status === 'okundu' && book.rating > 0 && <StarRating value={book.rating} />}
        </div>

        {book.note && <p className="line-clamp-2 text-sm text-slate-600">{book.note}</p>}

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <select
            value={book.status}
            onChange={(e) => onStatusChange(book.id, e.target.value as ReadingStatus)}
            aria-label={`${book.title} durumunu değiştir`}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700 outline-none focus:border-indigo-400"
          >
            {(Object.keys(STATUS_LABELS) as ReadingStatus[]).map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
          <div className="flex gap-1">
            <button onClick={() => onEdit(book)} className="rounded-md px-2.5 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-50">
              Düzenle
            </button>
            <button onClick={() => onDelete(book)} className="rounded-md px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50">
              Sil
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
