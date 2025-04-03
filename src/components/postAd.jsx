import React, { useEffect, useState } from "react";
import { Modal, Button, Form,Row,Col } from "react-bootstrap";
import { postAd } from '../slices/postAd.slice'
import { useDispatch, useSelector } from "react-redux"


function PostAd({ show, handleClose }) {
  let [categories,setCategories]= useState([])
  let [cityAreas,setCityAreas]= useState([])
  let [types,setTypes]= useState([])
  const loginState = useSelector((state)=>state.Login)
  const userId = loginState?.data?.currentuser?._id || ""
  // console.log("Current User : " , userId);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    startson: "",
    endson: "",
    postedbyid: "" ,
    categoryid: "",
    cityareaid: "",
    typeid: "",
    image: null,
  });
  useEffect(()=>{
   if(userId){
    setFormData((prev)=>({...prev , postedbyid:userId}))
   }
  },[userId])
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const [cAtegories,cItyareas,tYpes] = await Promise.all([
          fetch("http://localhost:5000/api/v1/categories"),
          fetch("http://localhost:5000/api/v1/cityarea"),
          fetch("http://localhost:5000/api/v1/types"),
        ])
        

        const [categoryData, cityData, typeData] = await Promise.all([
          cAtegories.json(),
          cItyareas.json(),
          tYpes.json(),
        ]);

        setCategories(categoryData);
        setCityAreas(cityData);
        setTypes(typeData);
      } catch (error) {
        console.error("Failed", error);
      }
     
    }
    fetchData()
  },[])
  const handleInputChange=(e)=>{
    const {name,value,type,files}=e.target;
    setFormData((prev)=>({
      ...prev,
      [name]: type==="file"?files[0]:value
    }))
  }
  let dispatch = useDispatch()
  const handleSubmit =async (e) => {
  e.preventDefault()
  const adData = new FormData()
  adData.append('name' , formData.name)
  adData.append('description' , formData.description)
  adData.append('price' , formData.price)
  adData.append('features' , formData.features)
  adData.append('startson' , formData.startson)
  adData.append('endson' , formData.endson)
  adData.append('categoryid' , formData.categoryid)
  adData.append('cityid' , formData.cityareaid)
  adData.append('typeid' , formData.typeid)
  adData.append('image' , formData.image)
  adData.append('postedbyid' , formData.postedbyid)
  console.log("Sending Data :" , formData)
  dispatch(postAd(adData));
  handleClose(); 
};
  return (
    <>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-success fw-bold">Post Advertisement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="scrollable-form">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Enter price" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter description" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>
            <Form.Control as="textarea" rows={3} name="features" value={formData.features} onChange={handleInputChange} placeholder="Enter features" />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Starts On</Form.Label>
                <Form.Control type="date" name="startson" value={formData.startson} onChange={handleInputChange} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Ends On</Form.Label>
                <Form.Control type="date" name="endson" value={formData.endson} onChange={handleInputChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="categoryid" className="bg-success text-white" value={formData.categoryid} onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City Area</Form.Label>
                <Form.Select name="cityareaid" className="bg-success text-white" value={formData.cityareaid} onChange={handleInputChange}>
                  <option value="">Select City Area</option>
                  {cityAreas.map((area) => (
                    <option key={area._id} value={area._id}>{area.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select name="typeid" className="bg-success text-white" value={formData.typeid} onChange={handleInputChange}>
                  <option value="">Select Type</option>
                  {types.map((type) => (
                    <option key={type._id} value={type._id}>{type.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleInputChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Post Advertisement
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

    </>
  );
}

export default PostAd;
