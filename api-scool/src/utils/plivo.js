import { Client } from 'plivo'
import { keys } from '../config/configs'

export const clientPlivo = async(src, dst, text) => {
    let client = new Client(keys.PLIVO_AUTH_ID, keys.PLIVO_AUTH_TOKEN)

    let message = await client.messages.create(src, dst, text)

    console.log(message)

    return message
}