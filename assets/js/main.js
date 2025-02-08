document.addEventListener("DOMContentLoaded", function () {
    let map = L.map('map', { attributionControl: false, zoomControl: false }).setView([40.7128, -74.0060], 6);

    let urbanLayer = L.layerGroup([
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 20
        }),
        L.tileLayer('https://{s}.tile.stamen.com/toner-lines/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            opacity: 0.8
        })
    ]);

    let terrainLayer = L.layerGroup([
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            detectRetina: true
        })
    ]);

    urbanLayer.addTo(map); // Default style

    document.getElementById("locationInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            updateMap();
        }
    });

    function updateMap() {
        let location = document.getElementById("locationInput").value;
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let lat = parseFloat(data[0].lat);
                    let lon = parseFloat(data[0].lon);
                    let zoomLevel = data[0].boundingbox ? 10 : 12;
                    map.flyTo([lat, lon], zoomLevel, { animate: true, duration: 1.5 });
                } else {
                    alert("Location not found. Try again.");
                }
            })
            .catch(error => console.error('Error fetching location:', error));
    }

    function setMapStyle(style) {
        map.eachLayer(layer => map.removeLayer(layer));
        if (style === 'urban') {
            urbanLayer.addTo(map);
        } else if (style === 'terrain') {
            terrainLayer.addTo(map);
        }
    }

    function goToProductPage() {
        let center = map.getCenter();
        let zoom = map.getZoom();
        let style = document.querySelector('.style-button.active')?.innerText.toLowerCase() || 'urban';
        window.location.href = `product.html?lat=${center.lat}&lon=${center.lng}&zoom=${zoom}&style=${style}`;
    }

    window.setMapStyle = setMapStyle;
    window.updateMap = updateMap;
    window.goToProductPage = goToProductPage;
});
