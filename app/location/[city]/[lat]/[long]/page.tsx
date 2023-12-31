import { getClient } from '@/apollo-client';
import CalloutCard from '@/components/CalloutCard';
import HumidityChart from '@/components/HumidityChart';
import InformationPanel from '@/components/InformationPanel';
import RainChart from '@/components/RainChart';
import StatCard from '@/components/StatCard';
import TempChart from '@/components/TempChart';
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries';
import cleanData from '@/lib/cleanData';
import getBasePath from '@/lib/getBasePath';

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: 'true',
      longitude: long,
      latitude: lat,
      timezone: 'GMT',
    },
  });

  const results: Root = data.myQuery;

  const dataToSendOpenAI = cleanData(results, city);

  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      weatherData: dataToSendOpenAI,
    }),
  });

  const GPTdata = await res.json();
  const { content } = GPTdata;

  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <InformationPanel city={city} results={results} lat={lat} long={long} />
      <div className='flex-1 p-5 lg:p-10'>
        <div className='pb-5'>
          <div className='pb=5'>
            <h2 className='text-xl font-bold'>Todays Overview</h2>
            <p className='text-sm text-gray-400'>
              Last Updated at:{''}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>
        </div>

        <div className='m2 mb-10'>
          <CalloutCard message={content} />
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 m-2'>
          <StatCard
            title='Maximum Temperature'
            metric={`${results.daily.temperature_2m_max[0].toFixed(1)}º`}
            color='yellow'
          />
          <StatCard
            title='Minimum Temperature'
            metric={`${results.daily.temperature_2m_min[0].toFixed(1)}º`}
            color='green'
          />

          <div>
            <StatCard
              title='UV Index'
              metric={`${results.daily.uv_index_max[0].toFixed(1)}º`}
              color='rose'
            />
            {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
              <CalloutCard
                message={'the UV is high today, be sure to wear SPF!'}
                warning
              />
            )}
          </div>
          <div className='flex space-x-3'>
            <StatCard
              title='Wind Speed'
              metric={`${results.current_weather.windspeed.toFixed(1)}ms`}
              color='cyan'
            />
            <StatCard
              title='Wind Direction'
              metric={`${results.current_weather.winddirection.toFixed(1)}º`}
              color='violet'
            />
          </div>
        </div>

        <hr className='mb-5' />

        <div className='space-y-3'>
          <TempChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
