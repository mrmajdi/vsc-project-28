import React, { useEffect, useState, useRef } from 'react';

interface Provider {
  id?: string;
  name: string;
  lat: number;
  lng: number;
}

interface ProviderMapProps {
  providers: Provider[];
  center?: [number, number];
  zoom?: number;
}

const ProviderMap: React.FC<ProviderMapProps> = ({
  providers,
  center = [0, 0],
  zoom = 2,
}) => {
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import react-leaflet and leaflet to avoid SSR issues
    Promise.all([
      import('react-leaflet'),
      import('leaflet'),
    ])
      .then(([reactLeaflet, leaflet]) => {
        // Fix Leaflet's icon loading issue when bundled with webpack/vite
        delete leaflet.Icon.Default.prototype._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });

        setMapContainer(reactLeaflet.MapContainer);
        setTileLayer(reactLeaflet.TileLayer);
        setMarker(reactLeaflet.Marker);
        setPopup(reactLeaflet.Popup);
      })
      .catch(err => {
        console.error('Failed to load Leaflet dependencies:', err);
      });
  }, []);

  if (!MapContainer) {
    return <div>Loading map…</div>;
  }

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {providers.map((provider, index) => (
        <Marker key={index} position={[provider.lat, provider.lng]}>
          <Popup>
            <strong>{provider.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ProviderMap;