import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function ImageDisplay({ storagePath }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, storagePath);

    getDownloadURL(storageRef).then(url => {
      setImageUrl(url);
    }).catch(error => {
      console.error("Error getting the download URL: ", error);
    });
  }, [storagePath]);

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt="From Firebase Storage" /> : <p>Loading...</p>}
    </div>
  );
}

export default ImageDisplay;
