import React, {useState, useEffect} from 'react';
import Header from './Header';
import AddTaskModal from '../modals/AddTaskModal';
import Modal from 'react-modal';
import axios from 'axios';
import TaskDetailModal from '../modals/TaskDetailModal';
import {
  CButton,
  CCardTitle,
  CCard,
  CCardBody
} from '@coreui/react';

function BoardRoom(props) {
  const [addModalState, setAddModalState] = useState(false); // 모달 open 여부
  const [detailModalState, setDetailModalState] = useState(false); // 모달 open 여부
  const [taskList, setTaskList] = useState([]);
  const boardId = props.match.params.boardId;
  const boardName = props.match.params.boardName;
  const [taskId, setTaskId] = useState("");
  const username = localStorage.getItem('authenticatedUser');
  const [memCheck, setMemCheck] = useState(0);

  function memberCheck(){
    axios(
      {
          //baseURL:'http://localhost:8080',
          url: '/board/memberCheck',
          method:'post',
          data:{
            id: boardId,
            member_id : username
         },
          baseURL:'http://localhost:8080',
          //withCredentials:true,
      })
      .then(function (response){
      console.log("성공");
      console.log(response);
      setMemCheck(response.data);
      //alert(memCheck>0);
    })
    .catch(function(error){
      console.log("실패");
      console.log(error);
    });
  }

  function getTask(){
    axios(
      {
          //baseURL:'http://localhost:8080',
          url: '/task/select',
          method:'post',
          data:{
            board_id: boardId,
         },
          baseURL:'http://localhost:8080',
          //withCredentials:true,
      })
      .then(function (response){
      console.log("성공");
      console.log(response);
      setTaskList(response.data);
    })
    .catch(function(error){
      console.log("실패");
      console.log(error);
    });
  }
    
  function addTaskModalOpen(){
    setAddModalState(true);
    // setModalOpen(true);
  }

  function addTaskModalClose(){
    setAddModalState(false);
    getTask();
    // setModalOpen(true);
  }

  function detailModalOpen(taskId){
    setTaskId(taskId);
    setDetailModalState(true);
    // setModalOpen(true);
  }

  function detailModalClose(){
    setDetailModalState(false);
    // setModalOpen(true);
  }

  function checkJoinID(){

  }

  function joinIn(){
    axios(
      {
          url: '/board/joinIn',
          method:'post',
          data:{
             id:boardId,
             member_id:username,
             
          },
          baseURL:'http://localhost:8080',
          //withCredentials:true,
      }
    ).then(function (response){
      console.log(response)
      if(response.data === 0){
          alert("Sorry, There was an error. Please try again");
      }else{
          alert("you have successfully join this board");
      }
      //window.location.replace("/");
    });
  }

  function leaveBoard(){
    if(window.confirm('삭제하시겠습니까')){
      axios(
        {
            url: '/board/leaveBoard',
            method:'post',
            data:{
              id:boardId,
              member_id:username,
             
            },
            baseURL:'http://localhost:8080',
            //withCredentials:true,
        }
      ).then(function (response){
        console.log(response)
        if(response.data === 0){
            alert("Sorry, There was an error. Please try again");
        }else{
            alert("you have successfully lefted this board");
        }
        //window.location.replace("/");
     });
    }
  }

  useEffect(() =>{
    memberCheck();
    getTask();
  },[])

      return (
        <div>
          <Header />
          <br/>
          <h2>{boardName} {memCheck == 0 ? <CButton color="success" onClick={joinIn}>Join In</CButton>: <CButton color="danger" onClick={leaveBoard}>Leave Board</CButton>} </h2>
          <hr></hr>        
          <CButton style={{display : 'block', margin : 'auto'}} color="success" shape="rounded-pill" onClick={addTaskModalOpen}>-------------AddTask-------------</CButton> 
          <Modal isOpen ={addModalState}>
            <AddTaskModal addTaskModalClose={addTaskModalClose} boardId={boardId} />
          </Modal>
          <br/><br/>
          {taskList.map((task) => (
              <CCard key={taskList.id} borderColor="primary" className="text-center" style={{ width: '18rem' }}>
              <CCardBody>
                <CCardTitle>{task.subject}</CCardTitle>
                <CButton onClick={() => detailModalOpen(task.id)}>Go TaskDetail</CButton>
              </CCardBody>
              </CCard>
          ))}
          <Modal isOpen ={detailModalState}>
            <TaskDetailModal detailModalClose={detailModalClose} boardId={boardId} taskId={taskId}/>
          </Modal>


          

          {/* <div className="container">
            {taskList.map((task) => (
              <div key={taskList.id} className="item">
                <p>subject: {task.subject}</p>
                <p>contents: {task.contents} </p>  길이제한 후 '...'으로 보여주기 
                <button onClick={detailModalOpen}>TaskDetail</button>
                <Modal isOpen ={detailModalState}>
                  <TaskDetailModal detailModalClose={detailModalClose} boardId={boardId} taskId={taskId} />
                </Modal>
              </div>
            ))}
          </div> */}

        </div>
      );
    }
  
    export default BoardRoom;