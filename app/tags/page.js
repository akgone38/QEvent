"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tag from "../../components/Tag"; // Import your Tag component

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch tags data from the API
    const fetchTags = async () => {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/tags");

        if (!res.ok) {
          throw new Error("Failed to fetch tags");
        }

        const fetchedTags = await res.json();
        setTags(fetchedTags); // Set the fetched tags to state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTags(); // Call the fetch function on component mount
  }, []);

  if (error) {
    return <p>Error loading tags: {error}</p>;
  }
  const handleTagClick = (tag) => {
    // Navigate to the events page with the selected tag as query parameter
    router.push(`/events?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 w-full max-w-[1200px]"> {/* Updated width */}
        <h1 className="text-3xl font-bold mb-6 text-center">Explore Tags</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {tags.length > 0 ? (
            tags.map((tag) => (
              // <Tag key={tag.id} text={tag.name} /> // Render each tag using your Tag component
              <div key={tag.id} onClick={() => handleTagClick(tag.name)}>
                <Tag text={tag.name} />
              </div>
            ))
          ) : (
            <p>No tags available</p>
          )}
        </div>
      </div>
    </div>
  );
}
