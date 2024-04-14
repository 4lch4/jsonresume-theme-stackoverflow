/**
 * This interface represents the JSON schema of a resume. It was created using [Quicktype][0].
 *
 * [0]: https://quicktype.io
 */
export interface FullResume {
  $schema: string
  basics: Basics
  work: Work[]
  education: Education[]
  awards: Award[]
  certificates: Certificate[]
  skills: Interest[]
  languages: Language[]
  interests: Interest[]
  references: any[]
  projects: Project[]
  meta: Meta
}

export interface Award {
  title: string
  summary: string
  awarder: string
  date: string
}

export interface Basics {
  name: string
  label: string
  image: string
  email: string
  phone: string
  website: string
  summary: string
  location: Location
  profiles: Profile[]
}

export interface Location {
  postalCode: string
  city: string
  countryCode: string
  region: string
}

export interface Profile {
  network: string
  username: string
  url: string
}

export interface Certificate {
  date: string
  issuer: string
  name: string
  url: string
}

export interface Education {
  area?: string
  institution: string
  startDate: string
  endDate: string
  studyType: string
  url: string
  courses: string[]
}

export interface Interest {
  name: string
  keywords: string[]
}

export interface Language {
  language: string
  fluency: string
}

export interface Meta {
  canonical: string
  lastModified: string
  version: string
}

export interface Project {
  name: string
  url?: string
  description: string
  startDate?: Date
  highlights?: string[]
  type?: string
  endDate?: string
  state?: string
}

export interface Work {
  company: string
  position: string
  startDate: string
  endDate?: string
  url?: string
  summary: string
  highlights: string[]
}
