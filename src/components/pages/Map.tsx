/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import ReactMapGL, {
  GeolocateControl,
  ViewportProps,
  PointerEvent
} from 'react-map-gl';
import axios from 'axios';
// Components
import InfoModal from '../InfoModal';

// Types
import { WikiSummary, WeatherData, Location } from '../../types/map.types';

// Styles
import 'mapbox-gl/dist/mapbox-gl.css';

declare module 'react-map-gl' {
  interface PointerEvent {
    offsetCenter: {
      x: number;
      y: number;
    };
  }
}

const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN || '';
const mapboxApiBase = process.env.REACT_APP_MAPBOX_API_BASE || '';
const darkskyToken = process.env.REACT_APP_DARKSKY_TOKEN || '';
const darkskyApiBase = process.env.REACT_APP_DARKSKY_API_BASE || '';
const darkskyOptions =
  '?exclude=currently,minutely,hourly,alerts,flags&units=auto';
const corsProxy = process.env.REACT_APP_CORS_PROXY || '';
const wikiUrl = process.env.REACT_APP_WIKIPEDIA_SUMMARY_BASE_URL || '';
const wikiRelatedUrl = process.env.REACT_APP_WIKIPEDIA_RELATED_BASE_URL || '';

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

  const [modalData, setModalData] = useState({
    cursorX: 0,
    cursorY: 0,
    mapHeight: 0,
    mapWidth: 0
  });

  const [isOpen, setIsOpen] = useState(false);

  const [wikiSummary, setWikiSummary] = useState<{
    place: WikiSummary;
    country: WikiSummary;
  }>({
    place: {
      type: '',
      thumbnail: {
        source: '',
        width: 0,
        height: 0
      },
      description: '',
      extract: ''
    },
    country: {
      type: '',
      thumbnail: {
        source: '',
        width: 0,
        height: 0
      },
      description: '',
      extract: ''
    }
  });

  const [locationData, setLocationData] = useState<Location>({
    data: {
      type: '',
      query: [],
      features: []
    }
  });

  const [weatherData, setWeatherData] = useState<WeatherData>({
    daily: {
      summary: '',
      icon: '',
      data: [
        {
          time: 0,
          summary: '',
          icon: '',
          temperatureHigh: 0,
          temperatureLow: 0,
          precipProbability: 0,
          precipType: ''
        }
      ]
    }
  });

  const [loading, setLoading] = useState(true);

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
  ): Promise<Location> => {
    try {
      const place = await axios.get(
        `${mapboxApiBase}/${longitude},${latitude}.json?types=place,country&access_token=${mapboxToken}`
      );

      return place;
    } catch (err) {
      return err;
    }
  };

  const getWikiInfo = async (searchTerm: string): Promise<WikiSummary> => {
    const wikiTitle = searchTerm
      .replace(/\s/g, '_')
      .replace(/[ÅÄ]/g, 'A')
      .replace(/[åä]/g, 'a')
      .replace(/Ö/g, 'O')
      .replace(/ö/g, 'o');

    try {
      const searchResult = await axios.get(`${wikiUrl}/${wikiTitle}`);

      if (searchResult.data.type === 'disambiguation') {
        const relatedData = await axios.get(`${wikiRelatedUrl}/${wikiTitle}`);

        return relatedData.data.pages[0];
      }

      return searchResult.data;
    } catch (err) {
      return err;
    }
  };

  const getWeatherData = async (
    longitude: number,
    latitude: number
  ): Promise<WeatherData> => {
    try {
      const weather = await axios.get(
        `${corsProxy}${darkskyApiBase}/${darkskyToken}/${latitude},${longitude}/${darkskyOptions}`
      );

      return weather.data;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      _onViewportChange(viewport);
    });
  });

  const handleClick = async (e: PointerEvent): Promise<void> => {
    setModalData({
      cursorX: e.offsetCenter.x,
      cursorY: e.offsetCenter.y,
      mapHeight: e.target.clientHeight,
      mapWidth: e.target.clientWidth
    });
    setIsOpen(true);
    setLoading(true);
    setLocationData({
      data: {
        type: '',
        query: [],
        features: []
      }
    });
    const adjustedLngLat: number[] =
      viewport.zoom < 7
        ? [Number(e.lngLat[0].toFixed(4)), Number(e.lngLat[1].toFixed(4))]
        : [e.lngLat[0], e.lngLat[1]];

    console.log(adjustedLngLat);
    try {
      const locationName = await getLocationData(
        adjustedLngLat[0],
        adjustedLngLat[1]
      );
      console.log(locationName);

      const placeSearchTerm =
        locationName.data.features.length > 0
          ? locationName.data.features[0].text
          : '';
      const countrySearchTerm =
        locationName.data.features.length > 1
          ? locationName.data.features[1].text
          : locationName.data.features.length > 0
          ? locationName.data.features[0].text
          : '';

      const [
        placeSearchResult,
        countrySearchResult,
        weatherData
      ] = await Promise.all([
        getWikiInfo(placeSearchTerm),
        getWikiInfo(countrySearchTerm),
        getWeatherData(e.lngLat[0], e.lngLat[1])
      ]);

      setWikiSummary({
        country: { ...countrySearchResult },
        place: { ...placeSearchResult }
      });
      setWeatherData({ ...weatherData });
      setLocationData(locationName);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
        onClick={(e): Promise<void> => handleClick(e)}
      >
        <div className="geolocate-control">
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        </div>
      </ReactMapGL>
      {isOpen ? (
        <InfoModal
          {...modalData}
          weatherData={weatherData}
          wikiSummary={wikiSummary}
          isOpen={isOpen}
          location={locationData}
          loading={loading}
          setIsOpen={setIsOpen}
        />
      ) : null}
    </div>
  );
};

export default Map;
