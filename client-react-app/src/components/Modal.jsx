import React, { useRef } from "react";
import { MdClose } from "react-icons/md";
import ReactDOM, { render } from "react-dom";

import "./Modal.css";

function Modal({ showModal, setShowModal, ...restProps }) {
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
            <div className="myModal-content">{restProps.body}</div>
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
