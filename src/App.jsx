import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from "react-bootstrap";
import { db } from './index';
import { fetchDataArray } from './utilities/fetch_data';


const App = () => {
  // const data = [
  //   {
  //       "name": "John Doe",
  //       "id": "images.jpeg",
  //       "skills-have": ["guitar", "music composition"],
  //       "skills-want": ["tennis"]
  //   },
  //   {
  //       "name": "Jane Smith",
  //       "skills-have": ["programming", "graphic design"],
  //       "skills-want": ["photography"]
  //   },
  //   {
  //       "name": "Robert Johnson",
  //       "skills-have": ["cooking", "gardening"],
  //       "skills-want": ["hiking"]
  //   },
  //   {
  //       "name": "Emily Davis",
  //       "skills-have": ["writing", "public speaking"],
  //       "skills-want": ["yoga"]
  //   },
  //   {
  //       "name": "Michael Wilson",
  //       "skills-have": ["photography", "video editing"],
  //       "skills-want": ["sailing"]
  //   }
  // ]
 
  const [data, setData] = useState([]);

  // using useEffect like this calls fetchData() once rather than repeatedly!!!
  // apparently useEffect doesn't allow async requests unless it's done this way
  // any alternatives?
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetchDataArray() => [{data}] (from fetch_data.js)
        const result = await fetchDataArray(db);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // data follows this format:
  // [
  //   user0: {
  //     id: str // (filepath of image)
  //     name: str 
  //     skills-have: str[]
  //     skills-want: str[]
  //   },
  //   user1: {...},
  //   user2: {...}
  // ]

  // to access a specific user, you have to do data[user]
  // so the mapping needs to be
  // Object.keys(data).map( (person) ) => {...}
  return (
    <div className="App">
      <h1>SkillSwap</h1>
      {data.map((person, index) => (
        <div className='skill-cards'>
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={person.id} />
          <Card.Body>
            <Card.Title>{person.name}</Card.Title>
            <Card.Text>
              Skills have: {person["skills-have"].join(', ')}
            </Card.Text>
            <Card.Text>
              Skills want: {person["skills-want"].join(', ')}
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
