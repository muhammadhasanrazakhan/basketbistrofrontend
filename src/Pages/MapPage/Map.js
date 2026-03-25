import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStores } from '../../actions/storeAction';
import './Map.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icon Fix
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Red Icon for shops
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Alag se handler component
const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const Map = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user || {});
  const { stores } = useSelector((state) => state.stores || {});

  // Default position: use passed location state if available, otherwise Karachi University default
  const initialPosition = location.state?.lat ? [location.state.lat, location.state.lng] : [24.9407, 67.1141];
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    document.title = 'Select Store Location | Basket Bistro';
    if (!stores || stores.length === 0) {
      dispatch(getStores());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Container className="map-page-wrapper">
      <div className="map-page-container">
        <MapContainer
          center={position}
          zoom={13}
          className="map-leaflet-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <LocationMarker position={position} setPosition={setPosition} />

          {stores && stores.map((store) => {
            if (store.location && store.location.lat && store.location.lng) {
              return (
                <Marker key={store._id} position={[store.location.lat, store.location.lng]} icon={redIcon}>
                  <Tooltip permanent direction="top" offset={[0, -40]}>{store.name}</Tooltip>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>

        {isAuthenticated && (
          <div className="map-button-container">
            <button
              onClick={() => {
                const previousState = location.state || {};
                navigate('/create-store', {
                  state: {
                    ...previousState,
                    lat: position[0],
                    lng: position[1]
                  }
                });
              }}
              style={{
                padding: '12px 30px',
                backgroundColor: '#198754',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              Set Your Store Location
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Map;