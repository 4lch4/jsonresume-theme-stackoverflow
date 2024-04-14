import { watch } from 'fs/promises'
import path from 'path'
import { render } from '../src'
import pc from 'picocolors'

const ResumePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : '/home/alcha/Development/Projects/Resumes/Resume/Full-Resume.json'

async function test() {
  console.log(pc.yellow('Rendering test resume...'))

  const resumeContent = await Bun.file(ResumePath).json()

  console.log(pc.yellow('Loaded test resume content...'))

  const rendered = await render(resumeContent)

  console.log(pc.yellow('Rendered test resume content...'))

  const outPath = path.join(__dirname, 'Latest-Full-Resume.html')

  await Bun.write(outPath, rendered)

  console.log(pc.yellow('Wrote rendered test resume content to:'), outPath)
}

console.log(pc.yellow('Watching Full-Resume.json for changes...'))

const watcher = watch(ResumePath)

for await (const { eventType } of watcher) {
  if (eventType === 'change') {
    console.log(pc.green('Detected change in Full-Resume.json'))

    await test()

    console.log(pc.green('Re-rendered test resume content...'))
  }
}
