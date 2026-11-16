export type PageKey = 'kitaplar' | 'hakkinda';

interface HeaderProps {
  current: PageKey;
}

const LINKS: { key: PageKey; label: string; href: string }[] = [
  { key: 'kitaplar', label: 'Kitaplarım', href: '#/' },
  { key: 'hakkinda', label: 'Hakkında', href: '#/hakkinda' }
];

export default function Header({ current }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M4 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H4zM20 5h-4a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h4z" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">Kitaplığım</span>
        </a>
        <nav className="flex gap-1">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                current === l.key ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
