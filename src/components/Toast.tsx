import { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onDone: () => void;
}

export default function Toast({ message, onDone }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <div role="status" className="animate-fade-in fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">
      {message}
    </div>
  );
}
