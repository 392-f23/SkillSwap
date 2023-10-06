import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";

const App = () => {
  const [count, setCount] = useState(0);

  const data = [
    {
      name: "John Doe",
      image: "johndoe.jpeg",
      "skills-have": ["guitar", "music composition"],
      "skills-want": ["tennis"],
    },
    {
      name: "Jane Smith",
      image: "janedoe.jpeg",
      "skills-have": ["programming", "graphic design"],
      "skills-want": ["photography"],
    },
    {
      name: "Robert Johnson",
      image: "robertjohnson.jpeg",
      "skills-have": ["cooking", "gardening"],
      "skills-want": ["hiking"],
    },
    {
      name: "Emily Davis",
      image: "emilydavis.jpeg",
      "skills-have": ["writing", "public speaking"],
      "skills-want": ["yoga"],
    },
    {
      name: "Michael Wilson",
      image: "michaelwilson.jpeg",
      "skills-have": ["photography", "video editing"],
      "skills-want": ["sailing"],
    },
  ];

  return (
    <div className="App">
      <h1>SkillSwap</h1>
      {data.map((person, index) => (
        <div className="skill-cards">
          <Card key={index} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={person.image} />
            <Card.Body>
              <Card.Title>{person.name}</Card.Title>
              <Card.Text>
                Skills have: {person["skills-have"].join(", ")}
              </Card.Text>
              <Card.Text>
                Skills want: {person["skills-want"].join(", ")}
              </Card.Text>
              <Button variant="primary">Contact</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default App;
