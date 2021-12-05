import React,{useState} from 'react';
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle
  } from '@coreui/react';

function AddTaskModal(props){

    const username = localStorage.getItem('authenticatedUser');
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
                   contents : contents,
                   create_id: username
                },
                baseURL:'http://localhost:8080',
                //withCredentials:true,
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
            <CCard>
                <CCardHeader componenet="h5"><input style ={{border : 'none'}} type="text" name="subject" onChange={handleChange} value={subject} placeholder="Task Title"></input></CCardHeader>
                <CCardBody>
                    <CCardTitle><textarea style ={{border : 'none'}} name="contents" onChange={handleChange} value={contents} placeholder="contents"></textarea></CCardTitle>
                    {/* <CCardText></CCardText> */}
                    <CButton onClick={AddTask}>add</CButton>
                    <CButton onClick={props.addTaskModalClose}>close</CButton>
                </CCardBody>
            </CCard>


        </>
    )
}

export default AddTaskModal