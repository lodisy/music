import { Component } from 'solid-js'

const Home: Component = () => {
  return (
    <>
      <div class='flex flex-col p-8 z-0'>
        <h1 class='prose font-bold text-2xl'>Home</h1>
        {/**
         * TODO: Add playlist card like collection
         */}
        <div class='flex gap-4'>
          <div class='flex-1 bg-white rounded-xl p-4'></div>
        </div>
      </div>
    </>
  )
}

export default Home
