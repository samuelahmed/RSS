"use client";

import { useState } from "react";
import Sources from "./Sources";
import Header from "./Header";
import Footer from "./Footer";
import Feed from "./Feed";
import ArticleModal from "./ArticleModal";
import useFetchFeed from "@/hooks/useFetchFeed";
import useKeyboardNavActive from "@/hooks/useKeyboardNavActive";

export default function AppContainer() {
  const [fetchedFeed, setFetchedFeed] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState({
    name: "",
    url: null,
    feed: [],
  });
  const [selectedArticle, setSelectedArticle] = useState({
    index: null,
    content: {},
  });

  useFetchFeed({ selectedSource, setFetchedFeed });
  const keyboardNavActive = useKeyboardNavActive();

  return (
    <div className="h-screen overscroll-none overflow-hidden">
      <Header
        selectedSourceFeedLength={selectedSource.feed.length}
        selectedSourceName={selectedSource.name}
      />
      <main
        className={`pt-6 flex flex-row ${
          keyboardNavActive ? "keyboard-nav" : ""
        }`}
      >
        <div className="w-1/3 md:w-1/5">
          <Sources
            selectedSourceURL={selectedSource.url}
            setSelectedSource={setSelectedSource}
          />
        </div>
        <div className="w-2/3 md:w-4/5">
          <Feed
            fetchedFeed={fetchedFeed}
            showModal={showModal}
            selectedSourceFeed={selectedSource.feed}
            selectedArticleIndex={selectedArticle.index}
            selectedSourceURL={selectedSource.url}
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
