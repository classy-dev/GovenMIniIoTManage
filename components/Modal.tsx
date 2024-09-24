import styled from '@emotion/styled';
import { useEffect } from 'react';

import Portal from './Portal';
import Close from './icons/Close';

const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  overflow-y: auto;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s 0.5s ease, opacity 0.5s ease;

  &[aria-hidden='false'] {
    transition-delay: 0ms !important;
    visibility: visible;
    opacity: 1;
  }

  .dim {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    z-index: 0;
  }

  .close {
    position: absolute;
    top: -2rem;
    right: -2rem;
    z-index: 1;
    width: 3rem;
    height: 3rem;
    background-color: #fff;
    border-radius: 50%;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    position: absolute;
    display: inline-flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    z-index: 1;
  }

  @media screen and (max-width: 500px) {
    .close {
      top: 1rem;
      right: 1rem;
      bottom: 100vh;
    }
  }
`;

export interface ModalProps {
  show?: boolean;
  onClose?: () => void;
  className?: string;
}

const Modal = ({
  show,
  onClose,
  children,
}: React.PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.();

    if (show) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', close);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => document.removeEventListener('keydown', close);
  }, [show]);

  if (typeof window === 'undefined') return null;

  return (
    <Portal>
      <ModalStyle aria-hidden={show ? 'false' : 'true'} role="dialog">
        {/** Dim */}
        <div className="dim" onClick={onClose} />
        <div className="content">
          {children}
          {/** Close Button */}
          {/* <button onClick={onClose} className="close" aria-label="Close Modal">
            <Close />
          </button> */}
        </div>
      </ModalStyle>
    </Portal>
  );
};

export default Modal;
