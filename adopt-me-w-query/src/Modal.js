import {
  Fragment,
  useEffect,
  useRef
} from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
    elRef.current.setAttribute('id', 'elRef');
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => {
      modalRoot.removeChild(elRef.current);
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
