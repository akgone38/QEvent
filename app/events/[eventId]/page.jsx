"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const { eventId } = useParams(); // Get eventId from the dynamic route
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch event details");
        }

        const data = await res.json();
        setEventData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (error) {
    return <p>Error loading event details: {error}</p>;
  }

  if (!eventData) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">{eventData.name}</h1>
      <img src={eventData.image} alt={eventData.name} className="w-full h-auto mb-4" />
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">
          <strong>Date:</strong> {new Date(eventData.date).toDateString()}
        </p>
        <p className="text-lg">
          <strong>Time:</strong> {eventData.time}
        </p>
      </div>
      <div className="mb-4">
        <strong>Location:</strong> {eventData.location}
      </div>
      <div className="mb-4">
        <strong>Artist:</strong> {eventData.artist}
      </div>
      <div className="mb-4">
        <strong>Price:</strong> {eventData.price > 0 ? `$${eventData.price.toLocaleString()}` : "FREE"}
      </div>
      <div>
        <strong>Description:</strong> <p>{eventData.description}</p>
      </div>
      <div className="flex gap-2 mt-6">
        {eventData?.tags?.map((tag) => (
          <div key={tag} className="bg-orange-400 text-white rounded-full px-3 py-1">
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}
