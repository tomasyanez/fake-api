
const fetchJson = (url) => {
    return new Promise(resolve => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const features = data.features;
            const geoData = features.map(feature => {
                return {
                    id: feature.properties.id,
                    coordinates: feature.geometry.coordinates.reverse().slice(1),
                };
            });
            resolve(geoData);
        });
    });
};

const fetchCsv = (url) => {
    return new Promise(resolve => {
        fetch(url)
        .then(response => response.text())
        .then(data => {
            const lines = data.split(/\r?\n/).slice(1);
            const csvData = lines.filter(line => line.length !== 0).map(line => {
                const parsedLine = line.split(',');
                return {
                    id: parseInt(parsedLine[0]) ,
                    label: parsedLine[1]
                };
            });
            resolve(csvData);
        });
    });
};

export { fetchJson, fetchCsv };