import React from 'react'

export default function ModalHeader( { title, handleBack, setOpen, setScreen, children } ) {

    function close() {
        setOpen(false);
        setScreen('info');
    }

    return ( 
        <header className="modal-card-head modal-header">
            {handleBack? <> 
                {
                    <a href="#" className="modal-back-button" onClick={handleBack}> &#8249; </a>
                } </>
                :
                <>
                {
                    // TODO: offset so that title is centered
                }
                </> 
            }
            {title && <>
                {
                <p class="modal-card-title">{ title }</p>
                } </>
            }
            <button className="delete" aria-label="close" onClick={close}></button>
            { children }
      </header>
    )
}