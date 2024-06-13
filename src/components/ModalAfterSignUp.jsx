import React from 'react'

const ModalAfterSignUp = ({closeModal}) => {
  return (
    <div className='modal-bg'>
    <div className='modal-container'>
    <div className="modal-text">
    <h3>Congrats! You have signed up for event!</h3>
    </div>
    <button onClick={() => closeModal(false)}>Close</button>
    

    </div>
      
    </div>
  )
}

export default ModalAfterSignUp
