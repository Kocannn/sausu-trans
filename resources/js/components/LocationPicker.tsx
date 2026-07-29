import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon issue with webpack/vite
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

type Props = {
    latitude: string | number | null;
    longitude: string | number | null;
    onChange: (lat: number, lng: number) => void;
};

const defaultCenter: [number, number] = [-1.0670076372114662, 120.45049563023198]; // Default coordinate around Sausu Trans or general area

// Batasan wilayah (Bounding Box) untuk desa Sausu Trans
// Ini mencegah pengguna menggeser peta terlalu jauh keluar dari area.
const sausuBounds: L.LatLngBoundsExpression = [
    [-1.0948119764170676, 120.43749686434069], // Koordinat Barat Daya (South-West)
    [-1.0392032980058648, 120.46349439612327]  // Koordinat Timur Laut (North-East)
];

function MapEvents({ onChange }: { onChange: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onChange(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function LocationPicker({ latitude, longitude, onChange }: Props) {
    const [position, setPosition] = useState<[number, number] | null>(
        latitude && longitude ? [Number(latitude), Number(longitude)] : null
    );

    useEffect(() => {
        if (latitude && longitude) {
            setPosition([Number(latitude), Number(longitude)]);
        } else {
            setPosition(null);
        }
    }, [latitude, longitude]);

    const handleMapClick = (lat: number, lng: number) => {
        setPosition([lat, lng]);
        onChange(lat, lng);
    };

    return (
        <div className="h-[300px] w-full z-0 relative border border-slate-300">
            <MapContainer
                center={position || defaultCenter}
                zoom={position ? 15 : 13}
                scrollWheelZoom={true}
                maxBounds={sausuBounds}
                maxBoundsViscosity={1.0}
                minZoom={11}
                className="h-full w-full z-0"
                style={{ zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents onChange={handleMapClick} />
                {position && <Marker position={position} />}
            </MapContainer>
        </div>
    );
}
