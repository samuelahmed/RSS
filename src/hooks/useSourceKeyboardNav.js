import { useEffect, useRef } from "react";

export default function useSourceKeyboardNav({
  selectedSourceURL,

  initialRefs,
  sourceData,
  // tempSourceIndex,
  tempCategoryIndex,
  setTempSourceIndex,
  setTempCategoryIndex,
}) {
  const itemRefs = useRef(initialRefs);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // if (selectedSourceURL === null) {
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

      //     if (e.key === "Enter") {
      //       setSelectedSourceName(
      //         sourceData[sourceCategoryIndex][sourceIndex].title
      //       );
      //       setFeedURL(sourceData[sourceCategoryIndex][sourceIndex].url);
      // }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSourceURL]);

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
