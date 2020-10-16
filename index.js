const VIENNA_COORDINATES = [48.220033, 16.373449];

/**
 * Initializes the map and creates the district polygons.
 */
(async () => {
    const myMap = L.map('map', { scrollWheelZoom: false, minZoom: 12 })
        .setView(VIENNA_COORDINATES, 12);
    const districtData = await getDistrictData();
    createDistrictPolygons(districtData).addTo(myMap);;
})();

/**
 * Creates the polygons representing the districts of vienna.
 * The GeoJSON data is parsed by the built-in geoJSON-function 
 * of the leaflet framework.
 * Each district is assigned a tooltip that contains data about it.
 * @param {Object} data 
 */
function createDistrictPolygons(data) {
    return L.geoJSON(data, {
        style() {
            return { color: '#808080', width: 2 };
        },
        onEachFeature(feature, layer) {
            layer.bindTooltip(`<b>${feature.properties.NAMEK_NUM}</b><br/>
            Fläche: ${feature.properties.UMFANG}m²`);
            layer.on('mouseover', function () {
                this.setStyle({
                    'fillColor': '#0000ff'
                });
            });
            layer.on('mouseout', function () {
                this.setStyle({
                    'fillColor': '#808080'
                });
            });
        }
    })
}

/**
 * Gets the open data about the districts of vienna.
 * The is structured in GeoJSON-format.
 * Source: https://data.wien.gv.at
 */
function getDistrictData() {
    return new Promise(function (resolve, reject) {
        if (localStorage.getItem('districts')) {
            // return cached data
            resolve(JSON.parse(localStorage.getItem('districts')));
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BEZIRKSGRENZEOGD&srsName=EPSG:4326&outputFormat=json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                localStorage.setItem('districts', xhr.responseText); // cache data
                resolve(JSON.parse(xhr.responseText));
            }
            else {
                reject({ status: xhr.status, statusText: xhr.statusText });
            }
        }; xhr.onerror = function () {
            reject({ status: xhr.status, statusText: xhr.statusText });
        };
        xhr.send();
    });

}