import React from 'react'

export default function ModalFooter({ button, children }) {

    return ( 
        <footer className="modal-card-foot modal-footer">
            {button}
        </footer>
    )
}