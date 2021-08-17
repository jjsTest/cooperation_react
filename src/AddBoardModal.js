import React,{useState} from 'react';
import axios from 'axios';

function AddBoardModal(props){
    const [values, setValues] = useState({
        name : '',
        count : 0
    });
    const {name, count} = values

    const handleChange = e =>{
        const {value, count } = e.target;
        setValues({
            ...values,
            [count]: value
        });
    };

    function AddBoard(){
        axios(
            {
                url: '/board/add',
                method:'post',
                data:{
                    name:{name},
                    count: {count}
                },
                baseURL:'http://localhost:8080',
                withCredentials:true,
            }
        ).then(function (response){
            //모달끄고 재조회
        })
    }

    return (
        <>
            <ul>
                제목: <input type="text" name="name" onChange={handleChange} value={name}></input>
                최대인원수: <input type="text" name="number" onChange={handleChange} value={number}></input>
            </ul>
            <button onClick={AddBoard}>add</button>
            <button onClick={props.addBoardModalClose}>close</button>
        </>
    )
}

export default AddBoardModal