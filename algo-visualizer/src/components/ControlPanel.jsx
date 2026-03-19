import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./sub_components/Select";
import { Pause, Play, RotateCw, Shuffle } from "lucide-react";
import { Slider } from "./sub_components/slider"; 

function ControlPanel({
  selectedAlgo,
  onChangeSelectedAlgo,
  isRunning,
  isPause,
  onGenerateArray,
  onStart,
  onReset,
  animationSpeed,
  onSpeedChange
}) {
  return (
    <>
      {/* dropdown for select algo */}
      <div>
        <label>Algorithm:</label>
        <Select
          value={selectedAlgo}
          onValueChange={onChangeSelectedAlgo}
          disabled={isRunning} // fixed prop name
        >
          <SelectTrigger> {/* removed empty className */}
            <SelectValue />
          </SelectTrigger>
          <SelectContent> {/* removed empty className */}
            <SelectItem value="bubble">Bubble Sort</SelectItem>
            <SelectItem value="quick">Quick Sort</SelectItem>
            <SelectItem value="merge">Merge Sort</SelectItem>
            <SelectItem value="insertion">Insertion Sort</SelectItem>
            <SelectItem value="selection">Selection Sort</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* generate button and play button */}
      <div>
        {/* generate button */}
        <button onClick={onGenerateArray} disabled={isRunning}>
          <Shuffle /> {/* removed className */}
          Generate New Array
        </button>

        {/* start button */}
        <button onClick={onStart}>
          {isPause ? (
            <>
              <Play />
              Resume
            </>
          ) : isRunning ? (
            <>
              <Pause />
              Pause
            </>
          ) : (
            <>
              <Play />
              Start
            </>
          )}
        </button>

        {/* reset button */}
        {(isRunning || isPause) && (
          <button onClick={onReset}>
            <RotateCw />
            Reset
          </button>
        )}
      </div>

      {/* slider for speed */}
      <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-slate-300 whitespace-nowrap">
            Animation Speed:
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={animationSpeed}
            onChange={(e) => onSpeedChange([parseInt(e.target.value)])}
            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <span className="text-xs font-mono text-slate-400 w-8">{animationSpeed}x</span>
        </div>
    </>
  );
}

export default ControlPanel;