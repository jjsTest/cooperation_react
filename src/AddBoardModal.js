import React from 'react';

function AddBoardModal(){
    return (
        <>
            <ul>
                제목: <input type="text" name="board_name"></input>
                최대인원수: <input type="text" name="board_number"></input>
            </ul>
        </>
    )
}

export default AddBoardModal