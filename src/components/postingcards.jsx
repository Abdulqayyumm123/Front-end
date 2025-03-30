
import { useEffect, useState } from 'react';
import { Col, Row,Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Posting() {
  let [data,setData] = useState([])
  const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch(" http://localhost:5000/api/v1/advertisement")
                const result = await response.json()
                setData(result.slice(-4).reverse())  
            }
            catch(err){
            console.log(err)
            }
        }
        fetchData();
    }
    )
return (
  <>
    <h1 className='text-success fw-bold  text-center my-3'>Latest Posting</h1>
    <Row className="my-4 mx-1 d-flex flex-wrap">
      {data.map((post) => (
        <Col className="col-md-6 col-sm-6">
          <Card className='mt-3'>
            {/* <Card.Img variant="top" src={ post.image != null ? `http://localhost:5000/public/images/${post.image}` : `http://localhost:5000/public/images/placeholder-img.jpg` } /> */}
            <Card.Img 
  variant="top" 
  src={post.image ? `http://localhost:5000/public/images/${post.image}` : `http://localhost:5000/public/images/placeholder-img.jpg`} 
  className="img-fluid"
  style={{ width: "100%", height: "400px", objectFit: "cover" }}
/>

            <Card.Title className='ms-3 mt-3'>{post.name}</Card.Title>
            <Card.Body>
              <Card.Text>{post.description}</Card.Text>
              <Button variant="success" onClick={()=>{navigate(`/posting/${post._id}`)}}>More Details</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>
);
}
export default Posting;

