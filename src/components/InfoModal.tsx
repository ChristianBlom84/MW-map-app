import React, { useEffect, Dispatch, SetStateAction } from 'react';
import Spinner from '../components/layout/Spinner';
import { WikiSummary, Location, WeatherData } from '../types/map.types';

interface Props {
  cursorX: number;
  cursorY: number;
  mapHeight: number;
  mapWidth: number;
  weatherData: WeatherData;
  wikiSummary: { place: WikiSummary; country: WikiSummary };
  isOpen: boolean;
  location: Location;
  loading: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface DivStyle {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

const InfoModal: React.FC<Props> = (props: Props) => {
  const {
    loading,
    isOpen,
    location: {
      data: { features }
    },
    wikiSummary: { place, country },
    weatherData,
    mapHeight,
    mapWidth,
    cursorX,
    cursorY,
    setIsOpen
  } = props;

  const divStyle: DivStyle =
    cursorY / mapHeight > 0.5
      ? {
          bottom:
            mapHeight - cursorY > window.innerHeight
              ? mapHeight
              : mapHeight - cursorY
        }
      : {
          top: cursorY
        };
  if (cursorX / mapWidth > 0.5) {
    divStyle.right =
      mapWidth - cursorX > window.innerWidth ? mapWidth : mapWidth - cursorX;
  } else {
    divStyle.left = cursorX;
  }

  return isOpen && !loading && features.length > 0 ? (
    <div className="info-modal" style={divStyle}>
      <div className="flex align-center mb-4">
        <div>
          <h2>{features[0].text}</h2>
          <h3>{place.description}</h3>
        </div>
        <img className="flag" src={`${country.thumbnail.source}`} alt="" />
      </div>
      <div className="weather mb-2">
        <h3>Today&apos;s weather:</h3>
        <p>{weatherData.daily.summary}</p>
      </div>
      <div>
        <h3>{features[0].text} info:</h3>
        <p>{place.extract}</p>
      </div>
      <button type="button" onClick={(): void => setIsOpen(false)}>
        ×
      </button>
    </div>
  ) : features.length === 0 && !loading ? (
    <div className="info-modal" style={divStyle}>
      <h3>No place data found for that location!</h3>
      <div className="weather mb-2">
        <h3>Today&apos;s weather:</h3>
        <p>{weatherData.daily.summary}</p>
      </div>
      <button type="button" onClick={(): void => setIsOpen(false)}>
        ×
      </button>
    </div>
  ) : (
    <div className="info-modal" style={divStyle}>
      <Spinner />
      <button type="button" onClick={(): void => setIsOpen(false)}>
        ×
      </button>
    </div>
  );
};

export default InfoModal;
