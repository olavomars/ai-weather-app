'use client';
import Image from 'next/image';

import { Card, Divider, Subtitle, Text } from '@tremor/react';
import CityPicker from '@/components/CityPicker';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10 flex flex-col justify-center items-center'>
      <Card className='max-w-4xl mx-auto rounded-md bg-white text-[#A9A9A9]'>
        <Text className='text-6xl font-bold text-center mb-10 '>
          Weather AI
        </Text>
        <Subtitle className='text-xl text-center'>
          Powered by OpenAI, Next.js 13.4, Tailwind CSS, Tremor 2.0 + more
        </Subtitle>
        <Divider className='my-10' />
        <Card className='bg-gradient-to-br from-[#394F68] to-[#183B7E] rounded-md'>
          <CityPicker />
        </Card>
      </Card>
    </div>
  );
}
