import React, {useState} from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import AddBoardModal from './AddBoardModal.js';


function Home() {

  //보드추가 모달
  const [modalState, setModalState] = useState(false);

  function addBoardModalOpen(){
      setModalState(true);
      // setModalOpen(true);
  }

  function addBoardModalClose(){
    setModalState(false);
    // setModalOpen(true);
  }

  function addBoard(){
    AddBoardModal.board_name
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
          <button onClick={}>AddBoard</button>  
          <button onClick={addBoardModalOpen}>AddBoard</button>  
          <Modal isOpen ={modalState}>
            <AddBoardModal />
            <button onClick={addBoardModalClose}>add</button>
            <button onClick={addBoardModalClose}>close</button>
          </Modal>
          <hr></hr>
          <div className="container">
            <div className="item">a</div>
            <div className="item">b</div>
            <div className="item">c</div>
            <div className="item">d</div>
            <div className="item">e</div>
            <div className="item">f</div>
            <div className="item">f</div>
            <div className="item">f</div>
            <div className="item">f</div>
            <div className="item">f</div>
            <div className="item">f</div>
            <div className="item">f</div>
          </div>
      </div>
    );
  }

  export default Home;