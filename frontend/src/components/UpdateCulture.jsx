import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';

function UpdateCulture({ cultureId }) {
  const [show, setShow] = useState(false);
  const [culture, setCulture] = useState(null);
  const [image, setImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchCulture = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/culture/${cultureId}`);
      setCulture(response.data.data);
    } catch (error) {
      console.error('Error fetching culture:', error);
    }
  };

  useEffect(() => {
    if (show) {
      fetchCulture();
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      formData.append('image_culture', image); // Ajoutez l'image à formData
      const result = await axios.put(`http://localhost:3001/api/culture/${cultureId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      window.location.reload();
      handleClose();
      alert(result.data.message);
    } catch (error) {
      console.error('Error updating culture:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleShow}>
        Modifier
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Culture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {culture && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nom_culture">
                <FloatingLabel controlId="floatingTextarea2" label="Nom Culture:">
                  <Form.Control
                    type="text"
                    placeholder="Nom Culture"
                    defaultValue={culture.nom_culture}
                    name="nom_culture"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="date_plantation">
                <FloatingLabel controlId="floatingTextarea2" label="Date Plantation">
                  <Form.Control
                    type='date'
                    placeholder="Date Plantation"
                    defaultValue={culture.date_plantation}
                    name="date_plantation"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="date_recolte">
                <FloatingLabel controlId="floatingTextarea2" label="Date Recolte">
                  <Form.Control
                    type='date'
                    placeholder="Date Recolte"
                    defaultValue={culture.date_recolte}
                    name="date_recolte"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="methode_irrigation">
                <FloatingLabel controlId="floatingTextarea2" label="Methode Irrigation">
                  <Form.Control
                    type='text'
                    placeholder="Methode Irrigation"
                    defaultValue={culture.methode_irrigation}
                    name="methode_irrigation"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="quantite_eau_irrigation">
                <FloatingLabel controlId="floatingTextarea2" label="Quantité Eau Irrigation">
                  <Form.Control
                    type='number'
                    placeholder="Quantité Eau Irrigation"
                    defaultValue={culture.quantite_eau_irrigation}
                    name="quantite_eau_irrigation"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="frequence_surveillance">
                <FloatingLabel controlId="floatingTextarea2" label="Fréquence Surveillance">
                  <Form.Control
                    type="text"
                    placeholder="Fréquence Surveillance"
                    defaultValue={culture.frequence_surveillance}
                    name="frequence_surveillance"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="date_derniere_surveillance">
                <FloatingLabel controlId="floatingTextarea2" label="Date Derniere Surveillance">
                  <Form.Control
                    type='date'
                    placeholder="Date Derniere Surveillance"
                    defaultValue={culture.date_derniere_surveillance}
                    name="date_derniere_surveillance"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="image_culture">
                <Form.Label>Image Culture:</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="remarques">
                <FloatingLabel controlId="floatingTextarea2" label="Remarques">
                  <Form.Control
                    as="textarea"
                    placeholder="Remarques"
                    defaultValue={culture.remarques}
                    style={{ height: '100px' }}
                    name="remarques"
                  />
                </FloatingLabel>
              </Form.Group>

              <Button variant="primary" type="submit">
                Enregistrer
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateCulture;
