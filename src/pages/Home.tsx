import TrendingPanel from '@/components/TrendingPanel'
import { Component } from 'solid-js'

const Home: Component = () => {
  return (
    <>
      <div class='flex flex-col p-8'>
        <h1 class='prose font-bold text-2xl'>Home</h1>
      </div>
      {/**
       * floating panel showing trending songs
       */}
      <TrendingPanel />
    </>
  )
}

export default Home
