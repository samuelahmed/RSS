import { useEffect, useRef } from "react";

export default function useKeyboardNavigation({
  sourceData,
  sourceCategoryIndex,
  setSourceCategoryIndex,
  sourceIndex,
  setSourceIndex,
  setSelectedSourceName,
  initialRefs,
  setFeedURL,
  feedURL,
  setSelectedSourceFeed,
  articleIndex,
  setArticleIndex,
  setShowModal,
  showModal,
  setSelectedArticle,
  selectedSourceFeed,
}) {
  const itemRefs = useRef(initialRefs);

  useEffect(() => {
    const handleKeyDown = (e) => {
      //locks sources nav if searching through a specific source
      if (feedURL === null && showModal === false) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSourceIndex((prevIndex) => {
            if (prevIndex === sourceData[sourceCategoryIndex].length - 1) {
              return 0;
            } else {
              return prevIndex + 1;
            }
          });
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSourceIndex((prevIndex) => {
            if (prevIndex === 0) {
              return sourceData[sourceCategoryIndex].length - 1;
            } else {
              return prevIndex - 1;
            }
          });
        }
        if (e.key === "Tab") {
          if (e.shiftKey) {
            e.preventDefault();
            setSourceCategoryIndex((prevIndex) => {
              console.log(prevIndex, "prevIndex");
              return prevIndex - 1 < 0 ? 0 : prevIndex - 1;
            });
            setSourceIndex(0);
          } else {
            e.preventDefault();
            setSourceCategoryIndex((prevIndex) => {
              if (prevIndex === sourceData.length - 1) {
                return 0;
              } else {
                return prevIndex + 1;
              }
            });
            setSourceIndex(0);
          }
        }
        if (e.key === "Enter") {
          setSelectedSourceName(
            sourceData[sourceCategoryIndex][sourceIndex].title
          );
          setFeedURL(sourceData[sourceCategoryIndex][sourceIndex].url);
        }
      } else if (feedURL !== null && showModal === false) {
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
    };
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
