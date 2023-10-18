import { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SwapPage.css';
import { Button, Card } from "react-bootstrap";
import Sidebar from './SideBar';

import { db } from '..';
import { fetchDataArray } from '../utilities/fetch_data'
import SearchBar from './SearchBar';
import { RenderSkillsHave } from './SkillsHave';
import { RenderSkillsWant } from './SkillsWant';

const SwapPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  function onSearch(searchTerm) {
    const filteredPersons = data.filter((person) => {
      return (
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        ||
        Object.entries(person["skills-have"]).some(([skill, level]) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });

    setFilteredData(filteredPersons);
  }

  // using useEffect like this calls fetchData() once rather than repeatedly!!!
  // apparently useEffect doesn't allow async requests unless it's done this way
  // any alternatives?
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetchDataArray() => [{data}] (from fetch_data.js)
        const result = await fetchDataArray(db);
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

 // data follows this format:
  // [
  //   user0: {
  //     email: str 
  //     image: str (URL of image in storage)
  //     name: str 
  //     skills-have: str[]
  //     skills-want: str[]
  //   },
  //   user1: {...},
  //   user2: {...}
  // ]
  
  return (
    <div>
    <button className="sidebar-toggle-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
    <Sidebar show={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <h1>SkillSwap</h1>
      <SearchBar onSearch={onSearch} />
      {filteredData.map((person, index) => (
      <div className="skill-cards-container" key= {index} >
      <div className="skill-cards" key= {index} >
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={person.image} />
          <Card.Body>
            <Card.Title>{person.name}</Card.Title>
            <div className="skills-section">
              <div className="skills-label">Skills Have:</div>
              <RenderSkillsHave skills={person["skills-have"]} />
            </div>
            <div className="skills-section">
              <div className="skills-label">Skills Want:</div>
              <RenderSkillsWant skills={person["skills-want"]} />
              {/* <div className="skills-list">
                {person["skills-want"].map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div> */}
            </div>
            <a href={`mailto:${person.email}`} >
              <Button variant="primary">Contact</Button>
            </a>
          </Card.Body>
        </Card>
      </div>
      </div>
      ))}
    </div>
  );
};

export default SwapPage;