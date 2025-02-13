import { marked } from 'marked'
import DOMPurify from 'dompurify'

export async function sendMessageToAIService(message: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/assistant`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ message }),
    })

    const aiMessage = await res.json()

    const text = await marked(aiMessage)
    // return text
    return DOMPurify.sanitize(text)
  } catch (error: any) {
    throw new Error(error)
  }
}
