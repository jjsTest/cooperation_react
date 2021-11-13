import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardText,
    CContainer,
    CCol,
    CInputGroup,
    CFormInput,
    CCardTitle
  } from '@coreui/react';

function TaskDetailModal(props){

    const [detailList, setDetailList] = useState([]);
    const [inComment, setInComment] = useState('');

    const handleChange = e =>{
        setInComment(e.target.value)
    };

    function GetTaskDetail(){
        axios(
            {
                url: '/task/getDetail',
                method:'post',
                data:{
                   board_id: props.boardId,
                   task_id: props.taskId
                },
                baseURL:'http://localhost:8080',
                withCredentials:true,
            })
            .then(function (response){
                console.log("성공");
                console.log(response);
                setDetailList(response.data);
              })
              .catch(function(error){
                console.log("실패");
                console.log(error);
              });
    }

    function AddComment(){
        axios(
            {
                url: '/task/addComment',
                method:'post',
                data:{
                    board_id:props.boardId,
                    task_id:props.taskId,
                    contents: inComment
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
                GetTaskDetail();
            }
        });
    }

    // function editTask(id){
    //     if(window.confirm('변경하시겠습니까?')){
    //         axios(
    //             {
    //                 url: '/task/editTask',
    //                 method:'post',
    //                 data:{
    //                     board_id:props.boardId,
    //                     task_id:props.taskId,
    //                     task_subject: 
    //                     task_contents: inComment
    //                 },
    //                 baseURL:'http://localhost:8080',
    //                 withCredentials:true,
    //             }
    //         ).then(function (response){
    //             console.log(response)
    //             if(response.data === 0){
    //                 alert("Sorry, There was an error. Please try again");
    //             }else{
    //                 alert("you have successfully created new board");
    //                 GetTaskDetail();
    //             }
    //         });  
    //     } 
    // }

    useEffect(() => {
        GetTaskDetail();
      },[]);
    

    return (
        <>
            {/* {board.create_id=="j" ? <button onClick={() => editTask(task.id)}>edit</button>: null} */}
            <button onClick={props.detailModalClose}>close</button>
            {/* <CCard borderColor="primary" className="text-center" style={{ width: '18rem' }}> */}
             <CCard borderColor="primary" className="text-center">
                {/* detailList[0] 뒤의 ?는 safe operation detailList[0]이 null이나  undefined면 아무것도안하고 지나감*/}
                {/* 안전 연산자는 페이지가 실제로 사용할 수있을 때까지 값을 검색하지 않도록 돕고 오류를 저장하며 경우에 따라 훨씬 더 문제가되는 시나리오를 방지합니다 */}
                <CCardHeader>{detailList[0]?.task_subject}</CCardHeader>
                <CCardBody>
                    {/* <CCardTitle>{detailList[0].task_subject}</CCardTitle> */}
                    <CCardText>{detailList[0]?.task_contents}</CCardText>
                </CCardBody>
            </CCard> 
            <CContainer>
                {detailList.map((detail) => (
                    <div key={detailList.comment_id} className="item">
                        <CCol xs={4}>{detail.member_name}</CCol>
                        <CCol xs={8}>{detail.comment_contents}</CCol>
                    </div>
                 ))} 
            </CContainer>
            <CInputGroup className="mb-3">
                <CFormInput name="inComment" onChange={handleChange} value={inComment} placeholder="Recipient's username" aria-label="호호호" aria-describedby="button-addon2"/>
                <CButton type="button" color="secondary" variant="outline" id="button-addon2" onClick={AddComment}>Add</CButton>
            </CInputGroup>
            {/* <CCard borderColor="primary" className="text-center">
                

                <CCardHeader>{detailList[0].task_subject}</CCardHeader>
                <CCardBody>
                    <CCardText>{detailList[0].task_contents}</CCardText>
                </CCardBody>
            </CCard>  
             */}
{/* 


             <div className="container">
                {detailList.map((detail) => (
                <div key={detailList.task_id} className="item">
                    <p>subject: {detail.task_subject}</p>
                    <p>contents: {detail.task_contents} </p> 
                </div>
                 ))} 
                 <br/>
                {detailList.map((detail) => (
                <div key={detailList.comment_id} className="item">
                    <p> 작성자 : {detail.comment_contents}</p>
                </div>
                 ))}
                <br/>
                <p><input type="text" name="inComment" onChange={handleChange} value={inComment}></input><button onClick={AddComment}>Comment</button></p>
                <br/>
                <button onClick={props.detailModalClose}>close</button>
            </div> */}

        </>
    )
}

export default TaskDetailModal