import React,{useState} from 'react';
import axios from 'axios';

function AddBoardModal(props){

    const [values, setValues] = useState({
        name : '',
        total_num : 0
    });

    //비구조화 할당
    const {name, total_num} = values

    const handleChange = e =>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    function AddBoard(){
        axios(
            {
                url: '/board/add',
                method:'post',
                data:{
                   name:name,
                   total_num:total_num
                    //name: 'hong',
                    //count: 1
                },
                baseURL:'http://localhost:8080',
                withCredentials:true,
            }
        ).then(function (response){
            console.log(response)
            if(response.data === 0){
                alert("Sorry, There was an error. Please try again");
            }else{
                alert("you have successfully created new board");
            }
            props.addBoardModalClose();
        });
    }

    return (
        <>
            <ul>
                제목: <input type="text" name="name" onChange={handleChange} value={name}></input>
                최대인원수: <input type="text" name="total_num" onChange={handleChange} value={total_num}></input>
            </ul>
            <button onClick={AddBoard}>add</button>
            <button onClick={props.addBoardModalClose}>close</button>
        </>
    )
}

export default AddBoardModal