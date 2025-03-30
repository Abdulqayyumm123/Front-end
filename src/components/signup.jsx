

import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { user } from "../slices/signup.slice";


const Signup = ({ show, handleClose }) => {
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [birthdate, setBirthdate] = useState("")
  let [contact, setContact] = useState("")
  let [image, setImage] = useState(null);
  let [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  let dispatch = useDispatch()
  // const { data } = useSelector((state) => state.Signup);


  const handleSubmit = async (e) => {
    e.preventDefault()
    const signupData = new FormData();
    signupData.append('name', name)
    signupData.append('email', email)
    signupData.append('password', password)
    signupData.append('birthdate', birthdate)
    signupData.append('contact', contact)
    signupData.append('image', image)
    console.log("Sending data:", signupData);
    dispatch(user(signupData));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className='fw-bold'>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="scrollable-form">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label >Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label >Birth date</Form.Label>
            <Form.Control type="date" onChange={(e) => setBirthdate(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Form.Label onChange={(e) => setContact(e.target.value)}>Contact Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter Contact number" onChange={(e) => setContact(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" width="100" />}
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit} >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>

    </Modal>
  );
};
export default Signup;