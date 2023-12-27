import { useState, useEffect } from "react";
import { formatDate } from "../utils";

export default function Feed({
  serverData,
  setArticleIndex,
  articleIndex,
  setSelectedArticle,
  setShowModal,
  selectedSourceFeed,
  setSelectedSourceFeed,
}) {
  // const [selectedSourceFeed, setSelectedSourceFeed] = useState([]);
  let counter = 1;

  console.log(selectedSourceFeed, "selectedSourceFeed");

  useEffect(() => {
    const serverDataItemType = {
      atom: serverData?.feed?.entry,
      rss: serverData?.rss?.channel?.item,
      rdf: serverData?.rdf?.item,
    };
    if (serverDataItemType.atom && serverDataItemType.atom.length > 0) {
      setSelectedSourceFeed(serverDataItemType.atom);
    } else if (serverDataItemType.rss && serverDataItemType.rss.length > 0) {
      setSelectedSourceFeed(serverDataItemType.rss);
    } else if (serverDataItemType.rdf && serverDataItemType.rdf.length > 0) {
      setSelectedSourceFeed(serverDataItemType.rdf);
    }
    setArticleIndex(null);
  }, [serverData]);

  //add keyboard nav to feed & modal
  //add auto scroll to feed & modal

  return (
    <>
      <div className="h-screen flex-grow text-gray-200 px-1 overflow-auto scrollbar mb-6">
        {selectedSourceFeed.map((item, index) => (
          <p
            key="index"
            className={articleIndex === index ? "bg-blue-600" : "bg-background"}
            onClick={() => {
              setArticleIndex(index);
              setSelectedArticle(item);
              setShowModal(true);
            }}
          >
            <div
              key={index}
              className="flex flex-row overflow-hidden h-6 cursor-pointer hover:bg-blue-600"
            >
              <div className="pr-2 w-8"> {counter++}.</div>
              <div className="pr-4 w-52 min-w-fit overflow-hidden hidden md:block">
                {formatDate(item)}
              </div>
              <div className="overflow-auto ">{item.title}</div>
            </div>
          </p>
        ))}
      </div>
    </>
  );
}
