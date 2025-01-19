// import { useEffect, useRef } from 'react';
// import { Box } from '@mui/material';
// import mapboxgl from 'mapbox-gl';

// // Set Mapbox access token
// mapboxgl.accessToken = import.meta.env.VITE_TOKEN;

// const Map = ({ center }) => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const marker = useRef(null);

//   useEffect(() => {
//     if (center.lat !== 0 && center.lng !== 0) {
//       if (!map.current) {
//         // Initialize the map if it doesn't exist
//         map.current = new mapboxgl.Map({
//           container: mapContainer.current,
//           style: 'mapbox://styles/mapbox/standard-satellite',
//           center: [center.lng, center.lat],
//           zoom: 12,
//         });
//       } else {
//         // Update the map center if the map already exists
//         map.current.setCenter([center.lng, center.lat]);
//       }

//       // Remove the existing marker if it exists
//       if (marker.current) {
//         marker.current.remove();
//       }

//       // Add a new marker for the searched city
//       marker.current = new mapboxgl.Marker()
//         .setLngLat([center.lng, center.lat])
//         .addTo(map.current);
//     }
//   }, [center]);

//   return (
//     <Box
//       ref={mapContainer}
//       sx={{ height: '400px', width: '100%', marginBottom: 3 }}
//     />
//   );
// };

// export default Map;

import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL CSS

// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_TOKEN;

const Map = ({ center, activities }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (center.lat !== 0 && center.lng !== 0) {
      if (!map.current) {
        // Initialize the map if it doesn't exist
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12', // Changed to a standard style
          center: [center.lng, center.lat],
          zoom: 12,
          pitchWithRotate: false, // Disable pitch with rotate to prevent style evaluation issues
        });

        // Add navigation control
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      } else {
        // Update the map center if the map already exists
        map.current.setCenter([center.lng, center.lat]);
      }

      // Wait for map to load before adding markers
      map.current.once('load', () => {
        // Clear existing markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        // Add main city marker
        const cityMarker = new mapboxgl.Marker({ 
          color: '#FF0000',
          scale: 1.2 // Make city marker slightly larger
        })
          .setLngLat([center.lng, center.lat])
          .addTo(map.current);
        
        // Add popup for city marker
        const cityPopup = new mapboxgl.Popup({ 
          offset: 25,
          closeButton: false,
          closeOnClick: true
        })
          .setHTML('<div style="padding: 8px;"><strong>City Center</strong></div>');
        
        cityMarker.setPopup(cityPopup);
        markers.current.push(cityMarker);

        // Add markers for activities if they have coordinates
        if (activities && activities.length > 0) {
          activities.forEach((activity, index) => {
            if (activity.coordinates?.lat && activity.coordinates?.lng) {
              // Create popup content with improved styling
              const popupContent = `
                <div style="padding: 8px; max-width: 200px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 14px;">${activity.name}</h3>
                  <p style="margin: 0 0 4px 0; font-size: 12px;">${activity.address}</p>
                  ${activity.rating ? `
                    <p style="margin: 0; font-size: 12px;">
                      Rating: <strong>${activity.rating}</strong>
                    </p>` : ''}
                </div>
              `;

              // Create popup
              const popup = new mapboxgl.Popup({ 
                offset: 25,
                closeButton: false,
                closeOnClick: true,
                maxWidth: '300px'
              })
                .setHTML(popupContent);

              // Create marker with different color for activities
              const activityMarker = new mapboxgl.Marker({ 
                color: '#4B0082',
                scale: 0.9 // Make activity markers slightly smaller than city marker
              })
                .setLngLat([activity.coordinates.lng, activity.coordinates.lat])
                .setPopup(popup)
                .addTo(map.current);

              markers.current.push(activityMarker);
            }
          });

          // Adjust bounds to fit all markers if there are activities
          if (markers.current.length > 1) {
            const bounds = new mapboxgl.LngLatBounds();
            markers.current.forEach(marker => {
              bounds.extend(marker.getLngLat());
            });
            map.current.fitBounds(bounds, {
              padding: { top: 50, bottom: 50, left: 50, right: 50 },
              maxZoom: 15,
              duration: 1000 // Smooth animation
            });
          }
        }
      });
    }

    // Cleanup function
    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [center, activities]);

  return (
    <Box
      ref={mapContainer}
      sx={{ 
        height: '400px', 
        width: '100%', 
        marginBottom: 3,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    />
  );
};

export default Map;