import { doc, getDoc } from "firebase/firestore";

export const get_doc = async (db) => {
    const docRef = doc(db, "users", "AAAAAAAA");
    const docSnap = await getDoc(docRef);

    if (! docSnap.exists()) {
       // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }

    return docSnap.data();
}