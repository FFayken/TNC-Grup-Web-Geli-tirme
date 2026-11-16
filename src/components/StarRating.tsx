interface StarRatingProps {
  value: number;
  onChange?: (v: number) => void;
  size?: 'sm' | 'md';
}

export default function StarRating({ value, onChange, size = 'sm' }: StarRatingProps) {
  const cls = size === 'sm' ? 'h-4 w-4' : 'h-6 w-6';
  const readOnly = !onChange;

  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} / 5 puan`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <svg viewBox="0 0 20 20" className={`${cls} ${n <= value ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" aria-hidden="true">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
          </svg>
        );
        return readOnly ? (
          <span key={n}>{star}</span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onChange!(n === value ? 0 : n)}
            className="rounded transition hover:scale-110"
            aria-label={`${n} yıldız`}
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}
