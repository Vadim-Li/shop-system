import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import PubSub from "pubsub-js";
import Col from "react-bootstrap/Col";
import { BASE_URI } from "../../../redux/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UpdateModal({ product }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedUpdateDate, setSelectedUpdateDate] = useState(new Date());

  const [name, setName] = useState(product.name);
  const [marketPrice, setMarketPrice] = useState(product.marketPrice);
  const [shopPrice, setShopPrice] = useState(product.shopPrice);
  const [num, setNum] = useState(product.num);
  const [imageName, setImageName] = useState(product.image);
  const [idescName, setIdescName] = useState(product.idesc);
  const [iflag, setIflag] = useState(product.iflag);
  const [status, setStatus] = useState(product.status);
  const [cid, setCid] = useState(product.cid);

  const handleSubmit = () => {
    axios
      .put(`${BASE_URI}/item/update`, {
        id: product.id,
        name,
        marketPrice,
        shopPrice,
        num,
        image: imageName,
        idesc: idescName,
        iflag,
        status,
        updateTime: selectedUpdateDate,
        cid,
      })
      .then((response) => {
        handleClose();
        PubSub.publish("product.updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    // 获取文件名
    const fileName = event.target.files[0].name;
    console.log("上传的文件名:", fileName);
    setImageName(fileName);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post(`${BASE_URI}/image/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("文件上传成功");
    } catch (error) {
      console.error("文件上传失败", error);
      alert("文件上传失败");
    }
  };

  const [fileIdesc, setFileIdesc] = useState(null);

  const handleFileIdescChange = (event) => {
    setFileIdesc(event.target.files[0]);

    // 获取文件名
    const fileName = event.target.files[0].name;
    console.log("上传的文件名:", fileName);
    setIdescName(fileName);
  };

  const handleFileIdescUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", fileIdesc);
      console.log(111);
      await axios.post(`${BASE_URI}/image/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("文件上传成功");
    } catch (error) {
      console.error("文件上传失败", error);
      alert("文件上传失败");
    }
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
          <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="name"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              {/* 用户名： */}
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

          {/* <!-- 密码 --> */}
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="marketPrice"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              {/* 密码： */}
              MarketPrice:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="marketPrice"
                placeholder="Please enter the marketPrice"
                value={marketPrice}
                onChange={(e) => setMarketPrice(e.target.value)}
              />
            </Col>
          </Form.Group>

          {/* 姓名 */}
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="shopPrice"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              {/* 姓名： */}
              ShopPrice:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="shopPrice"
                placeholder="Please enter the shopPrice"
                value={shopPrice}
                onChange={(e) => setShopPrice(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="num"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Num:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="num"
                placeholder="Please enter the num"
                value={num}
                onChange={(e) => setNum(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="image"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Image:
            </Form.Label>
            <Col className="col-7">
              {/* <Form.Control
                type="text"
                id="image"
                placeholder="Please enter phone image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              /> */}
              {product.image}
            </Col>
          </Form.Group>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="idesc"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Idesc:
            </Form.Label>
            <Col className="col-7">
              {/* <Form.Control
                type="text"
                id="idesc"
                placeholder="Please enter the idesc"
                value={idesc}
                onChange={(e) => setIdesc(e.target.value)}
              /> */}
              {product.idesc}
            </Col>
          </Form.Group>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="iflag"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Iflag:
            </Form.Label>
            <Col className="col-7">
              {/* <Form.Control
                type="text"
                id="iflag"
                placeholder="Please enter the iflag"
                value={iflag}
                onChange={(e) => setIflag(e.target.value)}
              /> */}
              <Form.Control
                as="select"
                value={iflag}
                onChange={(e) => setIflag(e.target.value)}
              >
                <option value="">Please select a iflag</option>
                <option value={1}>Popular Product</option>
                <option value={2}>Discounted Product</option>
              </Form.Control>
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
                <option value="">Please select a status</option>
                <option value={1}>Product on the shelves</option>
                <option value={2}>Product off the shelves</option>
                <option value={3}>Delete</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="updateTime"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              UpdateTime:
            </Form.Label>
            <Col className="col-7">
              <DatePicker
                selected={selectedUpdateDate}
                onChange={(date) => setSelectedUpdateDate(date)}
                dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSX" // 设置日期格式与Java的日期格式一致
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="cid"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              cid:
            </Form.Label>
            <Col className="col-7">
              {/* <Form.Control
                type="text"
                id="status"
                placeholder="Please enter the cid"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
              /> */}
              <Form.Control
                as="select"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
              >
                <option value="">Please select a cid</option>
                <option value={1}>Figures</option>
                <option value={2}>Digital</option>
                <option value={3}>Clothing</option>
                <option value={4}>Pillow</option>
                <option value={5}>Daily</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              className="col-form-label col-2 text-md-right"
              style={{ textAlign: "right" }}
            >
              Upload image:
            </Form.Label>
            <Col className="col-7">
              <Form.Control type="file" onChange={handleFileChange} />
            </Col>
            <Col className="col-3">
              <Button onClick={handleFileUpload}>Upload</Button>
            </Col>
          </Form.Group>

          <Form.Group className="form-group row mb-3">
            <Form.Label
              className="col-form-label col-2 text-md-right"
              style={{ textAlign: "right" }}
            >
              Upload idecs:
            </Form.Label>
            <Col className="col-7">
              <Form.Control type="file" onChange={handleFileIdescChange} />
            </Col>
            <Col className="col-3">
              <Button onClick={handleFileIdescUpload}>Upload</Button>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
              // handleFileUpload();
              // handleFileIdescUpload();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
