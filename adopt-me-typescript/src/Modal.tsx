import { Fragment, FunctionComponent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal: FunctionComponent = ({ children }) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
    elRef.current.setAttribute('id', 'elRef');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (!elRef.current || !modalRoot) return;

    modalRoot.appendChild(elRef.current);

    return () => {
      if (elRef.current) modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<Fragment>{children}</Fragment>, elRef.current);
};

export default Modal;

/* <div id="modal">
  <>
  <div id="elRef">
  {children}
  </div>
  </>
  </div> */
