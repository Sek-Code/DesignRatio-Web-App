import { useEffect } from "react";
import L from "leaflet";

export default function GenerationMap() {
  useEffect(() => {
    const map = L.map("map").setView([13.7537679, 100.5314902], 19);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.google.com/maps/place/%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%87%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C/@13.7537679,100.5314902,18z/data=!3m1!4b1!4m6!3m5!1s0x30e29f3a19f61fed:0xacd8af8b022d88f0!8m2!3d13.7537679!4d100.5314902!16s%2Fg%2F11f62vsl4d?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D">OpenStreetMap</a>',
    }).addTo(map);
    L.marker([13.7537679, 100.5314902]).addTo(map);
    return () => map.remove();
  }, []);

  return (
    <div id="map" className="w-[75%] md:w-[40%] h-100 rounded-xl shadow" />
  );
}
