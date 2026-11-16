import { GENRES, STATUS_LABELS, type SortOption, type StatusFilter } from '../interfaces/Book';

interface FilterBarProps {
  search: string;
  onSearch: (v: string) => void;
  status: StatusFilter;
  onStatus: (v: StatusFilter) => void;
  genre: string;
  onGenre: (v: string) => void;
  sort: SortOption;
  onSort: (v: SortOption) => void;
  counts: Record<StatusFilter, number>;
}

const TABS: StatusFilter[] = ['hepsi', 'okunacak', 'okunuyor', 'okundu'];

export default function FilterBar(p: FilterBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Ara</span>
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.45 4.39l3.08 3.08a.75.75 0 1 1-1.06 1.06l-3.08-3.08A7 7 0 0 1 2 9Z" clipRule="evenodd" />
          </svg>
          <input
            type="search"
            value={p.search}
            onChange={(e) => p.onSearch(e.target.value)}
            placeholder="Kitap veya yazar ara…"
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <select
          value={p.genre}
          onChange={(e) => p.onGenre(e.target.value)}
          aria-label="Türe göre filtrele"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">Tüm türler</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={p.sort}
          onChange={(e) => p.onSort(e.target.value as SortOption)}
          aria-label="Sırala"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="yeni">En yeni eklenen</option>
          <option value="eski">En eski eklenen</option>
          <option value="baslik">Başlığa göre (A-Z)</option>
          <option value="puan">Puana göre</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Duruma göre filtrele">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={p.status === t}
            onClick={() => p.onStatus(t)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              p.status === t
                ? 'bg-slate-900 text-white'
                : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t === 'hepsi' ? 'Hepsi' : STATUS_LABELS[t]}
            <span className={`ml-1.5 tabular-nums ${p.status === t ? 'text-slate-300' : 'text-slate-400'}`}>
              {p.counts[t]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
