document.addEventListener("DOMContentLoaded", function() {
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        let lat = parseFloat(params.get("lat"));
        let lon = parseFloat(params.get("lon"));
        let zoom = parseInt(params.get("zoom")) || 12;
        let style = params.get("style") || "urban";
    
        if (isNaN(lat) || isNaN(lon)) {
            console.error("Invalid lat/lon from URL:", lat, lon);
            lat = 40.7128; // Default to NYC
            lon = -74.0060;
        }
    
        return { lat, lon, zoom, style };
    }    

    function loadStaticMap() {
        const { lat, lon, zoom, style } = getQueryParams();

        let map = L.map('staticMap', {
            attributionControl: false,
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false
        }).setView([lat, lon], zoom);

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

        if (style === 'urban') {
            urbanLayer.addTo(map);
        } else {
            terrainLayer.addTo(map);
        }
    }

    function goBack() {
        window.history.back();
    }

    function buyMap() {
        alert("Redirecting to checkout... (You can integrate Shopify or another payment gateway here.)");
    }

    loadStaticMap();
    window.goBack = goBack;
    window.buyMap = buyMap;
});
