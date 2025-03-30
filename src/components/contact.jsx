import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

function Contact() {
  return (
    <>
    
    <div className="image-container">
  <img
    className="d-block w-100"
    src="./images/image1.png"
    alt="First slide"
    style={{ height: "200px", objectFit: "cover" }}
  />
  <div className="text-overlay">
    <div className="green-bracket"></div>
    <h1>Contact</h1>
  </div>
</div>
     <h2 className="text-center m-4">Contact For Any Query</h2>
     <Row className="m-2">
  <Col md={4}>
    <Container fluid className="m-2 bg-light text-dark p-3 d-flex align-items-center">
      <div className="icon-box d-flex justify-content-center align-items-center">
        <FaMapMarkerAlt className="text-success" />
      </div>
      <span className="ms-2">Gulberg III, Lahore</span>
    </Container>
  </Col>
  <Col md={4}>
    <Container fluid className="m-2 bg-light text-dark p-3 d-flex align-items-center">
      <div className="icon-box d-flex justify-content-center align-items-center">
        <FaEnvelope className="text-success" />
      </div>
      <span className="ms-2">evs@gmail.com</span>
    </Container>
  </Col>
  <Col md={4}>
    <Container fluid className="m-2 bg-light text-dark p-3 d-flex align-items-center">
      <div className="icon-box d-flex justify-content-center align-items-center">
        <FaPhone className="text-success" />
      </div>
      <span className="ms-2">0300 1 397 387</span>
    </Container>
  </Col>
</Row>
        <Container fluid>
      <Row className="m-2">
        <Col md={6}>
          {/* Map */}
        </Col>
        <Col md={6}>
          <p>
            For any inquiries, assistance, or feedback, please fill out our contact form below. 
            Our team is committed to responding promptly to ensure your experience with PakClassified is exceptional.
          </p>
          <Row>
            <Col md={6}>
              <Form.Control type="text" placeholder="Your Name" className="mb-2" />
            </Col>
            <Col md={6}>
              <Form.Control type="email" placeholder="Your Email" className="mb-2" />
            </Col>
          </Row>
          <Form.Control type="text" placeholder="Subject" className="mb-2" />
          <Form.Control as="textarea" rows={3} placeholder="Leave a message here" className="mb-3" />
          <Button variant="success" className="w-100">Send Message</Button>
        </Col>
      </Row>
    </Container>
        </>
  );
}

export default Contact;
