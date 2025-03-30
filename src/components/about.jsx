import { Col, Row } from "react-bootstrap";
import { GoCheck } from "react-icons/go";

function About(){
    let arr = [
        { 
            p: "PakClassified is a comprehensive online platform where users can browse, buy, sell, and compare cars",
            description: 'PakClassified is a comprehensive online platform for browsing, buying, selling, and comparing cars in Pakistan. It aims to provide a seamless experience for car enthusiasts and first-time buyers alike, offering customer support, technical assistance, and a channel for feedback and suggestions.',
        } 
     ]
    return(
        <>
        {/* <Row> */}
        <div className="image-container">
  <img
    className="d-block w-100 "
    src="./images/image1.png"
    alt="First slide"
    style={{ height: "200px", objectFit: "cover", }}
  />
  <div className="text-overlay">
    <div className="green-bracket"></div>
    <h1>About</h1>
  </div>
</div>
        {/* </Row> */}
           {
      arr.map((about) => (
            <Row className="m-3">
            <Col md={6}>

       <div className="image-grid">
      <img src="./images/image2.avif" alt="pic" className="image1" />
      <img src="./images/image3.avif" alt="pic" className="image" />
      <img src="./images/image4.avif" alt="pic" className="image1" />
      <img src="./images/image2.avif" alt="pic" className="image" />
    </div>
            </Col>
            <Col md={6}>
              <h3 className="text-dark fw-bold">{about.p}</h3>
              <p>{about.description}</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
              <li className="d-flex align-items-center">
                <GoCheck className="text-success me-2" size={20} />
                <span>Customer Support</span>
              </li>
              <li className="d-flex align-items-center">
                <GoCheck className="text-success me-2" size={20} />
                <span>Technical Assistance</span>
              </li>
              <li className="d-flex align-items-center">
                <GoCheck className="text-success me-2" size={20} />
                <span>Feedback and Suggestions</span>
              </li>
            </ul>
            </Col>
            </Row>
      
        
           
    )
    )}
        </>
    )
}
export default About;




