import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SwapPage.css';
import { Button, Card } from "react-bootstrap";
import Sidebar from './SideBar';


const SwapPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = [
    {
        "name": "John Doe",
        "image": "images.jpeg",
        "skills-have": ["guitar", "music composition"],
        "skills-want": ["tennis"],
        "description": "I'm a musician looking to learn tennis to play with my girlfriend."
    },
    {
        "name": "Jane Smith",
        "skills-have": ["programming", "graphic design"],
        "skills-want": ["photography"],
        "description": "I'm taking a photography class and would like to practice with someone."
    },
    {
        "name": "Robert Johnson",
        "skills-have": ["cooking", "gardening"],
        "skills-want": ["hiking"],
        "description": "I'm looking for someone to go hiking with during the weekends."
    },
    {
        "name": "Emily Davis",
        "skills-have": ["writing", "public speaking"],
        "skills-want": ["yoga"],
        "description": "I need to chill out and would like to learn yoga."
    },
    {
        "name": "Michael Wilson",
        "skills-have": ["photography", "video editing"],
        "skills-want": ["sailing"],
        "description": "I'm looking for someone to go sailing with during the weekends."
    }
  ]
  
  return (
    <div>
    <button className="sidebar-toggle-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
    <Sidebar show={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <h1>SkillSwap</h1>
      {data.map((person, index) => (
      <div className="skill-cards">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={person.image} />
          <Card.Body>
            <Card.Title>{person.name}</Card.Title>
            <div className="skills-section">
              <div className="skills-label">Skills Have:</div>
              <div className="skills-list">
                {person["skills-have"].map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-section">
              <div className="skills-label">Skills Want:</div>
              <div className="skills-list">
                {person["skills-want"].map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="primary">Contact</Button>
          </Card.Body>
        </Card>
      </div>
      ))}
    </div>
  );
};

export default SwapPage;