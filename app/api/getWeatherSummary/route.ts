import { NextResponse } from 'next/server';
import openai from '@/openai';

export async function POST(request: Request) {
  //weatherdata in the body of POST request
  const { weatherData } = await request.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: `Pretend you're a developer who built a platform for weather consulting worldwide and now are presenting your project LIVE. Be energetic and charismatic, Introduce Yourself as Olavo and say you built this website to help people know how the weather is across all cities in the world. State the city you are providing a summary for and then give a summary of todays weather only. Make it easy for the viewer to understand and know what to do to prepare for those weather conditions such as wear SPF if the UV is high, etc. use the uv_index data provided to provide UV advice. Provide a joke regarding the weather and also give advice and suggestions for people with pets and dogs on what they should do given the conditions on that day. Assume the data came from your team at the news office and not the user`,
      },
      {
        role: 'user',
        content: `hi there, can I get a summary of todays weather, use the following information to get the weather data ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });
  const { data } = response;

  return NextResponse.json(data.choices[0].message);
}
