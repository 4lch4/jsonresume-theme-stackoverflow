import Day from 'dayjs'
import { SafeString } from 'handlebars'

export const dateHelpers = {
  MY: (date: Date) => Day(date).format('MMM YYYY'),
  Y: (date: Date) => Day(date).format('YYYY'),
  DMY: (date: Date) => Day(date).format('D MMM YYYY'),
}

type BirthData = {
  place?: string
  state?: string
  date?: Date
}

export function birthDate(birth?: BirthData) {
  const out: string[] = []

  if (birth && Object.keys(birth).length) {
    if (birth.place) out.push(`<div> Born in ${birth.place}`)

    if (birth.place && birth.state) out.push(`, ${birth.state}`)

    const year = birth.date ? Day(birth.date).format('YYYY') : ''
    if (year && birth.place && birth.state) out.push(` in ${year}</div>`)
    else if (year && (!birth.place || birth.state)) out.push(`<div> Born in ${year}</div>`)
  }

  return new SafeString(out.join(''))
}
