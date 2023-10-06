import { doc, getDoc } from "firebase/firestore";

export const fetchDataArray = async (db) => {
    // doc(database reference, collection, document)
    // db reference initialized in index.js and imported in App.jsx
    const docRef = doc(db, "users", "AAAAAAAA");
    const docSnap = await getDoc(docRef);

    if (! docSnap.exists()) {
       // docSnap.data() will be undefined in this case
       console.log("No such document!");
       throw new Error("Document does not exist");
    }
    
    // set the result to data receieved
    // this changes the format of the data 
    // from { {}, {}, {} } to [ {}, {}, {} ]
    // so mapping is more intuitive
    const dataArray = Object.values(docSnap.data());
    return dataArray;
}