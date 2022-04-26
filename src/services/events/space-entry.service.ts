import { StateSignal } from '@solid-js/signal'

export type ThemeColor = 'dark' | 'light'

class LayoutThemeService {
  public signal = StateSignal<ThemeColor>(undefined)

  public updateTheme(component: ) {
    if (pageName === 'HomePage') {
      this.setLightTheme()
    } else {
      this.setDarkTheme()
    }
  }

  public setLightTheme() {
    this.signal.dispatch('light')
  }

  public setDarkTheme() {
    this.signal.dispatch('dark')
  }
}

export default new LayoutThemeService()
