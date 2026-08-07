import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './MessageBubble.css'

function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('복사 실패', error)
    }
  }

  return (
    <article className={`message-bubble ${message.sender === 'user' ? 'message-bubble--user' : 'message-bubble--ai'}`}>
      <div className="message-bubble__meta">
        <span>{message.sender === 'user' ? 'You' : 'AI'}</span>
        {message.elapsedTime ? <span>{message.elapsedTime.toFixed(2)}s</span> : null}
        {message.sender === 'ai' ? (
          <button type="button" className="copy-button" onClick={handleCopy}>
            {copied ? '✓' : '복사'}
          </button>
        ) : null}
      </div>
      <div className="message-bubble__content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
      </div>
    </article>
  )
}

export default MessageBubble
