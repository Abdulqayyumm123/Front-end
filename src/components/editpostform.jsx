import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { editAd } from "../slices/postAd.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const EditPostForm = ({ show, handleClose, adId, adData }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  
  const { error } = useSelector((state)=> state.PostAd);
  useEffect(() => {
    if (error === "session expired") {
        alert("Your session has expired. Please log in again.");
        navigate("/");
    }
}, [error, navigate]);

  // State for form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [startson, setStartsOn] = useState("");
  const [endson, setEndsOn] = useState("");
  const [categoryid, setCategoryId] = useState("");
  const [cityareaid, setCityAreaId] = useState("");
  const [typeid, setTypeId] = useState("");
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [cityAreas, setCityAreas] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (adData) {
      console.log(adData)
      setName(adData.name || "");
      setPrice(adData.price || "");
      setDescription(adData.description || "");
      setFeatures(adData.features || "");
      setStartsOn(adData.startson ? adData.startson.split("T")[0] : "");
      setEndsOn(adData.endson ? adData.endson.split("T")[0] : "");
      setCategoryId(adData.categoryid || "");
      setCityAreaId(adData.cityid || "");
      setTypeId(adData.typeid || "");
    }
  }, [adData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, cityAreasRes, typesRes] = await Promise.all([
          fetch("http://localhost:5000/api/v1/categories"),
          fetch("http://localhost:5000/api/v1/cityarea"),
          fetch("http://localhost:5000/api/v1/types"),
        ]);

        const [categories, cityAreas, types] = await Promise.all([
          categoriesRes.json(),
          cityAreasRes.json(),
          typesRes.json(),
        ]);

        setCategories(categories);
        setCityAreas(cityAreas);
        setTypes(types);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);
  const { data } = useSelector((state) => state.Login);
  const token = data?.token;
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("name", name);
    updatedData.append("price", price);
    updatedData.append("description", description);
    updatedData.append("startson", startson);
    updatedData.append("endson", endson);
    updatedData.append("categoryid", categoryid);
    updatedData.append("cityid", cityareaid);
    updatedData.append("typeid", typeof typeid === "object" ? typeid._id : typeid);
    if (image) updatedData.append("image", image);

    dispatch(editAd({ adId, updatedData ,token}));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-success fw-bold">Edit Advertisement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>
            <Form.Control as="textarea" rows={3} value={features} onChange={(e) => setFeatures(e.target.value)} />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Starts On</Form.Label>
                <Form.Control type="date" value={startson} onChange={(e) => setStartsOn(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Ends On</Form.Label>
                <Form.Control type="date" value={endson} onChange={(e) => setEndsOn(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select value={categoryid} onChange={(e) => setCategoryId(e.target.value)}>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City Area</Form.Label>
                <Form.Select value={cityareaid} onChange={(e) => setCityAreaId(e.target.value)}>
                  {cityAreas.map((area) => (
                    <option key={area._id} value={area._id}>{area.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select value={typeid} onChange={(e) => setTypeId(e.target.value)}>
                  {types.map((type) => (
                    <option key={type._id} value={type._id}>{type.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Group>

          <Button variant="primary" type="submit">Save Changes</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPostForm;


// import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import { editAd } from "../slices/postAd.slice";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
// const EditAdModal = ({ show, handleClose, adId, adData }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { error } = useSelector((state)=> state.PostAd);
//   useEffect(() => {
//     if (error === "session expired") {
//         alert("Your session has expired. Please log in again.");
//         navigate("/");
//     }
// }, [error, navigate]);

//   // State for form fields
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [features, setFeatures] = useState("");
//   const [startson, setStartsOn] = useState("");
//   const [endson, setEndsOn] = useState("");
//   const [categoryid, setCategoryId] = useState("");
//   const [cityareaid, setCityAreaId] = useState("");
//   const [typeid, setTypeId] = useState("");
//   const [image, setImage] = useState(null);

//   // State for dropdown options
//   const [categories, setCategories] = useState([]);
//   const [cityAreas, setCityAreas] = useState([]);
//   const [types, setTypes] = useState([]);
//   // console.log(adData)
//   useEffect(() => {
//     if (adData) {
//       setName(adData.name);
//       setPrice(adData.price);
//       setDescription(adData.description);
//       setFeatures(adData.features);
//       // setStartsOn(adData.startson);
//       // setEndsOn(adData.endson);
//       setStartsOn(adData.startson ? adData.startson.split("T")[0] : "");
//       setEndsOn(adData.endson ? adData.endson.split("T")[0] : "");
//       setCategoryId(adData.categoryid);
//       setCityAreaId(adData.cityid._id);
//       setTypeId(adData.typeid._id);
//     }
//   }, [adData]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [categoriesRes, cityAreasRes, typesRes] = await Promise.all([
//           fetch("http://localhost:5000/api/v1/categories"),
//           fetch("http://localhost:5000/api/v1/cityarea"),
//           fetch("http://localhost:5000/api/v1/types"),
//         ]);

//         const [categories, cityAreas, types] = await Promise.all([
//           categoriesRes.json(),
//           cityAreasRes.json(),
//           typesRes.json(),
//         ]);

//         setCategories(categories);
//         setCityAreas(cityAreas);
//         setTypes(types);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const { data } = useSelector((state) => state.Login);
//   // console.log("Login State Fetched : ", data);
//   const token = data?.token;
//   // console.log("Token Extracted : ", token);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedData = new FormData();
//     updatedData.append("name", name);
//     updatedData.append("price", price);
//     updatedData.append("description", description);
//     updatedData.append("startson", startson);
//     updatedData.append("endson", endson);
//     updatedData.append("categoryid", categoryid);
//     updatedData.append("cityid", cityareaid);
//     updatedData.append("typeid", typeid);
//     if (image) updatedData.append("image", image);
//     console.log("Dispatching Edit Ad!");
//     dispatch(editAd({ "adId": adId, "updatedData": updatedData , "token" : token}));
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title className="text-success fw-bold">Edit Advertisement</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Price</Form.Label>
//             <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Features</Form.Label>
//             <Form.Control as="textarea" rows={3} value={features} onChange={(e) => setFeatures(e.target.value)} />
//           </Form.Group>

//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Starts On</Form.Label>
//                 <Form.Control type="date" value={startson} onChange={(e) => setStartsOn(e.target.value)} />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Ends On</Form.Label>
//                 <Form.Control type="date" value={endson} onChange={(e) => setEndsOn(e.target.value)} />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={4}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select value={categoryid} onChange={(e) => setCategoryId(e.target.value)}>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>{cat.name}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={4}>
//               <Form.Group className="mb-3">
//                 <Form.Label>City Area</Form.Label>
//                 <Form.Select value={cityareaid} onChange={(e) => setCityAreaId(e.target.value)}>
//                   {cityAreas.map((area) => (
//                     <option key={area._id} value={area._id}>{area.name}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={4}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Type</Form.Label>
//                 <Form.Select value={typeid} onChange={(e) => setTypeId(e.target.value)}>
//                   {types.map((type) => (
//                     <option key={type._id} value={type._id}>{type.name}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Form.Group className="mb-3">
//             <Form.Label>Image</Form.Label>
//             <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
//           </Form.Group>

//           <Button variant="primary" type="submit">Save Changes</Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default EditAdModal;