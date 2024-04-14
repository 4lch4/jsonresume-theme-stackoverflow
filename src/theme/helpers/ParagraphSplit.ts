import { SafeString } from 'handlebars'
import Markdown from 'markdown-it'

export function paragraphSplit(text: any) {
  const expr = /\r\n|\r|\n/g

  if (text != null) text = new Markdown().render(text)

  const lines: string[] = Array.isArray(text) ? text.join('').split(expr) : text.split(expr)
  const output = lines.filter(line => line).reduce((a, b) => `${a}<p>${b}</p>`, '')

  return new SafeString(output)
}
