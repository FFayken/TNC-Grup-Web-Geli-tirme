import type { Book } from '../interfaces/Book';

/** Uygulama ilk açıldığında gösterilen örnek kitaplar */
export const SAMPLE_BOOKS: Book[] = [
  {
    id: 'ornek-1',
    title: 'Kürk Mantolu Madonna',
    author: 'Sabahattin Ali',
    genre: 'Roman',
    pages: 160,
    status: 'okundu',
    rating: 5,
    note: 'Raif Efendi\'nin defteri — tekrar okunmalı.',
    createdAt: '2026-10-02T10:00:00.000Z',
    updatedAt: '2026-10-09T18:30:00.000Z'
  },
  {
    id: 'ornek-2',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Bilim Kurgu',
    pages: 712,
    status: 'okunuyor',
    rating: 0,
    note: 'İkinci kitaba geçtim.',
    createdAt: '2026-10-20T09:15:00.000Z',
    updatedAt: '2026-11-12T21:00:00.000Z'
  },
  {
    id: 'ornek-3',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'Tarih',
    pages: 412,
    status: 'okunacak',
    rating: 0,
    note: '',
    createdAt: '2026-11-01T14:40:00.000Z',
    updatedAt: '2026-11-01T14:40:00.000Z'
  },
  {
    id: 'ornek-4',
    title: 'Simyacı',
    author: 'Paulo Coelho',
    genre: 'Roman',
    pages: 188,
    status: 'okundu',
    rating: 4,
    note: '',
    createdAt: '2026-09-15T08:00:00.000Z',
    updatedAt: '2026-09-21T20:10:00.000Z'
  },
  {
    id: 'ornek-5',
    title: 'Atomik Alışkanlıklar',
    author: 'James Clear',
    genre: 'Kişisel Gelişim',
    pages: 352,
    status: 'okunacak',
    rating: 0,
    note: 'Arkadaş önerisi.',
    createdAt: '2026-11-10T19:25:00.000Z',
    updatedAt: '2026-11-10T19:25:00.000Z'
  }
];
