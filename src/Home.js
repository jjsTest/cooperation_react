import React, {useEffect, useState} from 'react';
import './Home.css';
import {Link,Route} from 'react-router-dom';
import Modal from 'react-modal';
import AddBoardModal from './AddBoardModal.js';
import axios from 'axios';
import BoardRoom from './BoardRoom.js';


function Home() {


  const [modalState, setModalState] = useState(false); // 모달 open 여부
  const [boardList, setBoardList] = useState([]);
  //const [nameValue, setNameValue] = useState(''); // 이름
  //const [countValue, setCountValue] = useState(0); // 사람 수 

  useEffect(() => {
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
  },[]);

  function addBoardModalOpen(){
      setModalState(true);
      // setModalOpen(true);
  }

  function addBoardModalClose(){
    setModalState(false);
    // setModalOpen(true);
  }

    return (
      <div>
          <h1>프로파일+member's name</h1>
				  <nav>
					  <ul>
              <li><Link to="/">home</Link></li>
						  <li><Link to="/signIn">sign in</Link></li>
						  <li><Link to="/signUp">sign up</Link></li>
						  <li><Link to="/community">community</Link></li>
              {/* 노티스, 컨택트, 방명록은 커뮤니티 드롭다운으로 */}
						  <li><Link to="/chat">chat</Link></li>
              {/* 서치하는것도 추가 */}
					  </ul>
				  </nav>
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
                {/* <link to= {`/BoardRoom/${board.id}`}>enter</link> */}
                <Link to ={{
                  pathname:"/boardRoom",
                  search:`?board_id=${board.id}`  
                }}> <button>enter</button> </Link>
              </div>
            ))}
          </div>
          
          <Route path="/" exact={true} component={Home} />
          <Route path="/boardRoom" component={BoardRoom} />
      </div>
    );
  }

  export default Home;