export default function Header({
  selectedSourceName,
  selectedSourceFeedLength,
}) {
  return (
    <header className="border-b-2 border-b-foreground fixed top-0 w-full z-50 bg-background text-center">
      <div>
        {selectedSourceName ? selectedSourceName : "No Source Selected"}
        &nbsp;&nbsp;&nbsp;
        {selectedSourceFeedLength ? selectedSourceFeedLength + " items" : ""}
      </div>
    </header>
  );
}
