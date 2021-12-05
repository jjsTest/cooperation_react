import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle
  } from '@coreui/react';

function AddBoardModal(props){

    const username = localStorage.getItem('authenticatedUser');
    const history = useHistory();
    const [values, setValues] = useState({
        name : '',
        num : 0,
        total_num : ''
    });

    //비구조화 할당
    const {name, num, total_num} = values

    const handleChange = e =>{
        const {name, value} = e.target;
        //alert("handlechange:"+value);
        setValues({
            ...values,
            [name]: value
        });
    };

    function AddBoard(){
        //alert("값:"+total_num );
        //alert("널값인지:"+isNaN(total_num));
       // alert(isNaN(total_num)==false);

            axios(
                {
                    url: '/board/add',
                    method:'post',
                    data:{
                       name:name,
                       total_num:total_num,
                       create_id:username
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
                props.addBoardModalClose();
                window.location.replace("/");
            });
        
    }

    function EditBoard(){
        if(total_num < num){
            alert("Please check current number of people.");
        }else{
            axios(
                {
                    url: '/board/edit',
                    method:'post',
                    data:{
                       name:name,
                       total_num:total_num,
                       id: props.boardId,
                       update_id:username
                    },
                    baseURL:'http://localhost:8080',
                    //withCredentials:true,
                }
            ).then(function (response){
                console.log(response)
                if(response.data === 0){
                    alert("Sorry, There was an error. Please try again");
                }else{
                    alert("you have successfully edited this board");
                }
                props.addBoardModalClose();
                //history.push('/');
                //window.location.reload();
                window.location.replace("/");
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
                    //withCredentials:true,
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
            <CCard>
                <CCardHeader componenet="h5"><input style ={{border : 'none'}} type="text" name="name" onChange={handleChange} value={values.name} placeholder="Title"></input></CCardHeader>
                <CCardBody>
                    <CCardTitle><input style ={{border : 'none'}} type="number" name="total_num" onChange={handleChange} value={total_num} placeholder="Maximum Capacity"></input></CCardTitle>
                    {/* <CCardText></CCardText> */}
                    {props.boardId === "init" ? <CButton onClick={AddBoard}>add</CButton> : <CButton onClick={EditBoard}>edit</CButton>}
                    <CButton onClick={props.addBoardModalClose}>close</CButton>
                </CCardBody>
            </CCard>

        </>
    )
}

export default AddBoardModal