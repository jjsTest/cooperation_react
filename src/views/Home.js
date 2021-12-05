import React, {useEffect, useState} from 'react';
import '../Home.css';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import AddBoardModal from '../modals/AddBoardModal.js';
import axios from 'axios';
//import BoardRoom from './BoardRoom.js';
import Header from './Header';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton
} from '@coreui/react';

function Home() {


  const [modalState, setModalState] = useState(false); // 모달 open 여부
  const [boardList, setBoardList] = useState([]);
  const [boardId, setBoardId] = useState("init");
  const fields = ['name','num', 'total_num', 'create_id'];
  const username = localStorage.getItem('authenticatedUser');
  //const [nameValue, setNameValue] = useState(''); // 이름
  //const [countValue, setCountValue] = useState(0); // 사람 수 

  function getBoard(){
    axios(
      {
          url: '/board/select',
          method:'post',
          baseURL:'http://localhost:8080',
          //withCredentials:true,
      })
      .then(function (response){
      console.log("성공");
      console.log(response);
      //alert("username:"+username);
      setBoardList(response.data);
    })
    .catch(function(error){
      console.log("실패");
      console.log(error);
    });
  }

  function addBoardModalOpen(){
    setModalState(true);
    // setModalOpen(true);
  }

  function addBoardModalClose(){
    setModalState(false);
    // setModalOpen(true);
  }

  function editBoard(id){
    //boardId.current = id;
    setBoardId(id);
    addBoardModalOpen();
  }

  function deleteBoard(id){
    if(window.confirm('삭제하시겠습니까')){
      axios(
        {
            url: '/board/delete',
            method:'post',
            data:{
               id: id
            },
            baseURL:'http://localhost:8080',
            //withCredentials:true,
        }
    ).then(function (response){
        console.log(response)
        if(response.data === 0){
            alert("Sorry, There was an error. Please try again");
        }else{
            alert("you have successfully created new board");
        }
    });
      getBoard();
    }
  }

  useEffect(() => {
    getBoard();
  },[]);

    return (
      <div>
        <Header />  
        <br/>
        {/* 보드 추가 모달창 */}
        <CButton style={{display : 'block', margin : 'auto'}} color="success" shape="rounded-pill" onClick={addBoardModalOpen}>-------------AddBoard-------------</CButton>  
        <Modal isOpen ={modalState}>
          <AddBoardModal fullscreen='md-down' addBoardModalClose={addBoardModalClose} boardId={boardId}/>
        </Modal>
        <br/>
        {/* <CRow>*/}
          {/* <CCol xs="12" lg="6"> */}
         {/* <CCol xs="12" lg="20">
            <CCard>
              <CCardHeader>
                Striped Table
              </CCardHeader>  */}
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">project</CTableHeaderCell>
                    <CTableHeaderCell scope="col">create_id</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">HeadCount / Maximum Capacity</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">Current/Maximum</CTableHeaderCell>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {boardList.map((board) => (
                  <CTableRow key={boardList.id}>
                        <CTableHeaderCell scope="row">{board.id}</CTableHeaderCell>
                        <CTableDataCell scope="row">{board.name}</CTableDataCell>
                        <CTableDataCell scope="row">{board.create_id}</CTableDataCell>
                        <CTableDataCell scope="row">{board.num} / {board.total_num}</CTableDataCell>
                        <CTableDataCell scope="row">{board.create_id==username ? <button onClick={() => editBoard(board.id)}>edit</button>: null}
                        {board.create_id==username ? <button onClick={() => deleteBoard(board.id)}>delete</button>: null}
                        {/* if({board.create_id} === "j"){ <button>edit</button>} */}
                        <Link to={`/BoardRoom/${board.id}/${board.name}`}><button>enter</button></Link></CTableDataCell>
                        {/* ` : 템플릿 문자열 이때 변수는 ${}안에 넣어서 보내줘야해서 위처럼 사용함. */}
                        {/* <Link to ={{
                          pathname:"/boardRoom",
                          search:`?board_id=${board.id}`
                        }}> <button>enter</button> </Link> */}
                    </CTableRow>    
                    ))}
                </CTableBody>
              </CTable>
            {/* </CCard>
          </CCol>
        </CRow>  */}
      </div>
    );
  }

  export default Home;

  //https://coreui.io/react/docs/4.0/components/table/