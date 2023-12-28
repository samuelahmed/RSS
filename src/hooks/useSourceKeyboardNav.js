import { useEffect, useRef } from "react";

export default function useSourceKeyboardNav({
  initialRefs,
  selectedSourceURL,
  sourceData,
  tempSourceIndex,
  tempCategoryIndex,
  setTempSourceIndex,
  setTempCategoryIndex,
  setSelectedSource,
}) {
  const itemRefs = useRef(initialRefs);
  
  // keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedSourceURL === null) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setTempSourceIndex((prevIndex) => {
            if (prevIndex === sourceData[tempCategoryIndex].length - 1) {
              return 0;
            } else {
              return prevIndex + 1;
            }
          });
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setTempSourceIndex((prevIndex) => {
            if (prevIndex === 0) {
              return sourceData[tempCategoryIndex].length - 1;
            } else {
              return prevIndex - 1;
            }
          });
        }
        if (e.key === "Tab") {
          if (e.shiftKey) {
            e.preventDefault();
            setTempCategoryIndex((prevIndex) => {
              console.log(prevIndex, "prevIndex");
              return prevIndex - 1 < 0 ? 0 : prevIndex - 1;
            });
            setTempSourceIndex(0);
          } else {
            e.preventDefault();
            setTempCategoryIndex((prevIndex) => {
              if (prevIndex === sourceData.length - 1) {
                return 0;
              } else {
                return prevIndex + 1;
              }
            });
            setTempSourceIndex(0);
          }
        }
        if (e.key === "Enter") {
          e.preventDefault();
          setSelectedSource((prevState) => ({
            ...prevState,
            name: sourceData[tempCategoryIndex][tempSourceIndex].title,
            url: sourceData[tempCategoryIndex][tempSourceIndex].url,
          }));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSourceURL, tempCategoryIndex, tempSourceIndex]);

  //center selected source
  useEffect(() => {
    const item = itemRefs.current[tempCategoryIndex].get(tempSourceIndex);
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
  }, [tempSourceIndex, tempCategoryIndex, itemRefs]);

  // center selected source category
  useEffect(() => {
    const item = itemRefs.current[tempCategoryIndex].get(tempSourceIndex);
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
  }, [tempSourceIndex, tempCategoryIndex, itemRefs]);

  return itemRefs;
}
