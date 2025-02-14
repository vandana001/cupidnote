// "use client";

// import { useEffect, useRef, useState } from "react";
// import html2canvas from "html2canvas";
// import styles from "./EndPage.module.css";

// const EndPage: React.FC = () => {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [letterContent, setLetterContent] = useState<string>("");
//   const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
//   const [letterImage, setLetterImage] = useState<string | null>(null);

//   // Load stored image and letter
//   useEffect(() => {
//     const storedImage = localStorage.getItem("selectedImage");
//     if (storedImage) setImageSrc(storedImage);

//     const savedLetter = localStorage.getItem("letterContent");
//     if (savedLetter) setLetterContent(savedLetter);
//   }, []);

//   // Set cursor after "To My Favorite Person ❤️"
//   useEffect(() => {
//     if (contentRef.current) {
//       const range = document.createRange();
//       const selection = window.getSelection();
//       range.selectNodeContents(contentRef.current);
//       range.collapse(false); // Move cursor to the end
//       selection?.removeAllRanges();
//       selection?.addRange(range);
//     }
//   }, [letterContent]); // Runs when letter content loads

//   // Convert letter to an image
//   const handleSave = async () => {
//     if (contentRef.current) {
//       const contentText = contentRef.current.innerText.trim();
//       if (!contentText) {
//         alert("Please write your letter before saving.");
//         return;
//       }

//       localStorage.setItem("letterContent", contentText);
//       setIsReadOnly(true);

//       // Capture letter as an image
//       const canvas = await html2canvas(contentRef.current);
//       const imgData = canvas.toDataURL("image/png");
//       setLetterImage(imgData);
//       localStorage.setItem("letterImage", imgData);
//       alert("Letter saved as an image and ready to share!");
//     }
//   };

//   // Copy letter image to clipboard
//   const handleCopyImage = async () => {
//     if (letterImage) {
//       try {
//         const response = await fetch(letterImage);
//         const blob = await response.blob();
//         await navigator.clipboard.write([
//           new ClipboardItem({ "image/png": blob }),
//         ]);
//         alert("Letter image copied to clipboard!");
//       } catch (err) {
//         alert("Copy failed! Try downloading instead.");
//       }
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {/* Letter Content */}
//       <div
//         className={styles.letter}
//         ref={contentRef}
//         contentEditable={!isReadOnly}
//         suppressContentEditableWarning
//         style={{
//           lineHeight: 2,
//           fontSize: "25px",
//           outline: "none",
//           cursor: isReadOnly ? "default" : "text",
//           fontFamily: "Give You Glory",
//           "--background-image": imageSrc ? `url(${imageSrc})` : "none",
//         } as React.CSSProperties}
//       >
//         <p className={styles.fonts}>To My Favorite Person ❤️</p>
//         <br />
//         {letterContent}
//       </div>

//       {/* Buttons */}
//       <div className={styles.buttonContainer}>
//         {!isReadOnly ? (
//           <button className={styles.button} onClick={handleSave}>Save as Image</button>
//         ) : (
//           <>
//             <a href={letterImage || undefined} download="letter.png" className={styles.button}>
//               Download
//             </a>
            
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EndPage;

"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import styles from "./EndPage.module.css";

const EndPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLSpanElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [letterContent, setLetterContent] = useState<string>("");
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [letterImage, setLetterImage] = useState<string | null>(null);

  // Clear localStorage on page load and retrieve session data
  useEffect(() => {
    localStorage.removeItem("letterContent");
    localStorage.removeItem("letterImage");

    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) setImageSrc(storedImage);

    const sessionLetter = sessionStorage.getItem("letterContent");
    if (sessionLetter) setLetterContent(sessionLetter);
  }, []);

  // Ensure cursor starts inside the editable span
  useEffect(() => {
    setTimeout(() => {
      if (!inputRef.current) return;

      const range = document.createRange();
      const selection = window.getSelection();

      range.selectNodeContents(inputRef.current);
      range.collapse(false);

      selection?.removeAllRanges();
      selection?.addRange(range);
    }, 100);
  }, [letterContent]);

  // Save letter content in sessionStorage
  const handleContentChange = (event: React.FormEvent<HTMLSpanElement>) => {
    const newContent = event.currentTarget.innerText.trim();
    setLetterContent(newContent);
    sessionStorage.setItem("letterContent", newContent);
  };

  // Convert letter to an image
  const handleSave = async () => {
    if (!inputRef.current) return;
    
    const contentText = inputRef.current.innerText.trim();
    // if (!contentText) {
    //   alert("Please write your letter before saving.");
    //   return;
    // }

    setIsReadOnly(true);

    // Capture letter as an image
    const canvas = await html2canvas(contentRef.current!);
    const imgData = canvas.toDataURL("image/png");
    setLetterImage(imgData);
    localStorage.setItem("letterImage", imgData);
    // alert("Letter saved as an image and ready to share!");
  };

  return (
    <div className={styles.container}>
      {/* Letter Content */}
      <div
        className={styles.letter}
        ref={contentRef}
        contentEditable={!isReadOnly}
        suppressContentEditableWarning
        style={{
          lineHeight: 2,
          fontSize: "25px",
          outline: "none",
          cursor: isReadOnly ? "default" : "text",
          fontFamily: "Give You Glory",
          "--background-image": imageSrc ? `url(${imageSrc})` : "none",
        } as React.CSSProperties}
      >
        <span className={styles.fonts} contentEditable={false}>
          To My Favorite Person ❤️
        </span>
        <span
          ref={inputRef}
          contentEditable={!isReadOnly}
          suppressContentEditableWarning
          onInput={handleContentChange}
        >
          {letterContent}
        </span>
      </div>

      {/* Buttons */}
      <div className={styles.buttonContainer}>
        {!isReadOnly ? (
          <button className={styles.button} onClick={handleSave}>Save as Image</button>
        ) : (
          <a href={letterImage || undefined} download="letter.png" className={styles.button}>
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default EndPage;
