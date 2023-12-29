import { useEffect, useRef } from "react";

export default function useFeedKeyboardNav({
  initialRefs,
  showModal,
  selectedSourceURL,
  tempArticleIndex,
  selectedSourceFeed,
  setShowModal,
  setTempArticleIndex,
  setSelectedSource,
  setSelectedArticleIndex,
  setSelectedArticleContent,
}) {

  const itemRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedSourceURL !== null && showModal === false) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setSelectedSource((prevState) => ({
            ...prevState,
            url: null,
            feed: [],
            name: null,
          }));
          setTempArticleIndex(0);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setTempArticleIndex((prevIndex) => {
            if (prevIndex === 0) {
              return 0;
            } else {
              return prevIndex - 1;
            }
          });
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setTempArticleIndex((prevIndex) => {
            if (prevIndex === initialRefs.length - 1) {
              return 0;
            } else {
              return prevIndex + 1;
            }
          });
        }
        if (e.key === "Enter") {
          setSelectedArticleIndex(tempArticleIndex);
          setSelectedArticleContent(selectedSourceFeed[tempArticleIndex]);
          setShowModal(true);
        }
      } else if (selectedSourceURL !== null && showModal === true) {
        if (e.key === "Escape") {
          e.preventDefault();
          setShowModal(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tempArticleIndex, selectedSourceURL, showModal]);

  // Scroll to the selected item
  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [tempArticleIndex]);

  return itemRef;
}
