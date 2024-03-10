import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';

function CreateCulture({ OnCreate }) {
  const [show, setShow] = useState(false);

  const [nom_culture, setNomCulture] = useState("");
  const [date_plantation, setDatePlantation] = useState("");
  const [date_recolte, setDateRecolte] = useState("");
  const [methode_irrigation, setMethodeIrrigation] = useState("");
  const [quantite_eau_irrigation, setQuantiteEauIrrigation] = useState("");
  const [frequence_surveillance, setFrequenceSurveillance] = useState("");
  const [date_derniere_surveillance, setDateDerniereSurveillance] = useState("");
  const [image_culture, setImageCulture] = useState(null);
  const [remarques, setRemarques] = useState("");
  
 


  const handleClose = () => {
    setShow(false);
  setNomCulture('');
  setDatePlantation('');
  setDateRecolte('');
  setMethodeIrrigation('');
  setQuantiteEauIrrigation('');
  setFrequenceSurveillance('');
  setDateDerniereSurveillance('');
  setImageCulture(null);
  setRemarques('');

  };

  const handleShow = () => setShow(true);

  const submitCulture = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom_culture", nom_culture);
    formData.append("date_plantation", date_plantation);
    formData.append("date_recolte", date_recolte);
    formData.append("methode_irrigation", methode_irrigation);
    formData.append("quantite_eau_irrigation", quantite_eau_irrigation);
    formData.append("frequence_surveillance", frequence_surveillance);
    formData.append("date_derniere_surveillance", date_derniere_surveillance);
    formData.append("image_culture", image_culture);
    formData.append("remarques", remarques);

    try {
      const result = await axios.post(
        "http://localhost:3001/api/culture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      window.location.reload();
      console.log(result);
      // Refresh Culture after successful upload
      if (result.data.success) {
        
        handleClose(); 
        alert(result.data.message);
      }
    } catch (error) {
      console.error("Error uploading Culture:", error);
    }
  };
  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImageCulture(e.target.files[0]);
  };


  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleShow}>
        Ajouter Culture
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Culture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
          <Form onSubmit={submitCulture} id="form">
            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Culture:">
                <Form.Control
                  type="text"
                  placeholder="Nom Culture"
                  value={nom_culture}
                  onChange={(e) => setNomCulture(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date_plantation">
              <FloatingLabel controlId="floatingTextarea2" label="Date Plantation">
                <Form.Control
                  type='date'
                  placeholder="date_plantation"
                  value={date_plantation}
                  onChange={(e) => setDatePlantation(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date_recolte">
              <FloatingLabel controlId="floatingTextarea2" label="Date Recolte">
                <Form.Control
                  type='date'
                  placeholder="date_recolte"
                  value={date_recolte}
                  onChange={(e) => setDateRecolte(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="methode_irrigation">
              <FloatingLabel controlId="floatingTextarea2" label="Methode Irrigation">
                <Form.Control
                  type='text'
                  placeholder="methode_irrigation"
                  value={methode_irrigation}
                  onChange={(e) => setMethodeIrrigation(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="quantite_eau_irrigation">
              <FloatingLabel controlId="floatingTextarea2" label="Quantité Eau Irrigation">
                <Form.Control
                  type='Number'
                  placeholder="quantite_eau_irrigation"
                  value={quantite_eau_irrigation}
                  onChange={(e) => setQuantiteEauIrrigation(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="frequence_surveillance">
              <FloatingLabel controlId="floatingTextarea2" label="Fréquence Surveillance:">
                <Form.Control
                  type="text"
                  placeholder=" Fréquence Surveillance"
                  value={frequence_surveillance}
                  onChange={(e) => setFrequenceSurveillance(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date_derniere_surveillance">
              <FloatingLabel controlId="floatingTextarea2" label="Date Derniere Surveillance">
                <Form.Control
                  type='date'
                  placeholder="Date Derniere Surveillance"
                  value={date_derniere_surveillance}
                  onChange={(e) => setDateDerniereSurveillance(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel controlId="floatingTextarea2" label="Image Culture:">
                <Form.Control
                  type="file"
                  
                  
                  accept="image/*" onChange={onInputChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="remarques">
              <FloatingLabel controlId="floatingTextarea2" label="Remarquese:">
                <Form.Control
                  type="text"
                  placeholder="Remarques"
                  value={remarques}
                  onChange={(e) => setRemarques(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit" form="form"> Submit </Button>
        </Modal.Footer>
      </Modal>
   
    </>
  );
}

export default CreateCulture;