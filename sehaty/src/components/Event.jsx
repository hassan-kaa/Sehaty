import React from "react";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import img from "../assets/hero.png";
import { MainButton } from "./StyledComponents";
import { useSelector } from "react-redux";
import { useState } from "react";
import image1 from "../assets/event1.jpg";
import image2 from "../assets/event2.jpg";
import image3 from "../assets/event3.jpg";
import image4 from "../assets/event4.jpg";
import image5 from "../assets/event5.jpg";
import image6 from "../assets/event6.jpg";
const Event = (props) => {
  const user = useSelector((state) => state.isLoggedIn);
  const images = [image1, image2, image3, image4, image5, image6];
  const [error, setError] = useState("");
  const handleParticipation = async () => {
    const eventId = "645bdc91022ee509f159a4ec";
    var response = null;

    if (user)
      response = await fetch(
        `http://localhost:5001/events/cancelParticipation/${eventId}/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    else
      response = await fetch(
        `http://localhost:5001/events/participate/${eventId}/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    const data = await response.json();

    if (response.ok) {
    } else {
      setError(data);
      console.log(error);
    }
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col md={12}>
          <Carousel>
            {images.map((image) => (
              <Carousel.Item className="h-80" key={images.indexOf(image)}>
                <Image className="w-full object-cover" src={image} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row className="m-4">
        <Col xs={6}>
          <h2>{props.event.title}</h2>
          <p>{props.event.description}</p>

          <MainButton onClick={handleParticipation}>
            {user ? "Participate" : "Cancel Participation"}
          </MainButton>
        </Col>
        <Col xs={6}>
          <div className="flex  justify-around items-center">
            <div>
              <h5>{props.event.place}</h5>
              <h5>Participants: {props.event.participants.length}</h5>
            </div>
            <div className="rounded-lg border-2 border-black flex flex-col justify-center items-end">
              <div className="bg-red-600 text-white py-2 px-4 rounded-t-lg">
                <div className="text-md font-bold uppercase">
                  {new Date(props.event.date)
                    .toLocaleDateString("default", {
                      month: "long",
                    })
                    .slice(0, 3)}
                </div>
              </div>
              <div class="bg-white text-black py-2 px-4 rounded-b-lg">
                <div className="text-4xl font-bold">
                  {new Date(props.event.date).toLocaleDateString("default", {
                    day: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Event;
