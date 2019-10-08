import React, { Dispatch, SetStateAction } from 'react';
import Spinner from '../components/layout/Spinner';
import { WikiSummary, Location } from '../types/map.types';

interface Props {
  cursorX: number;
  cursorY: number;
  mapHeight: number;
  mapWidth: number;
  wikiSummary: WikiSummary;
  isOpen: boolean;
  location: Location;
  loading: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const InfoModal: React.FC<Props> = (props: Props) => {
  const {
    loading,
    isOpen,
    location: {
      data: { features }
    },
    wikiSummary: { thumbnail, description, extract }
  } = props;

  console.log(features[0]);
  console.log(extract);

  const divStyle = {
    top: props.cursorY,
    left: props.cursorX
  };

  return isOpen && !loading ? (
    <div className="info-modal" style={divStyle}>
      <h2>{features[0].text}</h2>
      <img src={`${thumbnail.source}`} alt="" />
    </div>
  ) : (
    <div className="info-modal" style={divStyle}>
      <Spinner />
    </div>
  );
};

export default InfoModal;
