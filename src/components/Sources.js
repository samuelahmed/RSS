import devSources from "../sources/dev";
import newsSources from "../sources/news";
import techSources from "../sources/tech";
import youtubeSources from "../sources/youtube";
import podcastSources from "../sources/podcast";
import { useState } from "react";
import useSourceKeyboardNav from "@/hooks/useSourceKeyboardNav";

export default function Sources({ setSelectedSource, selectedSourceURL }) {
  const sources = [
    { title: "News", data: newsSources },
    { title: "Tech", data: techSources },
    { title: "Dev", data: devSources },
    { title: "Youtube", data: youtubeSources },
    { title: "Podcast", data: podcastSources },
  ];

  const sourceData = sources.map((source) => source.data);
  const [tempSourceIndex, setTempSourceIndex] = useState(0);
  const [tempCategoryIndex, setTempCategoryIndex] = useState(0);

  const itemRefs = useSourceKeyboardNav({
    selectedSourceURL,
    initialRefs: sources.map(() => new Map()),
    sourceData,
    setTempSourceIndex,
    setTempCategoryIndex,
    tempSourceIndex,
    tempCategoryIndex,
    setSelectedSource,
  });

  return (
    <aside>
      <div className="text-center fixed top-6 z-40 w-1/3 md:w-1/5 border-r-2 border-b-2 bg-background border-foreground">
        Feed Sources
      </div>
      <div
        className="scrollbar fixed top-12 overflow-y-auto scrollbar w-1/3 md:w-1/5 border-r-2 border-r-foreground"
        style={{ height: "92vh" }}
      >
        {sourceData.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <p
              key={categoryIndex}
              className="text-center border-y-2 border-foreground"
            >
              {sources[categoryIndex].title}
            </p>
            <ul className="h-40 pl-1 overflow-auto scrollbar">
              {category.map((item, itemIndex) => (
                <div
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[categoryIndex].set(itemIndex, el);
                    }
                  }}
                  key={itemIndex}
                >
                  <p
                    className={
                      itemIndex === tempSourceIndex &&
                      categoryIndex === tempCategoryIndex
                        ? "bg-blue-600"
                        : "bg-background hover:bg-blue-600"
                    }
                    onClick={() => {
                      setTempSourceIndex(itemIndex);
                      setTempCategoryIndex(categoryIndex);
                      setSelectedSource((prevState) => ({
                        ...prevState,
                        name: item.title,
                        url: item.url,
                      }));
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
