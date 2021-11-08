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
          withCredentials:true,
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

  function detailModalOpen(){
    alert("시작쓰");
    setDetailModalState(true);
    // setModalOpen(true);
  }

  function detailModalClose(){
    alert("끝쓰");
    setDetailModalState(false);
    // setModalOpen(true);
  }

  useEffect(() =>{
    getTask();
  },[])

      return (
        <div>
          <Header />
          <br/>
          <h2>{boardName}</h2> 
          <hr></hr>        
          <CButton color="success" shape="rounded-pill" onClick={addTaskModalOpen}>AddTask</CButton> 
          <Modal isOpen ={addModalState}>
            <AddTaskModal addTaskModalClose={addTaskModalClose} boardId={boardId} />
          </Modal>
          <br/><br/>
          {taskList.map((task) => (
            <div key={taskList.id}>
              <CCard borderColor="primary" className="text-center" style={{ width: '18rem' }}>
              <CCardBody>
                <CCardTitle>{task.subject}</CCardTitle>
                <CButton onClick={detailModalOpen}>Go TaskDetail</CButton>
                <Modal isOpen ={detailModalState}>
                  <TaskDetailModal detailModalClose={detailModalClose} boardId={boardId} taskId={task.id} />
                </Modal>
              </CCardBody>
              </CCard>
            </div>
          ))}



          <CCard className="text-center" style={{ width: '18rem' }}>
            {/* <CCardHeader>Header</CCardHeader> */}
            <CCardBody>
              <CCardTitle>Special title treatment</CCardTitle>
              {/* <CCardText>With supporting text below as a natural lead-in to additional content.</CCardText> */}
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>

          <div className="container">
            {taskList.map((task) => (
              <div key={taskList.id} className="item">
                <p>subject: {task.subject}</p>
                <p>contents: {task.contents} </p>  {/* 길이제한 후 '...'으로 보여주기 */}
                <button onClick={detailModalOpen}>TaskDetail</button>
                <Modal isOpen ={detailModalState}>
                  <TaskDetailModal detailModalClose={detailModalClose} boardId={boardId} taskId={task.id} />
                </Modal>
              </div>
            ))}
          </div>

        </div>
      );
    }
  
    export default BoardRoom;