import React, {useEffect, useState} from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import AddBoardModal from './AddBoardModal.js';
import axios from 'axios';
//import BoardRoom from './BoardRoom.js';
import Header from './Header.js';

function Home() {


  const [modalState, setModalState] = useState(false); // 모달 open 여부
  const [boardList, setBoardList] = useState([]);
  //const [nameValue, setNameValue] = useState(''); // 이름
  //const [countValue, setCountValue] = useState(0); // 사람 수 

  function getBoard(){
    axios(
      {
          //baseURL:'http://localhost:8080',
          url: '/board/select',
          method:'post',
          baseURL:'http://localhost:8080',
          withCredentials:true,
      })
      .then(function (response){
      console.log("성공");
      console.log(response);
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

  useEffect(() => {
    getBoard();
  },[]);

    return (
      <div>
        <Header />
        
          {/* 보드 추가 모달창 */}
          <button onClick={addBoardModalOpen}>AddBoard</button>  
          <Modal isOpen ={modalState}>
            <AddBoardModal addBoardModalClose={addBoardModalClose} />
          </Modal>
          <hr></hr>
          <div className="container">
            {boardList.map((board) => (
              <div key={boardList.id} className="item">
                <p>name: {board.name}</p>
                <p>{board.num} / {board.total_num}</p>
                <Link to={`/BoardRoom/${board.id}`}><button>enter</button></Link>
                {/* ` : 템플릿 문자열 이때 변수는 ${}안에 넣어서 보내줘야해서 위처럼 사용함. */}
                {/* <Link to ={{
                  pathname:"/boardRoom",
                  search:`?board_id=${board.id}`
                }}> <button>enter</button> </Link> */}

              </div>
            ))}
          </div>
      </div>
    );
  }

  export default Home;