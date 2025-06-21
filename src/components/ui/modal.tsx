import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './button';

interface ModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ open, title, children, onClose, actionLabel, onAction }) => {
  // Forzar renderizado en portal para evitar stacking context y problemas de z-index
  if (typeof window !== 'undefined' && open) {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
        <div className="bg-gradient-to-br from-card via-muted to-card rounded-2xl shadow-2xl p-10 max-w-lg w-full border-2 border-primary/40 relative animate-fade-in flex flex-col items-center">
          {title && <h2 className="text-2xl font-extrabold mb-6 text-primary text-center drop-shadow-lg tracking-wide uppercase animate-fade-in">{title}</h2>}
          <div className="mb-8 text-lg text-center text-card-foreground animate-fade-in-slow">{children}</div>
          <div className="flex justify-center gap-6 w-full animate-fade-in">
            {actionLabel && onAction && (
              <Button onClick={onAction} className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-xl px-6 py-2 text-base font-semibold rounded-lg hover:scale-105 transition-transform">
                {actionLabel}
              </Button>
            )}
            <Button variant="outline" onClick={onClose} className="border-primary/60 text-primary hover:bg-primary/10 px-6 py-2 text-base font-semibold rounded-lg">
              Cerrar
            </Button>
          </div>
        </div>
      </div>,
      document.body
    );
  }
  if (!open) return null;
  return null;
};
