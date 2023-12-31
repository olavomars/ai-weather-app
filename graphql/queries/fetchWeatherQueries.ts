import { gql } from '@apollo/client';

const fetchWeatherQuery = gql`
  query MyQuery(
    $current_weather: String
    $daily: String = "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max"
    $hourly: String = "temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky"
    $latitude: String!
    $longitude: String!
    $timezone: String!
  ) {
    myQuery(
      current_weather: $current_weather
      daily: $daily
      latitude: $latitude
      hourly: $hourly
      longitude: $longitude
      timezone: $timezone
    ) {
      current_weather {
        is_day
        temperature
        weathercode
        time
        winddirection
        windspeed
      }
      daily {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      daily_units {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        time
        temperature_2m_min
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      elevation
      generationtime_ms
      hourly {
        apparent_temperature
        windgusts_10m
        uv_index_clear_sky
        uv_index
        time
        temperature_2m
        showers
        snow_depth
        snowfall
        relativehumidity_2m
        rain
        precipitation_probability
        precipitation
      }
      utc_offset_seconds
      timezone_abbreviation
      timezone
      longitude
      latitude
      hourly_units {
        windgusts_10m
        uv_index_clear_sky
        uv_index
        temperature_2m
        time
        snowfall
        snow_depth
        showers
        relativehumidity_2m
        rain
        precipitation_probability
        precipitation
        apparent_temperature
      }
    }
  }
`;

export default fetchWeatherQuery;
