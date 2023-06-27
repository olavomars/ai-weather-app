import React from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import CityPicker from './CityPicker';

type Props = {
  city: string;
  results: Root;
  lat: string;
  long: string;
};

const InformationPanel = ({ city, lat, long, results }: Props) => {
  return (
    <div className='bg-gradient-to-br from-[#394f68] to-[#183B7E] text-white p-10'>
      <div className='pb5'>
        <h1 className='text-6xl font-bold'>{decodeURI(city)}</h1>
        <p className='text-xs text-gray-400'>
          Long/Lat: {long}, {lat}
        </p>
      </div>

      <CityPicker />

      <hr className='my-10' />

      <div className='mt-5 flex items-center justify-between space-x-10 mb-5'>
        <div>
          <p className='text-xl'>
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <p className='font-extraligth'>
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>

        <p className='text-xl font-bold uppercase'>
          {new Date().toLocaleTimeString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default InformationPanel;
