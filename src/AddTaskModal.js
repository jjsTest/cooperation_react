import React,{useState} from 'react';
import axios from 'axios';

function AddTaskModal(props){

    const [values, setValues] = useState({
        subject : '',
        contents : ''
    });


    //비구조화 할당
    const {subject, contents} = values

    const handleChange = e =>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    function AddTask(){
        axios(
            {
                url: '/task/add',
                method:'post',
                data:{
                   board_id: props.boardId,
                   subject: subject,
                   contents : contents
                },
                baseURL:'http://localhost:8080',
                withCredentials:true,
            }
        ).then(function (response){
            console.log(response)
            if(response.data === 0){
                alert("Sorry, There was an error. Please try again");
            }else{
                alert("you have successfully created new task");
            }
            props.addTaskModalClose();
        });
    }

    return (
        <>
            <ul>
                제목: <input type="text" name="subject" onChange={handleChange} value={subject}></input><br/><br/>
                내용: <textarea name="contents" onChange={handleChange} value={contents}></textarea>
                {/* 첨부파일 */}
            </ul>
            <button onClick={AddTask}>add</button>
            <button onClick={props.addTaskModalClose}>close</button>
        </>
    )
}

export default AddTaskModal