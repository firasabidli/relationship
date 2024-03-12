import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

function DeleteCulture({ cultureId , onDelete }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/culture/${cultureId}`);
      window.location.reload();
      handleClose(); 
    } catch (error) {
      console.error('Erreur lors de la suppression du Culture', error);
      
    }
  };

  return (
    <>
      <button type="button" className="btn btn-danger" onClick={handleShow}>
        <FaTrashAlt /> 
      </button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer cette Culture {cultureId} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCulture;