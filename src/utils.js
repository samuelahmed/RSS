export function sortItemsByDate(a, b) {
  const aDate = new Date(a.pubDate || a.published || a.updated);
  const bDate = new Date(b.pubDate || b.published || b.updated);
  return bDate - aDate;
}

export function getCurrentTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatDate(item) {
  const dateStr =
    item.published || item.pubDate || item.updated || item["dc:date"];
  const date = new Date(dateStr);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return formattedDate;
}

export function createImageLoaderSet(selectedArticle) {
  return new Set([
    selectedArticle?.enclosure?.url,
    selectedArticle?.["media:content"]?.url,
    selectedArticle?.image?.url,
  ]);
}

export function checkIfContainsImage(htmlContent, imageUrls) {
  return imageUrls.some((url) => htmlContent.includes(url));
}

export function timeAgo(item) {
  const now = new Date();
  const publishedDate = new Date(
    item.published || item.pubDate || item.updated || item["dc:date"]
  );
  const diffInSeconds = Math.abs(
    (now.getTime() - publishedDate.getTime()) / 1000
  );
  const units = [
    { name: "year", seconds: 60 * 60 * 24 * 365 },
    { name: "month", seconds: 60 * 60 * 24 * 30 },
    { name: "day", seconds: 60 * 60 * 24 },
    { name: "hour", seconds: 60 * 60 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];
  for (let unit of units) {
    if (diffInSeconds >= unit.seconds) {
      const amount = Math.floor(diffInSeconds / unit.seconds);
      return `${amount} ${unit.name}${amount > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}
