import { Client } from 'plivo'

export const clientPlivo = async(src, dst, text) => {
    let client = new Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN)

    let message = await client.messages.create(src, dst, text)

    console.log(message)

    return message
}