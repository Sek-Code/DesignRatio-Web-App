import { useEffect } from "react";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css"; // ❗ ต้อง import CSS ด้วย

const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function GenerationMap() {
  useEffect(() => {
    const map = L.map("map").setView([13.7537679, 100.5314902], 19);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([13.7537679, 100.5314902]).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div
      id="map"
      className="w-[75%] lg:w-[40%] h-[500px] rounded-xl shadow" // ❗ ตั้งความสูงเป็น px
    />
  );
}
