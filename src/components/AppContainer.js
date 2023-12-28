"use client";

import { useState, useEffect } from "react";
import Sources from "./Sources";
import Header from "./Header";
import Footer from "./Footer";
import Feed from "./Feed";
import ArticleModal from "./ArticleModal";
import { sortItemsByDate } from "../utils";

export default function AppContainer() {
  
  const [fetchedFeed, setFetchedFeed] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState({
    name: "",
    url: "",
    feed: [],
  });
  const [selectedArticle, setSelectedArticle] = useState({
    index: null,
    content: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/getXML?feedUrl=${encodeURIComponent(selectedSource.url)}`
      );
      if (!response.ok) {
        console.error("Failed to fetch XML data");
        setFetchedFeed(null);
        return;
      }
      const data = await response.json();
      // If the feed is an Atom feed
      if (data.feed) {
        data.feed.entry.sort(sortItemsByDate);
        setFetchedFeed({ feed: { entry: data.feed.entry } });
        // If the feed is an RSS feed
      } else if (data.rss) {
        if (Array.isArray(data.rss.channel.item)) {
          data.rss.channel.item.sort(sortItemsByDate);
        }
        setFetchedFeed({ rss: { channel: { item: data.rss.channel.item } } });
        // If the feed is an RDF feed
      } else if (data["rdf:RDF"]) {
        const items = data["rdf:RDF"].item;
        if (Array.isArray(items)) {
          items.sort(sortItemsByDate);
        }
        setFetchedFeed({ rdf: { item: items } });
      }
    };
    // Fetch the data when the feedURL changes
    fetchData();
  }, [selectedSource.url]);

  return (
    <div>
      <Header selectedSourceName={selectedSource.name} />
      <main className="pt-6 flex flex-row ">
        <div className="w-1/3 md:w-1/5">
          <Sources setSelectedSource={setSelectedSource} />
        </div>
        <div className="w-2/3 md:w-4/5">
          <Feed
            fetchedFeed={fetchedFeed}
            selectedSourceFeed={selectedSource.feed}
            selectedArticleIndex={selectedArticle.index}
            setShowModal={setShowModal}
            setSelectedSource={setSelectedSource}
            setSelectedArticle={setSelectedArticle}
          />
        </div>
        <ArticleModal
          selectedArticle={selectedArticle.content}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </main>
      <Footer />
    </div>
  );
}
