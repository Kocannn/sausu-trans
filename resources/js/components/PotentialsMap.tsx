import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon issue
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

type Potential = {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string | null;
    latitude: string | null;
    longitude: string | null;
    address: string | null;
};

type Props = {
    potentials: Potential[];
    formatCategory: (cat: string) => string;
};

export default function PotentialsMap({ potentials, formatCategory }: Props) {
    const mapPotentials = potentials.filter(p => p.latitude && p.longitude);
    
    const mapCenter: [number, number] = mapPotentials.length > 0 
        ? [Number(mapPotentials[0].latitude), Number(mapPotentials[0].longitude)]
        : [-1.0670076372114662, 120.45049563023198];

    // Batasan wilayah (Bounding Box) untuk desa Sausu Trans
    const sausuBounds: L.LatLngBoundsExpression = [
        [-1.0948119764170676, 120.43749686434069], // Koordinat Barat Daya (South-West)
        [-1.0392032980058648, 120.46349439612327]  // Koordinat Timur Laut (North-East)
    ];

    return (
        <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={false}
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
            {mapPotentials.map(item => (
                <Marker 
                    key={item.id} 
                    position={[Number(item.latitude), Number(item.longitude)]}
                >
                    <Popup>
                        <div className="p-1 max-w-[200px]">
                            {item.image && (
                                <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-24 object-cover mb-2 border border-slate-200" />
                            )}
                            <h4 className="font-bold text-slate-900 mb-1">{item.name}</h4>
                            <p className="text-xs text-slate-500 mb-2 line-clamp-2">{item.description}</p>
                            <span className="text-[10px] font-bold uppercase bg-amber-50 text-amber-700 px-2 py-0.5 border border-amber-200">
                                {formatCategory(item.category)}
                            </span>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
