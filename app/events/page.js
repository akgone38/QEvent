"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventCard from '../../components/EventCard.jsx';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  // Get the 'tag' and 'artist' query params
  const tagQuery = searchParams.get("tag");
  const artistQuery = searchParams.get("artist");

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://qevent-backend.labs.crio.do/events', {
          next: { revalidate: 60 }, // Optional ISR (Incremental Static Regeneration)
        });

        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }

        const fetchedEvents = await res.json();

        // Filter events based on both 'tag' and 'artist' query params
        let filteredEvents = fetchedEvents;

        // Filter by tag if it exists in the query
        if (tagQuery) {
          filteredEvents = filteredEvents.filter(event =>
            Array.isArray(event.tags) && 
            event?.tags?.some(tag => tag.toLowerCase() === tagQuery.toLowerCase())
          );
        }

        // Filter by artist if it exists in the query
        if (artistQuery) {
          filteredEvents = filteredEvents.filter(event =>
            event?.artist?.toLowerCase() === artistQuery.toLowerCase()
          );
        }

        setEvents(filteredEvents);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, [tagQuery, artistQuery]); // Refetch when the query parameters change

  if (error) {
    return <p>Error loading events: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((eventData) => (
            <EventCard key={eventData.id} eventData={eventData} />
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
}
