import { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import EditForm from "./profileditform";
import EditPostForm from "./editpostform";
import { useDispatch, useSelector } from "react-redux";
import { deleteAd } from "../slices/postAd.slice";
import { useNavigate } from "react-router";


function Userdashboard(){  
  const [showEdit, setShowEdit] = useState(false);
  const [showPostEdit, setShowPostEdit] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});
  let [ads,setAds] = useState([])
  let [user,setUser] = useState({})
  let dispatch = useDispatch()
  let navigate = useNavigate()

    const { data } = useSelector((state) => state.Login)
    const { updated } = useSelector((state) => state.UpdateAd);
    const postState = useSelector((state) => state.PostAd);
    const error = postState?.error;
    useEffect(() => {
      if (error == "session expired") {
        alert("Your session has expired. Please login again.");
        navigate("/"); 
      }
    }, [error]);
     

    const userId = data?.currentuser?._id;
    console.log('Found User Id From State :' , userId)
    const token = data?.token
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;
        const response = await fetch(`http://localhost:5000/api/v1/users/uid/${userId}`);
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUser();
  }, [userId,updated]);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        if (!user || !user._id) return; 
        const response = await fetch(` http://localhost:5000/api/v1/advertisement`);
        const adsData = await response.json();
        console.log(adsData);
        const filteredAds = adsData.filter((ad) => ad.postedbyid._id == user._id);
        setAds(filteredAds.reverse());
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };
  
    fetchAds();
  }, [user , postState ]); // Runs only when user state changes

  const handleEditClick = (ad) => {
    setSelectedAd(ad);
    setShowPostEdit(true);
  };

  const handleDelete = (adId) => {
    dispatch(deleteAd({adId,token}));
  };

    return(
        
        <>
    <div className="image-container">
  <img
    className="d-block w-100 m-3"
    src="./images/image1.png"
    alt="First slide"
    style={{ height: "200px", objectFit: "cover", }}
  />
  <div className="text-overlay">
    <div className="green-bracket"></div>
    <h1>User Dashboard</h1>
  </div>
</div>
      
        <Row className="m-2">
        <Col md={4}>
      {/* Profile  */}
      <Card className="p-3">
        <Card.Img
          variant="top"
          src={`http://localhost:5000/public/images/${user.image}`}
          className=" mx-auto rounded-circle"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <Card.Body>
          <h3 className="text-success text-center">{user.name}</h3>
          <hr/>
          <Card.Text className="fw-bold">Email: {user.email}</Card.Text>
          <Card.Text className="fw-bold">Contact Number:   {user.contact}</Card.Text>
          <Card.Text className="fw-bold">Birth Date:  {new Date(user.birthdate).toLocaleDateString()}</Card.Text>
          <Button variant="success" className="me-2" onClick={() => setShowEdit(true)}>Edit Info</Button>
          {/* <Button variant="primary">Logout</Button> */}
        </Card.Body>
      </Card>
    </Col>
    {/* Post Advertisement */}
                <Col md={8}>
                <h2 className="text-success">Post Advertisement</h2>
                {ads.length > 0 ? (
            ads.map((ad) => (
              <Card key={ad._id} className="m-2">
                <Row className="m-1 d-flex align-items-center">
                  <Col md={3} className="text-center">
                    <Card.Img src={`http://localhost:5000/public/images/${ad.image}`} className="img-fluid" 
                       style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                  </Col>
                  <Col md={9}>
                    <Card.Title>{ad.name}</Card.Title>
                    <Card.Text>{ad.description}</Card.Text>
                    <Button variant="danger" onClick={() => handleDelete(ad._id)}>Delete</Button>
                    <Button onClick={() => handleEditClick(ad)}>Edit</Button>
                    <Button onClick={()=>{navigate(`/posting/${ad._id}`)}}>View More</Button>
                  </Col>
                </Row>
              </Card>
            ))
          ) : (
            <p>No advertisements.</p>
          )}
  
                </Col>
            </Row>
    {/* Models */}
    <EditForm id={user._id} show={showEdit} handleClose={() => setShowEdit(false)} />
    <EditPostForm show={showPostEdit} handleClose={() => setShowPostEdit(false)}  adId={selectedAd?._id} adData={selectedAd}/>  

        </>
    )
}
export default Userdashboard


