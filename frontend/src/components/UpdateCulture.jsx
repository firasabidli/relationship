import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';

function UpdateCulture({ cultureId }) {
  const [show, setShow] = useState(false);
  const [culture, setCulture] = useState([]);
  const [saisons, setSaisons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSaison, setSelectedSaison] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [image, setImage] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [stocks, setStocks] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      fetchCulture();
      fetchSaisons();
      fetchCategories();
      fetchMaterials();
      fetchStocks();
    }
  }, [show]);

  const fetchCulture = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/culture/${cultureId}`);
      const data = response.data.data;
      setCulture(data);
      setSelectedSaison(data.saison._id);
      setSelectedCategorie(data.categorie._id);
      setSelectedMaterials(data.materiels.map(material => material._id));
      setSelectedStocks(data.stocks.map(stock => stock._id));
    } catch (error) {
      console.error('Error fetching culture:', error);
    }
  };

  const fetchSaisons = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/saison");
      setSaisons(response.data.data);
    } catch (error) {
      console.error("Error fetching saisons:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/categorie");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/materiel");
      setMaterials(response.data.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/stock");
      setStocks(response.data.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      formData.append('saisonId', selectedSaison);
      formData.append('categorieId', selectedCategorie);
      selectedMaterials.forEach(material => {
        formData.append('materials', material);
      });
      selectedStocks.forEach(stock => {
        formData.append('stocks', stock);
      });
      formData.append('image_culture', image);
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

              <Form.Group className="mb-3" controlId="saison">
                <Form.Label>Saison</Form.Label>
                <Form.Control as="select" value={selectedSaison} onChange={(e) => setSelectedSaison(e.target.value)}>
                  <option value="">Sélectionnez une saison</option>
                  {saisons.map(saison => (
                    <option key={saison._id} value={saison._id}>{saison.nom_saison}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="categorie">
                <Form.Label>Catégorie</Form.Label>
                <Form.Control as="select" value={selectedCategorie} onChange={(e) => setSelectedCategorie(e.target.value)}>
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map(categorie => (
                    <option key={categorie._id} value={categorie._id}>{categorie.nom_categorie}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="materials">
                <Form.Label>Matériaux</Form.Label>
                <Form.Control as="select" multiple value={selectedMaterials} onChange={(e) => setSelectedMaterials(Array.from(e.target.selectedOptions, (option) => option.value))}>
                  {materials.map(material => (
                    <option key={material._id} value={material._id}>{material.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="stocks">
                <Form.Label>Stocks</Form.Label>
                <Form.Control as="select" multiple value={selectedStocks} onChange={(e) => setSelectedStocks(Array.from(e.target.selectedOptions, (option) => option.value))}>
                  {stocks.map(stock => (
                    <option key={stock._id} value={stock._id}>{stock.name}</option>
                  ))}
                </Form.Control>
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
