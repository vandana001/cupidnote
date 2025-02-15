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

  // Handle cursor position
  useEffect(() => {
    if (isReadOnly) return;

    const setCursorToEnd = () => {
      if (!inputRef.current) return;

      const range = document.createRange();
      const selection = window.getSelection();
      
      // Set range to end of content
      range.selectNodeContents(inputRef.current);
      range.collapse(false);

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };

    // Small delay to ensure DOM is ready
    requestAnimationFrame(setCursorToEnd);
  }, [isReadOnly]);

  // Save letter content in sessionStorage and prevent duplication
  const handleContentChange = (event: React.FormEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    
    // Remove any duplicate "To My Favorite Person ❤️" text
    let content = target.innerText;
    const header = "To My Favorite Person ❤️";
    if (content.startsWith(header)) {
      content = content.substring(header.length).trim();
    }
    
    setLetterContent(content);
    sessionStorage.setItem("letterContent", content);
  };

  // Convert letter to an image
  const handleSave = async () => {
    if (!contentRef.current) return;
    setIsReadOnly(true);

    try {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      setLetterImage(imgData);
      localStorage.setItem("letterImage", imgData);
    } catch (error) {
      console.error("Error saving image:", error);
      setIsReadOnly(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.letter}
        ref={contentRef}
        style={{
          lineHeight: 2,
          fontSize: "25px",
          outline: "none",
          cursor: isReadOnly ? "default" : "text",
          fontFamily: "Give You Glory",
          "--background-image": imageSrc ? `url(${imageSrc})` : "none",
        } as React.CSSProperties}
      >
        <div className={styles.fonts} contentEditable={false}>
          To My Favorite Person ❤️
        </div>
        <span
          ref={inputRef}
          contentEditable={!isReadOnly}
          suppressContentEditableWarning
          onInput={handleContentChange}
          className={styles.contentEditable}
        >
          {letterContent}
        </span>
      </div>

      <div className={styles.buttonContainer}>
        {!isReadOnly ? (
          <button className={styles.button} onClick={handleSave}>
            Save as Image
          </button>
        ) : (
          <a 
            href={letterImage || undefined} 
            download="letter.png" 
            className={styles.button}
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default EndPage;