import Handlebars from 'handlebars'
import path from 'path'
import { type FullResume } from './Resume'
import { birthDate, dateHelpers, paragraphSplit, spaceToDash, toLowerCase } from './theme/helpers'

/** Resolves to full path for the `./theme` directory. */
const ThemeDir = path.join(__dirname, 'theme')

/** Resolves to full path for the `./theme/partials` directory. */
const partialsDir = path.join(ThemeDir, 'partials')

Handlebars.registerHelper('birthDate', birthDate)
Handlebars.registerHelper('MY', dateHelpers.MY)
Handlebars.registerHelper('Y', dateHelpers.Y)
Handlebars.registerHelper('DMY', dateHelpers.DMY)
Handlebars.registerHelper('paragraphSplit', paragraphSplit)
Handlebars.registerHelper('toLowerCase', toLowerCase)
Handlebars.registerHelper('spaceToDash', spaceToDash)

export async function render(resume: FullResume) {
  const css = await Bun.file(path.join(__dirname, 'index.css')).text()
  const template = await Bun.file(path.join(__dirname, 'index.hbs')).text()

  const partialsGlob = new Bun.Glob('**/*.hbs')

  for await (const partial of partialsGlob.scan(partialsDir)) {
    const filePath = path.join(partialsDir, partial)
    const content = await Bun.file(filePath).text()

    Handlebars.registerPartial(partial.replace('.hbs', ''), content)
  }

  return Handlebars.compile(template)({ css, resume })
}

const pdfMargin = '0.8 cm'

export const pdfRenderOptions = {
  margin: {
    top: pdfMargin,
    bottom: pdfMargin,
    left: pdfMargin,
    right: pdfMargin,
  },
}
