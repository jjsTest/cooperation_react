import React,{useState, useEffect} from 'react';
import axios from 'axios';

function AddBoardModal(props){

    const [values, setValues] = useState({
        name : '',
        num : 0,
        total_num : 0
    });

    //비구조화 할당
    const {name, num, total_num} = values

    const handleChange = e =>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    function AddBoard(){
        axios(
            {
                url: '/board/add',
                method:'post',
                data:{
                   name:name,
                   total_num:total_num
                    //name: 'hong',
                    //count: 1
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
            }
            props.addBoardModalClose();
        });
    }

    function EditBoard(){
        if(total_num < num){
            alert("참여인원보다 많은 인원 수를 입력하세요.");
        }else{
            axios(
                {
                    url: '/board/edit',
                    method:'post',
                    data:{
                       name:name,
                       total_num:total_num,
                       id: props.boardId
                        //name: 'hong',
                        //count: 1
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
                }
                props.addBoardModalClose();
            });
        }
    }

    useEffect(() => {
        //alert("props.boardID:"+props.boardId);
        if(props.boardId !== "init"){
            axios(
                {
                    //baseURL:'http://localhost:8080',
                    url: '/board/selectId',
                    method:'post',
                    data:{
                        id: props.boardId,
                     },
                    baseURL:'http://localhost:8080',
                    withCredentials:true,
                })
                .then(function (response){
                console.log("성공");
                console.log(response);
                setValues({
                    name:response.data[0].name,
                    num:response.data[0].num,
                    total_num:response.data[0].total_num
                });
              })
              .catch(function(error){
                console.log("실패");
                console.log(error);
              });

        }
      },[]);

    return (
        <>
            <ul>
                제목: <input type="text" name="name" onChange={handleChange} value={values.name} ></input>
                최대인원수: <input type="text" name="total_num" onChange={handleChange} value={total_num} ></input>
            </ul>
            {props.boardId === "init" ? <button onClick={AddBoard}>add</button> : <button onClick={EditBoard}>edit</button>}
            <button onClick={props.addBoardModalClose}>close</button>
        </>
    )
}

export default AddBoardModal