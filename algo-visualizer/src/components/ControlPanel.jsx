import { Play, Shuffle, Pause, RotateCcw, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function ControlPanel({
  selectedAlgorithm,
  onAlgorithmChange,
  onGenerateArray,
  onStart,
  onReset,
  animationSpeed,
  onSpeedChange,
  comparisons,
  swaps,
  isRunning,
  isPaused,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const algorithms = [
    { value: 'bubble', label: 'Bubble Sort' },
    { value: 'quick', label: 'Quick Sort' },
    { value: 'merge', label: 'Merge Sort' },
    { value: 'insertion', label: 'Insertion Sort' },
    { value: 'selection', label: 'Selection Sort' },
  ];

  const selectedLabel = algorithms.find(a => a.value === selectedAlgorithm)?.label || 'Bubble Sort';

  return (
    <div className="control-panel">
      {/* Algorithm Selector */}
      <div className="control-group">
        <label className="control-label">Algorithm:</label>
        <div className="custom-select">
          <button
            onClick={() => !isRunning && setIsOpen(!isOpen)}
            disabled={isRunning}
            className="custom-select-trigger"
          >
            {selectedLabel}
            <ChevronDown className="custom-select-icon" />
          </button>
          {isOpen && !isRunning && (
            <>
              <div className="custom-select-overlay" onClick={() => setIsOpen(false)} />
              <div className="custom-select-dropdown">
                {algorithms.map((algo) => (
                  <button
                    key={algo.value}
                    onClick={() => {
                      onAlgorithmChange(algo.value);
                      setIsOpen(false);
                    }}
                    className="custom-select-item"
                  >
                    {algo.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="buttons-group">
        <button
          onClick={onGenerateArray}
          disabled={isRunning}
          className="control-button generate-button"
        >
          <Shuffle className="btn-icon" />
          Generate New Array
        </button>
        <button onClick={onStart} className="control-button start-button">
          {isPaused ? (
            <>
              <Play className="btn-icon" />
              Resume
            </>
          ) : isRunning ? (
            <>
              <Pause className="btn-icon" />
              Pause
            </>
          ) : (
            <>
              <Play className="btn-icon" />
              Start
            </>
          )}
        </button>
        {(isRunning || isPaused) && (
          <button onClick={onReset} className="control-button reset-button">
            <RotateCcw className="btn-icon" />
            Reset
          </button>
        )}
      </div>

      {/* Speed Slider */}
      <div className="speed-slider-group">
        <label className="control-label">Animation Speed:</label>
        <input
          type="range"
          min="1"
          max="10"
          value={animationSpeed}
          onChange={(e) => onSpeedChange([parseInt(e.target.value)])}
          className="speed-slider"
        />
        <span className="speed-value">{animationSpeed}x</span>
      </div>

      {/* Statistics */}
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Comparisons:</span>
          <span className="stat-value stat-value-cyan">{comparisons}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-label">Swaps:</span>
          <span className="stat-value stat-value-pink">{swaps}</span>
        </div>
      </div>
    </div>
  );
}