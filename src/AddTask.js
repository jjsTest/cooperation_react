import React from 'react';

function AddTask() {

    function addTaskModal({className,visible,contents}){
        
    }

    return (
    <>
        <button type='button' onClick={addTaskModal}>AddTask</button>    
        <div>
            <ModalOverlay visible={visible} />
            <ModalWrapper className={className} tabIndex="-1" visible={visible}>
                <ModalInner tabIndex="0" className="modal-inner">
                    {contents}
                </ModalInner>
            </ModalWrapper>
        </div>
    </>
    );
  }
  
  export default AddTask;