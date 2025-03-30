
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
function Categories() {
  let navigate = useNavigate();
  let { cid } = useParams();
  let [data, setData] = useState([])
  let [category , setCategory] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(` http://localhost:5000/api/v1/advertisement`)
        const result = await response.json()
        const catRes = await fetch("http://localhost:5000/api/v1/categories")
        const catResult = await catRes.json()
        setCategory(catResult.find(cat => cat._id === cid))
        setData(result.filter(ad => ad.categoryid === cid))
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchData();
  },[cid]
  )
  return (
    <>
      {/* <Row> */}
      <div className="image-container">
  <img
    className="d-block w-100"
    src={`http://localhost:5000/public/images/${category.image}`}
    alt="First slide"
    style={{ height: "200px", objectFit: "cover" }}
  />
  <div className="text-overlay">
    <div className="green-bracket"></div>
    <h1>{category.name}</h1>
  </div>
</div>
      {/* </Row> */}
      <h1 className="text-success text-center">Posts in { category.name }</h1>
      {
        data.map((post) => (
          <Card className="m-3">
            <Row className=" m-3">
              <Col md={3}>
                <Card.Img src={ post.image != null ? `http://localhost:5000/public/images/${post.image}` : `http://localhost:5000/public/images/placeholder-img.jpg` }/>
              </Col>
              <Col md={9}>
                <Card.Body>

                  <Card.Title className="text-success fw-bold">{post.name}</Card.Title>
                  <Card.Text>{post.p}</Card.Text>
                  <Card.Text>{post.description}</Card.Text>
                  <Button variant="success" onClick={() => { navigate(`/posting/${post._id}`); }}>More Detail</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )
        )}
    </>
  )
}
export default Categories;

















