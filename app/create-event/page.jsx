"use client"; // This enables client-side rendering (needed for form submission)
import { useState } from "react";
import { useRouter } from "next/navigation"; // For routing

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    venue: "",
  });

  const router = useRouter(); // For redirecting after event creation

  // Handles input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Creating a unique id and random image number
    const newEvent = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99) + 1}.jpg`,
    };

    try {
      const response = await fetch("https://qevent-backend.labs.crio.do/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.status === 201) {
        router.push("/events"); // Redirect to events page after successful creation
      } else {
        alert("Event creation failed.");
      }
    } catch (error) {
      alert("Event creation failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create a New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-lg font-medium">
            Event Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="venue" className="block text-lg font-medium">
            Event Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            required
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-teal-600 text-white py-2 rounded-md font-medium hover:opacity-70"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

