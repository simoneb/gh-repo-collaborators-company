import dotenv from 'dotenv'
dotenv.config()

import { Octokit } from 'octokit'
import fs from 'fs/promises'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

async function run(owner, repo) {
  const iterator = octokit.paginate.iterator(
    octokit.rest.repos.listContributors,
    {
      owner,
      repo,
    }
  )

  const companies = new Map()

  for await (const { data: contributors } of iterator) {
    for (const contributor of contributors) {
      const { data: user } = await octokit.rest.users.getByUsername({
        username: contributor.login,
      })

      if (!companies.has(user.company)) {
        companies.set(user.company, [])
      }
      companies
        .get(user.company)
        .push({ login: user.login, contributions: contributor.contributions })
    }
  }

  await fs.writeFile(
    `data/${owner}-${repo}.json`,
    JSON.stringify(Array.from(companies.entries()), null, 2)
  )
}

run('npm', 'cli')
