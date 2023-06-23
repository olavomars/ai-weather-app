import { getClient } from '@/apollo-client';
import CalloutCard from '@/components/CalloutCard';
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
      </div>
      Welcome to the weather Page: {city} {lat}
    </div>
  );
}

export default WeatherPage;
