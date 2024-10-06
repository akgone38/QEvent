import ArtistCard from '../../components/ArtistCard.jsx';

// This is a server component, so no hooks like `useEffect` are needed
export default async function ArtistsPage() {
  try {
    const res = await fetch('https://qevent-backend.labs.crio.do/artists', {
      next: { revalidate: 60 }, // Revalidate cache every 60 seconds (optional ISR)
    });

    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }

    const artists = await res.json(); // Parse the response data
    
    console.log('Fetched artists:', artists); // Debugging: Check the fetched artist

    if (!Array.isArray(artists)) {
      throw new Error('Invalid data format: Expected an array');
    }

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.length > 0 ? (
            artists.map((artistData) => (
              <ArtistCard key={artistData.id} artistData={artistData} />
            ))
          ) : (
            <p>No artist available</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return <p>Error loading events: {error.message}</p>;
  }
}
