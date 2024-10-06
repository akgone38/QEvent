import EventCard from "@/components/EventCard";
import SwiperComponent from "@/components/SwiperComponent";
import React from "react";
import { dummyEvents } from "@/constants/dummyEvents";

function App() {
  return (
    <div className="h-full">
      <SwiperComponent />

      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4">
        Explore Events
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-32 px-4">
        {dummyEvents.map((eventData) => (
          <EventCard eventData={eventData} />
        ))}
      </div>
      {/* <div className="flex items-center justify-around mt-8 mb-32">
        {dummyEvents.map((eventData) => (
          <EventCard eventData={eventData} />
        ))}
      </div> */}
    </div>
  );
}

export default App;
