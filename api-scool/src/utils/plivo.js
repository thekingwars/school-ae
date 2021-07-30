import { Client } from 'plivo'

export const clientPlivo = async(src, dst, text) => {
    let client = new Client('MAYJK1MDC3ZTDHYZBJMZ', 'ZDYwNzJmMWZiZGNhMzVhM2RkZDdhYWYwNzQ3NmM0')

    let message = await client.messages.create(src, dst, text)

    console.log(message)

    return message
}