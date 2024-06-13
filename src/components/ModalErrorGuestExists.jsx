import React, {useState} from 'react'
// import './modalError.css';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import Modal from 'react-modal';

const ModalErrorGuestExists = ({ message, closeModal }) => {
    return (
        <Modal
            isOpen={!!message}
            onRequestClose={closeModal}
            contentLabel="Error"
        >
            <h2>Error</h2>
            <p>{message}</p>
            <button onClick={closeModal}>Close</button>
        </Modal>
    );
};


// const ModalErrorGuestExists = ({ message, closeModal }) => {
//   return (
//     <div className="modal-error-guest-exists">
//     <div className="modal-guest-exists-content">
//         <span className="close" onClick={closeModal}>&times;</span>
//         <p>{message}</p>
//     </div>
// </div>
//   )
// }

// const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Registration</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{message}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

export default ModalErrorGuestExists
