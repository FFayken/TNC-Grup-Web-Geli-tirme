/** Kitabın okuma durumu */
export type ReadingStatus = 'okunacak' | 'okunuyor' | 'okundu';

/** Kaydedilmiş bir kitap */
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  status: ReadingStatus;
  /** 0 = puan verilmedi, 1-5 arası yıldız */
  rating: number;
  note: string;
  createdAt: string;
  updatedAt: string;
}

/** Form üzerinden gelen (henüz kaydedilmemiş) kitap verisi */
export type BookInput = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;

export type StatusFilter = ReadingStatus | 'hepsi';

export type SortOption = 'yeni' | 'eski' | 'baslik' | 'puan';

export const STATUS_LABELS: Record<ReadingStatus, string> = {
  okunacak: 'Okunacak',
  okunuyor: 'Okunuyor',
  okundu: 'Okundu'
};

export const GENRES = [
  'Roman',
  'Bilim Kurgu',
  'Fantastik',
  'Polisiye',
  'Tarih',
  'Kişisel Gelişim',
  'Bilim',
  'Felsefe',
  'Şiir',
  'Diğer'
] as const;
