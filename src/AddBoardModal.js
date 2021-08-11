import React from 'react';

function AddBoardModal(){
    const [values, setValues] = useState({
        name : '',
        number : ''
    });
    const {name, number} = values

    const handleChange = e =>{
        const {value, name } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    return (
        <>
            <ul>
                제목: <input type="text" name="name" onChange={handleChange} value={name}></input>
                최대인원수: <input type="text" name="number" onChange={handleChange} value={number}></input>
            </ul>
        </>
    )
}

export default AddBoardModal