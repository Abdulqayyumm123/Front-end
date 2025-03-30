
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateAd } from "../slices/editinfoslice";
import { useState } from "react";


const EditForm = ({id , show, handleClose }) => {
  let [name,setName] = useState("")
  // let [email,setEmail] = useState("")
  let [contact,setContact] = useState("")
  let [birthdate,setBirthdate] = useState("")

  let dispatch = useDispatch()
  const { data } = useSelector((state) => state.UpdateAd);
  const EditData = {
    name,
    // email,
    contact,
    birthdate
  };
    const handleSubmit =async (e) => {
    e.preventDefault()
    dispatch(updateAd({"id" : id , "updatedData" : EditData}));
    handleClose(); 
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title className='fw-bold'>Edit User Information</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
      <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name"  onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group> */}

        <Form.Group>
           <Form.Label>Contact Number</Form.Label>
           <Form.Control type="text" placeholder="Enter Contact number" onChange={(e)=>setContact(e.target.value)}/>
         </Form.Group>

        <Form.Group>
           <Form.Label>Birth date</Form.Label>
           <Form.Control type="date"  onChange={(e)=>setBirthdate(e.target.value)}/>
         </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save Change
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
  );
};

export default EditForm;