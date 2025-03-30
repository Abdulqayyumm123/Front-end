import React, { useState } from 'react';
import { Carousel , Button} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import PostAd from "./postAd";


function Carousels() {
  const [showPostAd, setShowPostAd] = useState(false); 
  const navigate = useNavigate()
    return (
        <>
      <Carousel className="custom-carousel" >
      <Carousel.Item>
    <img
      className="d-block w-100"
      src="./images/image.png"
      alt="First slide"
      style={{ width: '1200px', height: '500px', objectFit: 'cover' }}
    />
    <Carousel.Caption style={{ marginBottom: '7rem', marginRight: '24rem' }}>
      <div className="caption-wrapper-custom">
        <h3>Shift Into Gear:<br />Your Destination<br />for Car Excellence</h3>
        <p style={{ marginLeft: '6rem' }}>Drive Your Dream: Find Your Perfect Car Today</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="success"onClick={() => navigate(`search-results`)} >Search A Car</Button>
          <Button variant="primary" onClick={() => setShowPostAd(true)}>Post Advertisement</Button>
        </div>
      </div>
    </Carousel.Caption>
  </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/image1.png"
            alt="Second slide"
            style={{ width: '1200px', height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption  style={{marginBottom:'8.5rem',marginRight:'24rem'}}>
        <h3>Shift Into Gear:<br />Your Destination<br />for Car Excellence</h3>
        <p style={{marginLeft:'6rem'}}>Drive Your Dream: Find Your Perfect Car Today</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="success" style={{ marginRight: '10px' }}>Search A Car</Button>
        <Button variant="primary"onClick={() => setShowPostAd(true)}> Post Advertisement</Button>
  </div>
</Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <PostAd show={showPostAd} handleClose={() => setShowPostAd(false)} /> 
</>
    );
  }
  
  export default Carousels;
  
