import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: process.env.REMIX_APP_DIR || './app',
  ssr: true,
} satisfies Config
