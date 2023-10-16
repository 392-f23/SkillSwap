import { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SwapPage.css';
import { Button, Card } from "react-bootstrap";
import Sidebar from './SideBar';
import ImageDisplay from './GetImage';
import ProfileForm from './ProfileForm';
import { db } from '..';
import { fetchDataArray } from '../utilities/fetch_data'
import { collection, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

const SwapPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  //             //  needs to be changed to grab from firebase storage
  //     name: str 
  //     skills-have: str[]
  //     skills-want: str[]
  //   },
  //   user1: {...},
  //   user2: {...}
  // ]

  const handleProfileSubmit = async (profile) => {
    try {
      await addProfileToDB(profile);
      // Refresh the data after adding a new profile
      const result = await fetchDataArray(db);
      setData(result);
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const addProfileToDB = async (profile) => {
    try {
      // Reference to the specific document "AAAAAAAA" in the "users" collection
      const userDocRef = doc(db, 'users', 'AAAAAAAA');
      
      // Retrieve the current data from the "AAAAAAAA" document
      const docSnap = await getDoc(userDocRef);
      
      let nextUserNumber = 0;
      if (docSnap.exists()) {
        // Determine the next available user number
        const currentData = docSnap.data();
        const userNumbers = Object.keys(currentData)
                                  .filter(key => key.startsWith("user"))
                                  .map(key => parseInt(key.replace("user", ""), 10));
        
        if (userNumbers.length > 0) {
          const highestUserNumber = Math.max(...userNumbers);
          nextUserNumber = highestUserNumber + 1;
        }
      }
  
      // Construct the new user key and image name
      const newUserKey = `user${nextUserNumber}`;
  
      // Add or update the user in the "AAAAAAAA" document
      await setDoc(userDocRef, { [newUserKey]: profile }, { merge: true });
      
      console.log("Profile added successfully!");
    } catch (error) {
      console.error("Error adding profile to DB:", error);
      throw error; // Re-throw the error so it can be caught in handleProfileSubmit
    }
  };
  
  
  
  
  return (
    <div>
    <button className="sidebar-toggle-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
    <Sidebar show={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ProfileForm onProfileSubmit={handleProfileSubmit} />
      <h1>SkillSwap</h1>
      {data.map((person, index) => (
      <div className="skill-cards">
        <Card style={{ width: "18rem" }}>
          {/* <ImageDisplay storagePath="https://firebasestorage.googleapis.com/v0/b/skillswap-5f85d.appspot.com/o/0.jpg?alt=media&token=3c4c0502-4271-40e1-ba70-57b9ea0eefdb&_gl=1*hg7oh*_ga*MTY2MjQ5MzkyOC4xNjkyMzEzMDY5*_ga_CW55HF8NVT*MTY5NzA1ODUzOC4xOC4xLjE2OTcwNjA2NjIuNjAuMC4w" /> */}
          <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/skillswap-5f85d.appspot.com/o/0.jpg?alt=media&token=3c4c0502-4271-40e1-ba70-57b9ea0eefdb&_gl=1*hg7oh*_ga*MTY2MjQ5MzkyOC4xNjkyMzEzMDY5*_ga_CW55HF8NVT*MTY5NzA1ODUzOC4xOC4xLjE2OTcwNjA2NjIuNjAuMC4w" />
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