import { getClient } from '@/apollo-client';
import CalloutCard from '@/components/CalloutCard';
import InformationPanel from '@/components/InformationPanel';
import StatCard from '@/components/StatCard';
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries';

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

  console.log(results);

  return (
    <div>
      <InformationPanel city={city} results={results} lat={lat} long={long} />
      <div>
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
          <CalloutCard message='this is where GPT summary will go!' />
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
          {/* {<TempChart />} */}
          {/* {<Humidity />} */}
          {/* {<TempChart />} */}
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
