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
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import { useAuthState } from '..';

const SwapPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [data, setData] = useState([]);
  
  const [user, signInWithGoogle] = useAuthState();


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
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
      {user ? (
        // User is logged in
        data.some(profile => profile.name === user.displayName) ? (
          // User has a profile in the database
          <>
            <Sidebar show={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <h1>SkillSwap</h1>
            {data.map((person, index) => (
              <div className="skill-cards" key={index}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={person.id} />
                  <Card.Body>
                    <Card.Title>{person.name}</Card.Title>
                    <div className="skills-section">
                      <div className="skills-label">Skills Have:</div>
                      <div className="skills-list">
                        {person["skills-have"].map((skill, idx) => (
                          <span key={idx} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="skills-section">
                      <div className="skills-label">Skills Want:</div>
                      <div className="skills-list">
                        {person["skills-want"].map((skill, idx) => (
                          <span key={idx} className="skill-tag">
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
          </>
        ) : (
          // User doesn't have a profile in the database
          <>
            <h1>SkillSwap</h1>
            <ProfileForm onProfileSubmit={handleProfileSubmit} />
          </>
        )
      ) : (
        // User is not logged in
        <>
          <h1>SkillSwap</h1>
          <button onClick={signInWithGoogle}>Log in</button>
        </>
      )}
    </div>
  );
};

export default SwapPage;