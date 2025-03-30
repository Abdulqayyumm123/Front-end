import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/login.slice";

const Login = ({ show, handleClose }) => {
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let dispatch = useDispatch()
  const {data} = useSelector((state)=>state.Login)
  const loginData = {
    email,
    password

  }
  const  handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch(login(loginData))
    console.log(loginData)
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose} centered>
       <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>Login</Modal.Title>
         </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>

             <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"onChange={(e)=>setPassword(e.target.value)} />
             </Form.Group>

             <Button variant="primary" type="submit" onClick={handleSubmit} >
              Login
            </Button>
          </Form>
        </Modal.Body>
    </Modal>
  );
};

export default Login;




