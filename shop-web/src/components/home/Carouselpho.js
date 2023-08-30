import Carousel from "react-bootstrap/Carousel";
import banner1 from "../../img/banner1.jpg";
import banner2 from "../../img/banner2.jpg";
import banner3 from "../../img/banner3.jpg";
import banner4 from "../../img/banner4.jpg";
import Image from "react-bootstrap/Image";

function Carouselpho() {
  return (
    <Carousel>
      <Carousel.Item>
        {/* <img
          className="d-block w-100"
          src="car1.jpg"
          alt="First slide"
        /> */}
        <Image className="d-block w-100" src={banner1} alt="banner1" />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
        <Image className="d-block w-100" src={banner2} alt="banner2" />
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={banner3} alt="banner3" />
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={banner4} alt="banner4" />
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}
export default Carouselpho;
