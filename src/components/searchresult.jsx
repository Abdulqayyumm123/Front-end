import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Search from "./searchbar";
 function SearchResults() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword")?.toLowerCase() || "";
  const cid = queryParams.get("category") || "";
  const cityId = queryParams.get("city") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/advertisement`);
        const ads = await response.json();

        // Use filters: Category, City, and Keyword
        let filteredAds = ads;

        if (cid) {
          filteredAds = filteredAds.filter(ad => ad.categoryid === cid);
        }
        if (cityId) {
          filteredAds = filteredAds.filter(ad => ad.cityareaid === cityId);
        }
        if (keyword) {
          filteredAds = filteredAds.filter(ad => ad.name.toLowerCase().includes(keyword));
        }

        setData(filteredAds);
      } catch (err) {
        console.log("Error fetching ads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cid, cityId, keyword]);

  return (
    <>
        <Search/>
    <Container className="mt-4">
      <h2 className="text-center text-success fw-bold">Search Results</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-danger">No posts found.</p>
      ) : (
        data.map((post) => (
          <Card key={post._id} className="m-3">
            <Row className="m-3">
              <Col md={3}>
                <Card.Img
                  style={{ height: "200px", objectFit: "cover" }}
                  src={ post.image != null ? `http://localhost:5000/public/images/${post.image}` : `http://localhost:5000/public/images/placeholder-img.jpg` }
                  alt={post.name}
                />
              </Col>
              <Col md={9}>
                <Card.Body>
                  <Card.Title className="text-success fw-bold">{post.name}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <Button variant="success" onClick={() => navigate(`/posting/${post._id}`)}>
                    More Detail
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))
      )}
    </Container>
    </>
  );
}
export default SearchResults