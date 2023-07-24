# gh-repo-collaborators-company

This repository contains a simple spike to figure out what companies
contribute the most to a certain repo.

## Setup

- `npm i`
- populate `.env` with a GitHub token. No specific permissions needed

## How it works

You run two scripts:

1. `node dump-collaborators.js` to extract data from the GitHub API. This may take a while
2. `node compute-stats.js` to compute the metrics over the data

The output of each step goes to JSON files in the data folder.
