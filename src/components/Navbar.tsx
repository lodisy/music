import { A } from '@solidjs/router'
import { Icon } from 'solid-heroicons'
import { chartBar, cog, folder, home, musicalNote } from 'solid-heroicons/outline'
import { Index } from 'solid-js'

const navs = [
  {
    name: 'Home',
    icon: home,
    href: '/',
  },
  {
    name: 'Trending',
    icon: chartBar,
    href: '/trending',
  },
  {
    name: 'Library',
    icon: folder,
    href: '/library',
  },
]

const Navbar = () => {
  return (
    <div class='py-8 w-[60px] flex flex-col items-center justify-between z-50'>
      <div class='grid place-items-center'>
        <Icon path={musicalNote} class='w-6 animate-spin' />
      </div>
      <nav>
        <ul class='flex flex-col justify-around gap-4'>
          <Index each={navs}>
            {(nav, index) => (
              <li data-index={index}>
                <A href={nav().href}>
                  <Icon path={nav().icon} class='w-6' />
                </A>
              </li>
            )}
          </Index>
        </ul>
      </nav>
      <div class='grid place-items-center'>
        <A href='/settings'>
          <Icon path={cog} class='w-6' />
        </A>
      </div>
    </div>
  )
}

export default Navbar
