document.addEventListener("DOMContentLoaded", function () {

    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
        console.error("Map container not found!");
        return;
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoidGVjbm9sb2dpYy1qdiIsImEiOiJjbTZ3dmlhdmswbnhzMm1vcGZ1ZGViZnkxIn0.r8b94ML5Vkm7nSox91bdxw';

    const map = new mapboxgl.Map({
        container: 'map', // This should match your map <div> ID
        style: 'mapbox://styles/tecnologic-jv/cm6wwvj2500lx01sbcdp74mvy', // You can change the style
        center: [-74.006, 40.7128], // Default to New York City
        zoom: 12,
        logoPosition: false // Removes Mapbox logo
    });

    setTimeout(() => {
        map.resize(); // Forces Mapbox to re-render tiles properly
    }, 500);
});
