
import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { useParams } from 'react-router-dom'

function PostingDetail(){
  let { id } = useParams() 
  let [post,setPost] = useState({})
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await fetch(`http://localhost:5000/api/v1/advertisement`)
                const result = await response.json()
                setPost(result.find(p => p._id === id));   
            }
            catch(err){
            console.log(err)
            }
        }
        fetchData();
    }
    )
    return(
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
    <h1>Posting Details</h1>
  </div>
</div>

    <Row className="my-4 mx-1 d-flex flex-wrap">
   
          {/* {data.map((post) => ( */}
      <Col className="col">
        <Card className='mt-3'>
          <Card.Body>
          
          <Card.Img variant="top" className="w-100" src='/images/image3.avif' />
          <Card.Title>{post.name}</Card.Title>
          <Card.Text>Price$: {post.price}</Card.Text>
          <Card.Text>Start Date: {new Date(post.startson).toLocaleDateString()}</Card.Text>
          <Card.Text>End Date: {new Date(post.endson).toLocaleDateString()}</Card.Text>
           <Card.Text>{post.postedbyid?.name}</Card.Text>
          <Card.Text>{post.statusid?.name}</Card.Text>
         {/* <Card.Text>{post.typeid}</Card.Text>
          <Card.Text>{post.categoryid}</Card.Text> */}
          </Card.Body>
        </Card>
      </Col>
        {/* ))} */}
  </Row>
        </>
    )
}  
export default PostingDetail 