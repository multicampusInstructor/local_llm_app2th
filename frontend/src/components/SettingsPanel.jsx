import './SettingsPanel.css'

function SettingsPanel({
  settings,
  models,
  promptModes,
  onSettingChange,
  onPromptModeChange,
  onReloadModels,
  customPrompt,
}) {
  return (
    <div className="settings-panel">
      <label className="field">
        <span className="field__label">모델</span>
        <div className="field__row">
          <select
            value={settings.model}
            onChange={(event) => onSettingChange('model', event.target.value)}
          >
            {models.map((modelName) => (
              <option key={modelName} value={modelName}>
                {modelName}
              </option>
            ))}
          </select>
          <button type="button" className="secondary-button" onClick={onReloadModels}>
            새로고침
          </button>
        </div>
      </label>

      <label className="field">
        <span className="field__label">시스템 프롬프트</span>
        <select
          value={settings.promptMode}
          onChange={(event) => onPromptModeChange(event.target.value)}
        >
          {promptModes.map((mode) => (
            <option key={mode.key} value={mode.key}>
              {mode.label}
            </option>
          ))}
        </select>
        <textarea
          rows="6"
          value={settings.systemPrompt}
          onChange={(event) => onSettingChange('systemPrompt', event.target.value)}
        />
        {customPrompt ? <span className="field__hint">사용자 지정</span> : null}
      </label>

      <label className="field">
        <span className="field__label">Temperature: {settings.temperature.toFixed(1)}</span>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={settings.temperature}
          onChange={(event) => onSettingChange('temperature', Number(event.target.value))}
        />
      </label>

      <label className="field">
        <span className="field__label">Top P: {settings.topP.toFixed(1)}</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={settings.topP}
          onChange={(event) => onSettingChange('topP', Number(event.target.value))}
        />
      </label>

      <label className="field">
        <span className="field__label">Num Predict</span>
        <input
          type="number"
          min="1"
          max="2048"
          value={settings.numPredict}
          onChange={(event) => onSettingChange('numPredict', Number(event.target.value))}
        />
      </label>
    </div>
  )
}

export default SettingsPanel
