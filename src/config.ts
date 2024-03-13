import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'XIAOHAN_TOKA',
  subtitle: 'akas',
  lang: 'zh_TW',
  themeHue: 250,
  banner: {
    enable: true,
    src: 'assets/images/103134164.jpg',
  },
}

export const navBarConfig: NavBarConfig = {
  links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/114338280.jpg',
  name: '幻夢曉寒kaka',
  bio: '醉後不知天在水，滿船清夢壓星河',
  links: [
    {
      name: 'Twitter',
      icon: 'fa6-brands:twitter',
      url: 'https://twitter.com/Dreamkaka3',
    },
    {
      name: 'bilibili',
      icon: 'fa6-brands:bilibili',
      url: 'https://space.bilibili.com/516951032',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/Dreamkaka',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
