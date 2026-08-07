import './MessageList.css'
import MessageBubble from './MessageBubble'

function MessageList({ messages, isLoading }) {
  if (messages.length === 0) {
    return (
      <section className="message-list message-list--empty">
        <div className="empty-state">
          <h3>아무 말이나 시작해 보세요</h3>
          <p>질문을 입력하면 로컬 AI가 답변을 생성합니다.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="message-list">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading ? (
        <div className="typing-indicator" aria-label="응답 생성 중">
          <span />
          <span />
          <span />
        </div>
      ) : null}
    </section>
  )
}

export default MessageList
