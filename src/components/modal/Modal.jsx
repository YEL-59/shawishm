import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext"; 

const Modal = () => {
  const { modalOpen, modalData, closeModal } = useContext(ModalContext);

  if (!modalOpen || !modalData) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        border: "1px solid #ccc",
        zIndex: 2,
      }}
    >
      <h2>Edit Row</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={modalData.Name}
          onChange={(e) => setModalData({ ...modalData, Name: e.target.value })}
        />
      </div>
      <div>
        <label>Study Date:</label>
        <input
          type="text"
          value={modalData["Study Date"]}
          onChange={(e) => setModalData({ ...modalData, "Study Date": e.target.value })}
        />
      </div>
      {/* Add other fields as needed */}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default Modal;
