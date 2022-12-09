import { createStore } from 'solid-js/store'

export type SettingState = {
  darkMode: boolean
  enableTrendingPage: 'all' | 'onlyHome' | 'none' // not include setting page
}

export const [settings, setSettings] = createStore<SettingState>({
  darkMode: false,
  enableTrendingPage: 'all',
})
