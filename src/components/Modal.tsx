import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Modal({ onClose, children }: ModalProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    boxRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && boxRef.current) {
        const items = Array.from(boxRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === boxRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    const box = boxRef.current;
    const heading = box?.querySelector('h3');
    if (box && heading) {
      if (!heading.id) heading.id = 'modal-title';
      box.setAttribute('aria-labelledby', heading.id);
    }
  }, [children]);

  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        // dismiss on press, so a drag that starts inside the dialog never closes it
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" ref={boxRef} tabIndex={-1}>
        <button className="modal__x" aria-label="Close" onClick={onClose}>
          <X size={20} aria-hidden />
        </button>
        {children}
      </div>
    </div>
  );
}
