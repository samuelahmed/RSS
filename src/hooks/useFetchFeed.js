import { useEffect } from "react";
import { sortItemsByDate } from "../utils";

export default function useFetchFeed({ selectedSource, setFetchedFeed }) {
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
}
