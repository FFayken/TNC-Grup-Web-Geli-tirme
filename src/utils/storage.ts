import type { Book } from '../interfaces/Book';
import { SAMPLE_BOOKS } from './sampleBooks';

const STORAGE_KEY = 'kitapligim.books.v1';

/**
 * Kitapları LocalStorage'dan okur. İlk açılışta (anahtar hiç yoksa)
 * örnek kitaplarla başlar. LocalStorage erişilemezse (gizli pencere vb.)
 * örnek veriyle bellekte çalışmaya devam eder.
 */
export function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return SAMPLE_BOOKS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_BOOKS;
  } catch {
    return SAMPLE_BOOKS;
  }
}

export function saveBooks(books: Book[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    // Depolama dolu veya engelli; uygulama bellekte çalışmaya devam eder.
  }
}

export function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
