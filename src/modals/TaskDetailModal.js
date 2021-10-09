import React,{useState, useEffect} from 'react';
import axios from 'axios';

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

    useEffect(() => {
        GetTaskDetail();
      },[]);
    

    return (
        <>
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
            </div>

        </>
    )
}

export default TaskDetailModal