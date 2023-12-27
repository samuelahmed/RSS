import devSources from "../sources/dev";
import newsSources from "../sources/news";
import techSources from "../sources/tech";
import youtubeSources from "../sources/youtube";
import podcastSources from "../sources/podcast";
import { useState, useEffect } from "react";
import useKeyboardNavigation from "../hooks/useKeyboardNav";
import { sortItemsByDate } from "../utils";

export default function Sources({
  setSelectedSourceName,
  setServerData,
  setSelectedSourceFeed,
  articleIndex,
  setArticleIndex,
  setShowModal,
  setSelectedArticle,
  selectedSourceFeed,
  showModal,
}) {
  const sources = [
    { title: "News", data: newsSources },
    { title: "Tech", data: techSources },
    { title: "Dev", data: devSources },
    { title: "Youtube", data: youtubeSources },
    { title: "Podcast", data: podcastSources },
  ];

  const sourceData = sources.map((source) => source.data);
  const [sourceCategoryIndex, setSourceCategoryIndex] = useState(0);
  const [sourceIndex, setSourceIndex] = useState(-1);
  const [feedURL, setFeedURL] = useState(null);

  //manage keyboard nav & auto scroll
  const itemRefs = useKeyboardNavigation({
    sourceData,
    sourceCategoryIndex,
    setSourceCategoryIndex,
    sourceIndex,
    setSourceIndex,
    setSelectedSourceName,
    setFeedURL,
    feedURL,
    setSelectedSourceFeed,
    articleIndex,
    setArticleIndex,
    setShowModal,
    showModal,
    setSelectedArticle,
    selectedSourceFeed,
    initialRefs: sources.map(() => new Map()),
  });

  // Fetch the XML data from the server
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/getXML?feedUrl=${encodeURIComponent(feedURL)}`
      );
      if (!response.ok) {
        console.error("Failed to fetch XML data");
        setServerData(null);
        return;
      }
      const data = await response.json();
      // If the feed is an Atom feed
      if (data.feed) {
        data.feed.entry.sort(sortItemsByDate);
        setServerData({ feed: { entry: data.feed.entry } });
        // If the feed is an RSS feed
      } else if (data.rss) {
        if (Array.isArray(data.rss.channel.item)) {
          data.rss.channel.item.sort(sortItemsByDate);
        }
        setServerData({ rss: { channel: { item: data.rss.channel.item } } });
        // If the feed is an RDF feed
      } else if (data["rdf:RDF"]) {
        const items = data["rdf:RDF"].item;
        if (Array.isArray(items)) {
          items.sort(sortItemsByDate);
        }
        setServerData({ rdf: { item: items } });
      }
    };
    // Fetch the data when the feedURL changes
    fetchData();
  }, [feedURL]);

  return (
    <aside>
      <div className="text-center fixed top-6 z-40 w-1/3 md:w-1/5 border-r-2 border-b-2 bg-background border-foreground">
        Feed Sources
      </div>
      <div
        className="scrollbar fixed top-12 overflow-y-auto w-1/3 md:w-1/5 border-r-2 border-r-foreground"
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
            <ul className="h-40 pl-1 overflow-auto">
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
                      // articleIndex === null &&
                      itemIndex === sourceIndex &&
                      categoryIndex === sourceCategoryIndex
                        ? "bg-blue-600"
                        : "bg-background hover:bg-blue-600"
                    }
                    onClick={() => {
                      setSourceIndex(itemIndex);
                      setSourceCategoryIndex(categoryIndex);
                      setSelectedSourceName(item.title);
                      setFeedURL(item.url);
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
