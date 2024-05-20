import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { BASE_URI } from "../../../redux/constant";
import PubSub from "pubsub-js";

function AddModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 追加状态用于控制添加成功后的提示信息显示和隐藏
  const [isShowSuccessTip, setIsShowSuccessTip] = useState(false);

  const name = useRef();
  const status = useRef();
  const menuClick = useRef();

  const handleAddItemCatClick = () => {
    axios
      .post(`${BASE_URI}/itemCat/save`, {
        name: name.current.value,
        status: status.current.value,
        menuClick: menuClick.current.value,
      })
      .then((response) => {
        handleClose();
        PubSub.publish("itemCat.updated");
        // 添加成功后显示提示信息，并在3秒后隐藏
        setIsShowSuccessTip(true);
        setTimeout(() => {
          setIsShowSuccessTip(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        //   className="btn-sm"
        variant="primary"
        onClick={handleShow}
        style={{ borderRadius: "0px", marginLeft: "10px", marginRight: "10px" }}
      >
        Add
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add product category</Modal.Title>
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
                ref={name}
              />
            </Col>
          </Form.Group>
          {/* email */}
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
                ref={status}
              /> */}
              <Form.Control as="select" ref={status}>
                <option value="">Please select a status</option>
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
              {/* 手机号： */}
              MenuClick:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="menuClick"
                placeholder="Please enter menuClick"
                ref={menuClick}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddItemCatClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {isShowSuccessTip && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
          style={{
            height: "38px",
            margin: "0px",
            padding: "2px 10px 0px 10px",
          }}
        >
          <strong style={{ marginRight: "10px" }}>Added successfully!</strong>
          <Button
            type="button"
            className="close btn-sm"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setIsShowSuccessTip(false)}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
      )}
    </>
  );
}

export default AddModal;
