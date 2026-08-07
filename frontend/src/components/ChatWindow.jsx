import './ChatWindow.css'
import SettingsPanel from './SettingsPanel'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

function ChatWindow({
  messages,
  input,
  setInput,
  onSubmit,
  isLoading,
  error,
  settings,
  models,
  promptModes,
  onSettingChange,
  onPromptModeChange,
  onClear,
  onReloadModels,
  customPrompt,
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__header">
          <p className="eyebrow">Local LLM Chat</p>
          <h1>설정</h1>
        </div>

        <SettingsPanel
          settings={settings}
          models={models}
          promptModes={promptModes}
          onSettingChange={onSettingChange}
          onPromptModeChange={onPromptModeChange}
          onReloadModels={onReloadModels}
          customPrompt={customPrompt}
        />
      </aside>

      <main className="chat-panel">
        <header className="chat-header">
          <div>
            <p className="eyebrow">FastAPI + Ollama</p>
            <h2>로컬 AI 채팅_LEO</h2>
          </div>
          <button type="button" className="clear-button" onClick={onClear}>
            대화 초기화
          </button>
        </header>

        {error ? <div className="error-banner">{error}</div> : null}

        <MessageList messages={messages} isLoading={isLoading} />

        <ChatInput value={input} onChange={setInput} onSubmit={onSubmit} isLoading={isLoading} />
      </main>
    </div>
  )
}

export default ChatWindow
