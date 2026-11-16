import { useState, type FormEvent } from 'react';
import { GENRES, STATUS_LABELS, type Book, type BookInput, type ReadingStatus } from '../interfaces/Book';
import StarRating from './StarRating';

interface BookFormProps {
  /** Düzenleme modunda mevcut kitap; ekleme modunda undefined */
  initial?: Book;
  onSubmit: (data: BookInput) => void;
  onCancel: () => void;
}

type Errors = Partial<Record<'title' | 'author' | 'pages', string>>;

const EMPTY: BookInput = {
  title: '',
  author: '',
  genre: 'Roman',
  pages: 0,
  status: 'okunacak',
  rating: 0,
  note: ''
};

const inputCls =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200';

export default function BookForm({ initial, onSubmit, onCancel }: BookFormProps) {
  const [form, setForm] = useState<BookInput>(() => {
    if (!initial) return EMPTY;
    const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = initial;
    return rest;
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = <K extends keyof BookInput>(key: K, value: BookInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    // Kullanıcı alanı düzelttiğinde o alanın hata mesajını kaldır
    setErrors((e) => (key in e ? { ...e, [key]: undefined } : e));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.title.trim().length < 2) e.title = 'Kitap adı en az 2 karakter olmalı.';
    if (form.author.trim().length < 2) e.author = 'Yazar adı en az 2 karakter olmalı.';
    if (!Number.isFinite(form.pages) || form.pages < 0 || form.pages > 10000) e.pages = 'Sayfa sayısı 0-10000 arasında olmalı.';
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      note: form.note.trim(),
      // Okunmamış kitaba puan verilmez
      rating: form.status === 'okundu' ? form.rating : 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="title" className="text-sm font-medium text-slate-700">Kitap adı *</label>
        <input id="title" autoFocus value={form.title} onChange={(e) => set('title', e.target.value)} className={inputCls} placeholder="örn. Tutunamayanlar" />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="author" className="text-sm font-medium text-slate-700">Yazar *</label>
        <input id="author" value={form.author} onChange={(e) => set('author', e.target.value)} className={inputCls} placeholder="örn. Oğuz Atay" />
        {errors.author && <p className="mt-1 text-xs text-red-600">{errors.author}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="genre" className="text-sm font-medium text-slate-700">Tür</label>
          <select id="genre" value={form.genre} onChange={(e) => set('genre', e.target.value)} className={inputCls}>
            {GENRES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pages" className="text-sm font-medium text-slate-700">Sayfa sayısı</label>
          <input
            id="pages"
            type="number"
            min={0}
            value={form.pages || ''}
            onChange={(e) => set('pages', e.target.value === '' ? 0 : Number(e.target.value))}
            className={inputCls}
            placeholder="0"
          />
          {errors.pages && <p className="mt-1 text-xs text-red-600">{errors.pages}</p>}
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-slate-700">Durum</legend>
        <div className="mt-1 grid grid-cols-3 gap-2">
          {(Object.keys(STATUS_LABELS) as ReadingStatus[]).map((s) => (
            <label
              key={s}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
                form.status === s ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => set('status', s)} className="sr-only" />
              {STATUS_LABELS[s]}
            </label>
          ))}
        </div>
      </fieldset>

      {form.status === 'okundu' && (
        <div>
          <span className="text-sm font-medium text-slate-700">Puanın</span>
          <div className="mt-1">
            <StarRating value={form.rating} onChange={(v) => set('rating', v)} size="md" />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="note" className="text-sm font-medium text-slate-700">Not</label>
        <textarea id="note" rows={3} value={form.note} onChange={(e) => set('note', e.target.value)} className={inputCls} placeholder="Kitapla ilgili kısa bir not…" />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Vazgeç
        </button>
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
          {initial ? 'Değişiklikleri kaydet' : 'Kitabı ekle'}
        </button>
      </div>
    </form>
  );
}
