/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import ReactMapGL, {
  GeolocateControl,
  ViewportProps,
  PointerEvent
} from 'react-map-gl';
import axios, { AxiosResponse } from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

type FeatureObject = {
  text: string;
};

type LocationResponse = {
  type: string;
  query: number[];
  features: FeatureObject[];
};

const token = process.env.REACT_APP_MAPBOX_TOKEN || '';
const apiBase = process.env.REACT_APP_MAPBOX_API_BASE || '';

const Map: React.FC = () => {
  const [viewport, setViewPort] = useState({
    width: window.innerWidth - 100,
    height: window.innerHeight - 100,
    latitude: 59.33258,
    longitude: 18.0649,
    zoom: 8,
    bearing: 0,
    pitch: 0,
    altitude: 0,
    maxZoom: 22,
    minZoom: 0,
    maxPitch: 0,
    minPitch: 0,
    transitionDuration: 0
  });

  const _onViewportChange = (viewport: ViewportProps): void =>
    setViewPort({
      ...viewport,
      width: window.innerWidth - 100,
      height: window.innerHeight - 100,
      transitionDuration: 100
    });

  const getLocationData = async (
    longitude: number,
    latitude: number
  ): Promise<any> => {
    const place = await axios.get(
      `${apiBase}/${longitude},${latitude}.json?types=place&access_token=${token}`
    );
    return place;
  };

  const getWikiInfo = async (searchTerm: string): Promise<object> => {
    const params = {
      action: 'query',
      list: 'search',
      srsearch: 'Nelson Mandela',
      format: 'json'
    };
    const searchResult = axios.get(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${searchTerm}`
    );

    return searchResult;
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      _onViewportChange(viewport);
    });
  });

  const handleClick = async (e: PointerEvent): Promise<any> => {
    const locationName = await getLocationData(e.lngLat[0], e.lngLat[1]);
    console.log(locationName);
    const searchTerm = locationName.data.features[0].text;
    const searchResult = await getWikiInfo(searchTerm);
  };

  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
        onClick={e => handleClick(e)}
      >
        <div className="geolocate-control">
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        </div>
      </ReactMapGL>
    </div>
  );
};

export default Map;
