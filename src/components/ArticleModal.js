import ReactPlayer from "react-player";
import Link from "next/link";
import DOMPurify from "dompurify";
import {
  createImageLoaderSet,
  checkIfContainsImage,
  formatDate,
  timeAgo,
} from "../utils";

export default function DisplayModal({
  showModal,
  setShowModal,
  selectedArticle,
}) {
  
  const imgLoaderSet = createImageLoaderSet(selectedArticle);
  const containsImage = checkIfContainsImage(
    selectedArticle?.["content:encoded"] || "",
    Array.from(imgLoaderSet)
  );

  return (
    <>
      {showModal && selectedArticle ? (
        <>
          <div
            id="modal"
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="shadow-lg relative flex flex-col w-full h-full bg-[rgb(26,26,26)] border-white border-2 text-gray-200 outline-none focus:outline-none overflow-auto scrollbar p-2"
            >
              {/* modal content */}
              <div className="space-y-2">
                {/* invisible button to focus on modal */}
                <button
                  style={{ opacity: 0, position: "absolute" }}
                  autoFocus
                />

                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-0 px-2"
                >
                  close [esc]
                </button>
                {/* Date & Title */}
                <p>
                  {formatDate(selectedArticle)} - {timeAgo(selectedArticle)}
                </p>

                <p className="text-center">
                  {selectedArticle &&
                  selectedArticle.title &&
                  typeof selectedArticle.title === "string"
                    ? selectedArticle.title
                    : selectedArticle?.title?._}
                </p>
                {/* Read more */}
                {selectedArticle?.link?.href ? (
                  <Link
                    className="text-blue-500"
                    href={selectedArticle?.link?.href}
                    target="_blank"
                  >
                    Read more
                  </Link>
                ) : (
                  selectedArticle?.link && (
                    <Link
                      className="text-blue-500"
                      href={selectedArticle?.link}
                      target="_blank"
                    >
                      Read more
                    </Link>
                  )
                )}
                {/* Description */}
                <p
                  className="text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      selectedArticle?.["media:group"]?.["media:description"] ||
                        ""
                    )
                      //regEx to format youtube vid descriptions
                      .replace(/\n/g, "<br>"),
                  }}
                ></p>
                <p
                  className="text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      typeof selectedArticle?.content === "string"
                        ? selectedArticle?.content
                        : selectedArticle?.content?._ || ""
                    )
                      //regEx to format descriptions
                      .replace(/\n\n/g, "<br>")
                      .replace(/\n/g, " "),
                  }}
                ></p>
                <p
                  className="text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      typeof selectedArticle?.summary === "string"
                        ? selectedArticle?.summary
                        : selectedArticle?.summary?._ || ""
                    ),
                  }}
                ></p>
                <p
                  className="text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      typeof selectedArticle?.description === "string"
                        ? selectedArticle?.description
                        : selectedArticle?.description?._ || ""
                    ) //regEx to add spacing between paragraphs
                      .replace(/<p>/g, "<p>")
                      .replace(/<\/p>/g, "</p><br>"),
                  }}
                ></p>
                {/* Image */}
                {!containsImage &&
                  Array.from(imgLoaderSet).map(
                    (url) =>
                      url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={url}
                          src={url}
                          alt={
                            typeof selectedArticle.title === "string"
                              ? selectedArticle.title
                              : selectedArticle.title._
                          }
                          className="w-full h-auto"
                        />
                      )
                  )}

                {/* Media */}
                {selectedArticle?.link?.href && (
                  <ReactPlayer
                    controls={true}
                    url={selectedArticle?.link?.href}
                  />
                )}
                {selectedArticle?.["media:group"]?.link?.href && (
                  <ReactPlayer
                    controls={true}
                    url={selectedArticle?.["media:group"]?.link?.href}
                  />
                )}
                {selectedArticle?.enclosure?.url && (
                  <ReactPlayer
                    controls={true}
                    url={selectedArticle?.enclosure?.url}
                  />
                )}
                {/* Content */}
                {selectedArticle?.["content:encoded"] && (
                  <div
                    className="text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        selectedArticle["content:encoded"]
                          //regEx to add spacing between paragraphs
                          .replace(/<p>/g, "<p>")
                          .replace(/<\/p>/g, "</p><br>")
                      ),
                    }}
                  />
                )}
                {/* Comments  */}
                {selectedArticle?.comments && (
                  <a
                    className="text-blue-500"
                    href={selectedArticle.comments}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View comments
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
