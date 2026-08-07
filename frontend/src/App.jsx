import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow'
import { getModels, sendChatMessage } from './api/chatApi'
import { getPromptModeByKey, promptModes } from './api/promptModes'

const DEFAULT_MODEL = 'exaone3.5:7.8b'

const initialSettings = {
  model: DEFAULT_MODEL,
  promptMode: 'basic',
  systemPrompt: getPromptModeByKey('basic').prompt,
  temperature: 0.5,
  topP: 0.9,
  numPredict: 512,
}

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [models, setModels] = useState([])
  const [settings, setSettings] = useState(initialSettings)
  const [customPrompt, setCustomPrompt] = useState(false)
  const systemPromptRef = useRef(initialSettings.systemPrompt)

  useEffect(() => {
    loadModels()
  }, [])

  const loadModels = async () => {
    try {
      const modelList = await getModels()
      if (modelList.length > 0) {
        setModels(modelList)
        const preferredModel = modelList.includes(DEFAULT_MODEL)
          ? DEFAULT_MODEL
          : modelList[0]
        setSettings((current) => ({ ...current, model: preferredModel }))
      } else {
        setSettings((current) => ({ ...current, model: DEFAULT_MODEL }))
      }
    } catch (err) {
      setError(err.message || '모델 목록을 불러오지 못했습니다.')
    }
  }

  const handlePromptModeChange = (nextMode) => {
    const mode = getPromptModeByKey(nextMode)
    setSettings((current) => ({
      ...current,
      promptMode: nextMode,
      systemPrompt: mode.prompt,
    }))
    systemPromptRef.current = mode.prompt
    setCustomPrompt(false)
  }

  const handleSettingChange = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }))

    if (key === 'systemPrompt') {
      systemPromptRef.current = value
      setCustomPrompt(value.trim() !== '')
    }
  }

  const handleSubmit = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) {
      return
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: trimmed,
    }

    setMessages((current) => [...current, userMessage])
    setInput('')
    setError('')
    setIsLoading(true)

    try {
      const response = await sendChatMessage({
        message: trimmed,
        model: settings.model,
        system_prompt: systemPromptRef.current,
        temperature: settings.temperature,
        top_p: settings.topP,
        num_predict: settings.numPredict,
      })

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: response.message,
        elapsedTime: response.elapsed_time,
      }

      setMessages((current) => [...current, aiMessage])
    } catch (err) {
      setError(err.message || '응답 생성 중 문제가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([])
    setError('')
  }

  const promptModeOptions = useMemo(() => promptModes, [])

  return (
    <div className="app-container">
      <ChatWindow
        messages={messages}
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        settings={settings}
        models={models}
        promptModes={promptModeOptions}
        onSettingChange={handleSettingChange}
        onPromptModeChange={handlePromptModeChange}
        onClear={handleClear}
        onReloadModels={loadModels}
        customPrompt={customPrompt}
      />
    </div>
  )
}

export default App
