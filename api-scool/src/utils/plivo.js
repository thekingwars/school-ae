import { Client } from 'plivo'

export const clientPlivo = async(src, dst, text) => {

    let message = await client.messages.create(src, dst, text)

    console.log(message)

    return message
}