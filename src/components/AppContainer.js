"use client";

import { useState } from "react";
import Sources from "./Sources";
import Header from "./Header";
import Footer from "./Footer";
import Feed from "./Feed";
import ArticleModal from "./ArticleModal";
import { sortItemsByDate } from "../utils";
import useFetchFeed from "@/hooks/useFetchFeed";

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

  useFetchFeed({ selectedSource, setFetchedFeed });
  

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
