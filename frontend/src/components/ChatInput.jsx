import './ChatInput.css'

function ChatInput({ value, onChange, onSubmit, isLoading }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <form className="chat-input" onSubmit={(event) => {
      event.preventDefault()
      onSubmit()
    }}>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요"
        rows="2"
      />
      <button type="submit" disabled={isLoading || value.trim() === ''}>
        {isLoading ? '전송 중' : '➜'}
      </button>
    </form>
  )
}

export default ChatInput
