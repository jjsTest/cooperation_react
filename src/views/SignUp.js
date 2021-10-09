import React, {useState} from 'react';
//import './Home.css';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
//import BoardRoom from './BoardRoom.js';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";

function SignUp() {

    const [values, setValues] = useState({
        id : '',
        pw : '',
        pwChk : '',
        email:''
    });

    //비구조화 할당
    const {id, pw,pwChk, email} = values

    const handleChange = e =>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    let history = useHistory();

    function SaveSignUp(){
        history.push("/home");
        // //아디 영문자만받을건가욥?
        // if(id === "" || id.length>20){
        //     alert("아이디sms 20이하의 길이로 해주세욥");
        //     //id edit에 포커스 가게 하면 완벽
        //     return false;
        // }else if(pw === "" || pw.length>12){
        //     alert("비번은 12이하의 길이로 해주세욥");
        //     return false;
        // }else if(pwChk !== pw){
        //     alert("비밀번호가 일치하지 않습니다.");
        //     return false;
        // }else if(email===""){
        //     alert("이메일을 입력해주세요.");
        //     //이메일 @등 형식체크필요
        //     return false;
        // }
        // axios(
        //     {
        //         url: '/member/saveSignUp',
        //         method:'post',
        //         data:{
        //             id:id,
        //             pw:pw,
        //             email: email
        //         },
        //         baseURL:'http://localhost:8080',
        //         withCredentials:true,
        //     }
        // ).then(function (response){
        //     console.log(response)
        //     if(response.data === 0){
        //         alert("Sorry, There was an error. Please try again");
        //     }else{
        //         alert("you have successfully created new board");
        //         PageToHome();
        //     }
        // });
    }

    function IdChk(){
        //아이디 중복체크
    }

    return (
        <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              {/* <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button> */}
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="ID" type="text" name="id" onChange={handleChange} value={id}/>
                  <button color="secondary" onClick={IdChk}>중복체크</button>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email" 
                    onChange={handleChange} 
                    value={email}
                    //autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="pw" 
                    onChange={handleChange} 
                    value={pw}
                    //autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password check"
                    type="password"
                    name="pwChk" 
                    onChange={handleChange} 
                    value={pwChk}
                    //autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" onClick={SaveSignUp}>
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>

    );
}
export default SignUp;