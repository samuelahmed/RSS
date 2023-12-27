"use client";

import { useState } from "react";
import Sources from "./Sources";
import Header from "./Header";
import Footer from "./Footer";
import Feed from "./Feed";
import ArticleModal from "./ArticleModal";

export default function AppContainer() {
  //States of currently selected source
  const [selectedSourceName, setSelectedSourceName] = useState("");
  const [serverData, setServerData] = useState(null);
  //this is the index in the feed, it has to be passed since sources is using it turn off keyboard nav when a feed is selected
  const [articleIndex, setArticleIndex] = useState(null);

  //to pass data to modal
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [selectedSourceFeed, setSelectedSourceFeed] = useState([]);

  return (
    <div>
      <Header selectedSourceName={selectedSourceName} />
      <main className="pt-6 flex flex-row ">
        <div className="w-1/3 md:w-1/5">
          <Sources
            setSelectedSourceName={setSelectedSourceName}
            selectedSourceName={selectedSourceName}
            setServerData={setServerData}
            articleIndex={articleIndex}
            setArticleIndex={setArticleIndex}
            setSelectedSourceFeed={setSelectedSourceFeed}
            setShowModal={setShowModal}
            showModal={showModal}
            setSelectedArticle={setSelectedArticle}
            selectedSourceFeed={selectedSourceFeed}

          />
        </div>
        <div className="w-2/3 md:w-4/5">
          <Feed
            serverData={serverData}
            articleIndex={articleIndex}
            setArticleIndex={setArticleIndex}
            setSelectedArticle={setSelectedArticle}
            setShowModal={setShowModal}
            selectedSourceFeed={selectedSourceFeed}
            setSelectedSourceFeed={setSelectedSourceFeed}
          />
        </div>
        <ArticleModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedArticle={selectedArticle}
        />
      </main>
      <Footer />
    </div>
  );
}
