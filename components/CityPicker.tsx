import React, { useState } from 'react';
import { Country, City } from 'country-state-city';
import Select from 'react-select';
import { count } from 'console';

type option = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);

  return (
    <div>
      <Select options={options} />
    </div>
  );
}

export default CityPicker;
