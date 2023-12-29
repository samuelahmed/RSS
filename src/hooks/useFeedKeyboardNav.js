import { useEffect, useRef } from "react";

export default function useFeedKeyboardNav({
  initialRefs,
  showModal,
  selectedSourceURL,
  tempArticleIndex,
  selectedSourceFeed,
  setShowModal,
  setTempArticleIndex,
  setSelectedArticle,
  setSelectedSource,
}) {
  const setSelectedArticleIndex = (index) => {
    setSelectedArticle((prevState) => ({
      ...prevState,
      index: index,
    }));
  };

  const setSelectedArticleContent = (content) => {
    setSelectedArticle((prevState) => ({
      ...prevState,
      content: content,
    }));
  };

  const itemRefs = useRef(initialRefs);

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

  //center selected source
  // useEffect(() => {
  //   const item = itemRefs.current[sourceCategoryIndex].get(sourceIndex);
  //   if (item) {
  //     const sourceContainer = item.parentElement;
  //     const itemTop = item.getBoundingClientRect().top;
  //     const sourceContainerTop = sourceContainer?.getBoundingClientRect().top;

  //     if (
  //       itemTop < sourceContainerTop ||
  //       itemTop > sourceContainerTop + sourceContainer?.offsetHeight
  //     ) {
  //       sourceContainer.scrollTop = item.offsetTop - sourceContainer.offsetTop;
  //     }
  //   }
  // }, [sourceIndex, sourceCategoryIndex, itemRefs]);

  //center selected source category
  // useEffect(() => {
  //   const item = itemRefs.current[sourceCategoryIndex].get(sourceIndex);
  //   if (item) {
  //     const scrollbar = document.querySelector(".scrollbar");
  //     const itemTop = item.getBoundingClientRect().top;
  //     const scrollbarTop = scrollbar?.getBoundingClientRect().top;

  //     if (
  //       itemTop < scrollbarTop ||
  //       itemTop > scrollbarTop + scrollbar?.offsetHeight
  //     ) {
  //       scrollbar.scrollTop = item.offsetTop - scrollbar.offsetTop;
  //     }
  //   }
  // }, [sourceIndex, sourceCategoryIndex, itemRefs]);

  return itemRefs;
}
