import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function DetailsCulture({ cultureId }) {
  const [show, setShow] = useState(false);
  const [culture, setCulture] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    fetchCulture();
  };

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

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Voir détails
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de la culture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {culture && (
            <div>
                {culture.image_culture && (
               <img
               src={require(`../images/${culture.image_culture}`)}
               height={100}
               width={100}
             />
              )}
              <p>Nom de la culture: {culture.nom_culture}</p>
              <p>Date de plantation: {culture.date_plantation}</p>
              <p>Date de récolte: {culture.date_recolte}</p>
              <p>Méthode d'irrigation: {culture.methode_irrigation}</p>
              <p>Quantité d'eau d'irrigation: {culture.quantite_eau_irrigation}</p>
              <p>Fréquence de surveillance: {culture.frequence_surveillance}</p>
              <p>Date de dernière surveillance: {culture.date_derniere_surveillance}</p>
              <p>Remarques: {culture.remarques}</p>
              
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailsCulture;
