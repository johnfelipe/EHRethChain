import React, { useRef } from "react";
import { MdClose } from "react-icons/md";
import ReactDOM from "react-dom";

import "../styles/modal.css";

function Modal({ showModal, setShowModal, children, ...restProps }) {
  const modalRef = useRef();

  function closeModel(e) {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  const renderState = (
    <>
      {showModal ? (
        <div className="myModal-background" onClick={closeModel} ref={modalRef}>
          <div className="myModal-container" showModal={showModal}>
            {children}
            <MdClose
              className="myModel-close-button "
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </div>
        </div>
      ) : null}
    </>
  );

  return ReactDOM.createPortal(renderState, document.getElementById("modal"));
}

export default Modal;
