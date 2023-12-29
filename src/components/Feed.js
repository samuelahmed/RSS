import { useEffect, useState } from "react";
import { formatDate } from "../utils";
import useFeedKeyboardNav from "@/hooks/useFeedKeyboardNav";

export default function Feed({
  fetchedFeed,
  showModal,
  selectedSourceFeed,
  setShowModal,
  setSelectedSource,
  setSelectedArticle,
  selectedSourceURL,
}) {
  let counter = 1;
  const [tempArticleIndex, setTempArticleIndex] = useState(0);

  const itemRefs = useFeedKeyboardNav({
    initialRefs: selectedSourceFeed.map(() => new Map()),
    showModal,
    selectedSourceURL,
    tempArticleIndex,
    selectedSourceFeed,
    setShowModal,
    setTempArticleIndex,
    setSelectedArticle,
    setSelectedSource,
  });

  const setSelectedSourceFeed = (feed) => {
    setSelectedSource((prevState) => ({
      ...prevState,
      feed: feed,
    }));
  };

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

  useEffect(() => {
    const serverDataItemType = {
      atom: fetchedFeed?.feed?.entry,
      rss: fetchedFeed?.rss?.channel?.item,
      rdf: fetchedFeed?.rdf?.item,
    };
    if (serverDataItemType.atom && serverDataItemType.atom.length > 0) {
      setSelectedSourceFeed(serverDataItemType.atom);
    } else if (serverDataItemType.rss && serverDataItemType.rss.length > 0) {
      setSelectedSourceFeed(serverDataItemType.rss);
    } else if (serverDataItemType.rdf && serverDataItemType.rdf.length > 0) {
      setSelectedSourceFeed(serverDataItemType.rdf);
    }
    setSelectedArticleIndex(null);
  }, [fetchedFeed]);

  return (
    <>
      <div className="h-screen flex-grow text-gray-200 px-1 overflow-auto scrollbar mb-6">
        {selectedSourceFeed.map((item, index) => (
          <div
            key={index}
            // ref={(el) => {
            //   if (el) {
            //     itemRefs.current[index].set(index, el);
            //   }
            // }}
            className={
              tempArticleIndex === index ? "bg-blue-600" : "bg-background"
            }
            onClick={() => {
              setTempArticleIndex(index);
              setSelectedArticleIndex(index);
              setSelectedArticleContent(item);
              setShowModal(true);
            }}
          >
            <div className="flex flex-row overflow-hidden h-6 cursor-pointer hover:bg-blue-600">
              <div className="pr-2 w-8"> {counter++}.</div>
              <div className="pr-4 w-52 min-w-fit overflow-hidden hidden md:block">
                {formatDate(item)}
              </div>
              <div className="overflow-auto ">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
