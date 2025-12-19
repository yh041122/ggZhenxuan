import { env } from 'node:process'

if (!/pnpm/.test(env.npm_execpath || '')) {
  console.warn(
    '\x1B[33mThis repository must use pnpm as the package manager for scripts to work properly.\x1B[39m\n',
  )
  process.exit(1)
}
