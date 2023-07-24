import fs from 'fs/promises'

async function run(owner, repo) {
  const data = JSON.parse(
    await fs.readFile(`data/${owner}-${repo}.json`, {
      encoding: 'utf-8',
    })
  )

  const sorted = data
    .map(([company, users]) => [
      company,
      users.reduce((acc, c) => acc + c.contributions, 0),
    ])
    .sort((a, b) => b[1] - a[1])

  await fs.writeFile(
    `data/${owner}-${repo}-stats.json`,
    JSON.stringify(sorted, null, 2)
  )
}

run('npm', 'cli')
