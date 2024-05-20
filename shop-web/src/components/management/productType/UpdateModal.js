import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import PubSub from "pubsub-js";
import Col from "react-bootstrap/Col";
import { BASE_URI } from "../../../redux/constant";

function UpdateModal({ productType }) {
  const [show, setShow] = useState(false);

  const [name, setName] = useState(productType.name);
  const [status, setStatus] = useState(productType.status);
  const [menuClick, setMenuClick] = useState(productType.menuClick);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    axios
      .put(`${BASE_URI}/itemCat/update`, {
        cid: productType.cid,
        name,
        status,
        menuClick,
      })
      .then((response) => {
        handleClose();
        PubSub.publish("itemCat.updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        className="btn btn-sm"
        variant="primary"
        onClick={handleShow}
        style={{ marginRight: "10px" }}
      >
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit productType</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="name"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Name:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="name"
                placeholder="Please enter the name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="status"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Status:
            </Form.Label>
            <Col className="col-7">
              {/* <Form.Control
                type="text"
                id="status"
                placeholder="Please enter the status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              /> */}
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={1}>Normal</option>
                <option value={2}>Delete</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="menuClick"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              MenuClick:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="menuClick"
                placeholder="Please enter menuClick"
                value={menuClick}
                onChange={(e) => setMenuClick(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
