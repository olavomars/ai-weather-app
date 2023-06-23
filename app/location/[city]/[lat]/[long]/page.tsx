import { getClient } from '@/apollo-client';
import CalloutCard from '@/components/CalloutCard';
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
      {/* {<informationPanel />} */}
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

        <div>
          <CalloutCard message='this is where GPT summary will go!' />
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
