import { watch } from 'fs/promises'
import path from 'path'
import pc from 'picocolors'
import { render } from '../src'

const ResumeInPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : '/home/alcha/Development/Projects/Resumes/Resume/Full-Resume.json'

const ResumeOutPath = path.join(__dirname, '..', 'Latest-Full-Resume.html')

console.log(pc.yellow('Watching Full-Resume.json for changes...'))

const watcher = watch(ResumeInPath)

for await (const { eventType } of watcher) {
  if (eventType === 'change') {
    const resumeContent = await Bun.file(ResumeInPath).json()

    const rendered = await render(resumeContent)

    await Bun.write(ResumeOutPath, rendered)

    console.log(pc.green(`${path.basename(ResumeInPath)} has changed, re-render complete!`))
  }
}
