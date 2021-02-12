import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Attraction from './Attraction';

const GetPath = () => {
  const { id } = useParams();

  useEffect(() => {
  }, [id]);
  return (
    <Attraction id={id} />
  );
};
export default GetPath;
