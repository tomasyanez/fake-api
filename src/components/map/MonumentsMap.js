import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import { fetchJson, fetchCsv } from './fetchData';
import { formatNumber } from './formatting';

const useStyles = makeStyles((theme) => ({
    popup: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const MonumentsMap = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [geoData, setGeoData] = useState([]);
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        const geoJsonUrl = 'https://cswcl.github.io/fake-api/monumentos_historicos_extracto.geojson';
        const csvUrl = 'http://cswcl.github.io/fake-api/monumentos_historicos_extracto.csv';

        Promise.all([fetchJson(geoJsonUrl), fetchCsv(csvUrl)]).then(values => { 
            const geoData = values[0];
            const csvData = values[1];
            setGeoData(geoData);
            setCsvData(csvData);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {!loading? (
                <Map bounds={geoData.map(mapPoint => mapPoint.coordinates)} >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    {geoData.map(mapPoint => {
                        const coordinates = mapPoint.coordinates;
                        return (
                        <Marker position={coordinates} key={mapPoint.id}>
                            <Popup>
                                <div className={classes.popup}>
                                    {csvData.filter(item => item.id === mapPoint.id)[0].label}
                                    <br />
                                    Lat.:{formatNumber(coordinates[0])},Long.{formatNumber(coordinates[1])}
                                </div>
                            </Popup>
                        </Marker>
                        );
                    })}
                </Map>
            ): null}
        </div>
    );
};

export default MonumentsMap;

