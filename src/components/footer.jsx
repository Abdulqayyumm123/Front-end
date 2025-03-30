
import React from "react";
import { Container,Row,Col,Form,InputGroup,Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';

function Footer(){
  return(
    <>
    <footer style={{ backgroundColor: '#343a40', color: '#fff', padding: '20px 0' }}>
   <Container>
    <Row className='mt-5'>
      <Col md={3}>
      <h5>Company</h5>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
      </p>
      </Col>
      <Col md={3}>
      <h5>Quick Links</h5>
      <ul style={{ listStyle: 'none', padding: 0 ,color: '#fff', textDecoration: 'none'}}>
              <li><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>&gt; About Us</a></li>
              <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>&gt; Contact Us</a></li>
              <li><a href="/privacy" style={{ color: '#fff', textDecoration: 'none' }}>&gt; Privacy Policy</a></li>
              <li><a href="/terms" style={{ color: '#fff', textDecoration: 'none' }}>&gt; Terms & Condition</a></li>
            </ul>
      </Col>
      <Col md={3}>
        <h5>Contact</h5>
            <p>
              <FaMapMarkerAlt /> Ferozepur Road, Gulberg III, Lahore
            </p>
            <p>
              <FaPhoneAlt /> 0300 1 387 387
            </p>
            <p>
              <FaEnvelope /> evs@gmail.com
            </p>
            <div>

             <a href="#" style={{ color: '#fff', margin: '0 5px' }}><FaTwitter /></a>
              <a href="#" style={{ color: '#fff', margin: '0 5px' }}><FaFacebook /></a>
              <a href="#" style={{ color: '#fff', margin: '0 5px' }}><FaYoutube /></a>
              <a href="#" style={{ color: '#fff', margin: '0 5px' }}><FaLinkedin /></a>
            </div>
      </Col>
      <Col md={3}>
      <h5>Newsletter</h5>
      <p>Subscribe to our newsletter for the latest updates and news.</p>
      <Form>
  <InputGroup>
    <Form.Control 
      type="email" 
      placeholder="Your email" 
      style={{ backgroundColor: '#343a40', color: 'white', border: '1px solid #555' }} 
    />
    <Button variant="success" type="submit"> Sign Up </Button>
  </InputGroup>
</Form>
      </Col>
    </Row>
      <hr/>
<Row className="mt-4">
  <Col md={6}>
  <p> <a href="#" style={{ color: '#fff' }}>©PakClassified</a>  All Right Reserved. Designed By <a href="#" style={{ color: '#fff' }}>Team EVS</a></p>      
  </Col>
  <Col md={6} className="text-md-right">
  <ul style={{ listStyle: 'none', padding: 0, display: 'inline-flex' }}>
              <li style={{ margin: '0 10px' }}><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
              <li style={{ margin: '0 10px' }}><a href="/cookies" style={{ color: '#fff', textDecoration: 'none' }}>Cookies</a></li>
              <li style={{ margin: '0 10px' }}><a href="/help" style={{ color: '#fff', textDecoration: 'none' }}>Help</a></li>
              <li style={{ margin: '0 10px' }}><a href="/faqs" style={{ color: '#fff', textDecoration: 'none' }}>FAQs</a></li>
            </ul>  
  </Col>
</Row>
   </Container>
    </footer>
    </>
  )
}
export default Footer;