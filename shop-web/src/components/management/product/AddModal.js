import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { BASE_URI } from "../../../redux/constant";
import PubSub from "pubsub-js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "react-bootstrap/Image";
import { connect } from "react-redux";

function AddModal({ loginUser }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 追加状态用于控制添加成功后的提示信息显示和隐藏
  const [isShowSuccessTip, setIsShowSuccessTip] = useState(false);

  const [selectedCreateDate, setSelectedCreateDate] = useState(new Date());
  const [selectedUpdateDate, setSelectedUpdateDate] = useState(new Date());

  const name = useRef();
  const marketPrice = useRef();
  const shopPrice = useRef();
  const num = useRef();
  // const image = useRef();
  const [imageName, setImageName] = useState();
  const [idescName, setIdescName] = useState();
  const iflag = useRef();
  const status = useRef();
  const cid = useRef();

  const handleAddProduct = () => {
    axios
      .post(`${BASE_URI}/item/save`, {
        name: name.current.value,
        marketPrice: marketPrice.current.value,
        shopPrice: shopPrice.current.value,
        num: num.current.value,
        image: imageName,
        idesc: idescName,
        iflag: iflag.current.value,
        status: status.current.value,
        createTime: selectedCreateDate,
        updateTime: selectedUpdateDate,
        cid: cid.current.value,
        uid: loginUser.data.uid,
      })
      .then((response) => {
        handleClose();
        PubSub.publish("product.updated");
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
        //   className="btn-sm"
        variant="primary"
        onClick={handleShow}
        style={{ borderRadius: "0px", marginLeft: "10px", marginRight: "10px" }}
      >
        Add product
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add product</Modal.Title>
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

          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="marketPrice"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              MarketPrice:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="marketPrice"
                placeholder="Please enter the marketPrice"
                ref={marketPrice}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="shopPrice"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              ShopPrice:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="shopPrice"
                placeholder="Please enter the shopPrice"
                ref={shopPrice}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="num"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Number:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="num"
                placeholder="Please enter the number"
                ref={num}
              />
            </Col>
          </Form.Group>

          {/* <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="image"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Image:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="image"
                placeholder="Please enter the image"
                ref={image}
              />
            </Col>
          </Form.Group> */}
          {/* <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="idesc"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Idesc:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="idesc"
                placeholder="Please enter the idesc"
                ref={idesc}
              />
            </Col>
          </Form.Group> */}
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
                ref={iflag}
              /> */}
              <Form.Control as="select" ref={iflag}>
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
                ref={status}
              /> */}
              <Form.Control as="select" ref={status}>
                <option value="">Please select a status</option>
                <option value={1}>Product on the shelves</option>
                <option value={2}>Product off the shelves</option>
                <option value={3}>Delete</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="createTime"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              CreateTime:
            </Form.Label>
            <Col className="col-7">
              <DatePicker
                selected={selectedCreateDate}
                onChange={(date) => setSelectedCreateDate(date)}
                dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSX" // 设置日期格式与Java的日期格式一致
              />
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
                id="cid"
                placeholder="Please enter the cid"
                ref={cid}
              /> */}
              <Form.Control as="select" ref={cid}>
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
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Upload image:
            </Form.Label>
            <Col className="col-7">
              <Form.Control type="file" onChange={handleFileChange} />
            </Col>
          </Form.Group>
          {/* <Button onClick={handleFileUpload}>上传</Button> */}
          <Form.Group className="form-group row mb-3">
            <Form.Label
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Upload idecs:
            </Form.Label>
            <Col className="col-7">
              <Form.Control type="file" onChange={handleFileIdescChange} />
            </Col>
          </Form.Group>
          {/* <Button onClick={handleFileIdescUpload}>上传</Button> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleAddProduct();
              handleFileUpload();
              handleFileIdescUpload();
            }}
          >
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

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  (state) => ({
    loginUser: state.login,
  }),
  mapDispatchToProps
)(AddModal);
