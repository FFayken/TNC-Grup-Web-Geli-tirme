import type { Book } from '../interfaces/Book';

interface StatsBarProps {
  books: Book[];
}

export default function StatsBar({ books }: StatsBarProps) {
  const reading = books.filter((b) => b.status === 'okunuyor').length;
  const done = books.filter((b) => b.status === 'okundu');
  const pagesRead = done.reduce((sum, b) => sum + (b.pages || 0), 0);

  const items = [
    { label: 'Toplam kitap', value: books.length },
    { label: 'Okunuyor', value: reading },
    { label: 'Okundu', value: done.length },
    { label: 'Okunan sayfa', value: pagesRead.toLocaleString('tr-TR') }
  ];

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <dt className="text-xs font-medium text-slate-500">{i.label}</dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
