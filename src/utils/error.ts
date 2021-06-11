import dayjs from 'dayjs'

export const logError = (name: string, action: string, info?: string | object) => {
  if (!info) info = 'empty'
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  console.error(time, name, action, info)
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
}