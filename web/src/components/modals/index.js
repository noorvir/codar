import React from 'react'


export default function Modal({ isOpen, setOpen, setScreen, children}) {

    if(!isOpen) {
        return null;
    }

    function close() {
        setOpen(false);
        setScreen('info');
    }

    return ( 
        <div className='modal is-active'>
            <div className='modal-background' onClick={close}></div>
            <div className='modal-card'>
                { children }
            </div>
        </div>
    )
}