   
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [categories, setCategories] = useState([]);
  const [cityAreas, setCityAreas] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [cityAreaId, setCityAreaId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const searchData = async () => {
      try {
        const [categoriesRes, cityAreasRes] = await Promise.all([
          fetch("http://localhost:5000/api/v1/categories"),
          fetch("http://localhost:5000/api/v1/cityarea"),
        ]);

        const [categories, cityAreas] = await Promise.all([
          categoriesRes.json(),
          cityAreasRes.json(),
        ]);

        setCategories(categories);
        setCityAreas(cityAreas);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    searchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?keyword=${keyword}&category=${categoryId}&city=${cityAreaId}`);
  };

  return (
    <Container fluid>
      <Row className="search-row">
        <Col md={12}>
          <Form className="search-form" onSubmit={handleSearch}>
            <Row>
              <Col xs={12} md={3}>
                <Form.Control
                  type="text"
                  placeholder="Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={3}>
                <Form.Select value={cityAreaId} onChange={(e) => setCityAreaId(e.target.value)}>
                  <option value="">Select City Area</option>
                  {cityAreas.map((area) => (
                    <option key={area._id} value={area._id}>{area.name}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={3} className="d-grid">
                <Button variant="dark" type="submit">
                  <HiMagnifyingGlassCircle size={25} /> Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}


export default Searchbar