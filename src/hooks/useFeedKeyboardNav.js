import { useEffect, useRef } from "react";

export default function useKeyboardNavigation({

}) {
  const itemRefs = useRef(initialRefs);

  useEffect(() => {
   if (feedURL !== null && showModal === false) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setFeedURL(null);
          setSelectedSourceFeed([]);
          setSelectedSourceName(null);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setArticleIndex((prevIndex) => {
            if (prevIndex === 0) {
              return 0;
            } else {
              return prevIndex - 1;
            }
          });
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setArticleIndex((prevIndex) => {
            if (articleIndex === null) {
              return 0;
            } else {
              return prevIndex + 1;
            }
          });
        }
        if (e.key === "Enter") {
          setSelectedArticle(selectedSourceFeed[articleIndex]);
          setShowModal(true);
        }
      }
      if (showModal === true) {
        if (e.key === "Escape") {
          e.preventDefault();
          setShowModal(false);
        }
      }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sourceCategoryIndex, sourceData, setSelectedSourceName, sourceIndex]);






  //center selected source
  useEffect(() => {
    const item = itemRefs.current[sourceCategoryIndex].get(sourceIndex);
    if (item) {
      const sourceContainer = item.parentElement;
      const itemTop = item.getBoundingClientRect().top;
      const sourceContainerTop = sourceContainer?.getBoundingClientRect().top;

      if (
        itemTop < sourceContainerTop ||
        itemTop > sourceContainerTop + sourceContainer?.offsetHeight
      ) {
        sourceContainer.scrollTop = item.offsetTop - sourceContainer.offsetTop;
      }
    }
  }, [sourceIndex, sourceCategoryIndex, itemRefs]);

  //center selected source category
  useEffect(() => {
    const item = itemRefs.current[sourceCategoryIndex].get(sourceIndex);
    if (item) {
      const scrollbar = document.querySelector(".scrollbar");
      const itemTop = item.getBoundingClientRect().top;
      const scrollbarTop = scrollbar?.getBoundingClientRect().top;

      if (
        itemTop < scrollbarTop ||
        itemTop > scrollbarTop + scrollbar?.offsetHeight
      ) {
        scrollbar.scrollTop = item.offsetTop - scrollbar.offsetTop;
      }
    }
  }, [sourceIndex, sourceCategoryIndex, itemRefs]);



  
  return itemRefs;
}
