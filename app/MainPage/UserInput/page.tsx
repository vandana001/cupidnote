"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./UserInput.module.css";

const images = [
  "/avatar1.png",
  "/avatar2.png",
  "/avatar3.png",
  "/avatar4.png"
];

const UserInput = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedImage = localStorage.getItem("selectedImage");
      if (storedImage) setSelectedImage(storedImage);
    }
  }, []);

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    localStorage.setItem("selectedImage", img);
  };

  const handleNext = () => {
    if (selectedImage) {
      router.push('/MainPage/EndPage');  
    } else {
      alert("Please select an image first!");
    }
};

  return (
    <div className={styles.container}>

        <h3 className={styles.fonts}>This one gives US Energy</h3>
        <p className={styles.textsmall}>Select one</p>
      <div className={styles.imagesContainer}>
        {images.map((img, index) => (
          <div key={index} className={styles.imageWrapper}>
            <Image
              src={img}
              alt={`Option ${index + 1}`}
              width={150}
              height={150}
              className={`${styles.image} ${selectedImage === img ? styles.selected : ""}`}
              onClick={() => handleImageClick(img)}
            />
          </div>
        ))}
      </div>
      <button className={styles.nextButton} onClick={handleNext}>
        TAP 
      </button>
    </div>
  );
};

export default UserInput;