import { useEffect, useState } from 'react';
import type { Book, BookInput } from '../interfaces/Book';
import { createId, loadBooks, saveBooks } from '../utils/storage';

/**
 * Kitap listesinin tüm CRUD işlemlerini yöneten hook.
 * Her değişiklik otomatik olarak LocalStorage'a kaydedilir.
 */
export function useBooks() {
  const [books, setBooks] = useState<Book[]>(() => loadBooks());

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  /** Ekle (Create) */
  const addBook = (input: BookInput) => {
    const now = new Date().toISOString();
    const book: Book = { ...input, id: createId(), createdAt: now, updatedAt: now };
    setBooks((prev) => [book, ...prev]);
    return book;
  };

  /** Güncelle (Update) */
  const updateBook = (id: string, changes: Partial<BookInput>) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...changes, updatedAt: new Date().toISOString() } : b))
    );
  };

  /** Sil (Delete) */
  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return { books, addBook, updateBook, deleteBook };
}
