import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./sub_components/Select"
import { Pause, Play, RotateCw, Shuffle } from "lucide-react"

function ControlPanel({
    selectedAlgo,
    onChangeSelectedAlgo,
    isRunning,
    isPause,
    onGenerateArray,
    onStart,
    onReset
}) {
    return (
        <>
        {/* drop down for select algo: have label and the dropdown */}
        <div>
            <label htmlFor="">Algorithm:</label>
            <Select value={selectedAlgo} onValueChange={onChangeSelectedAlgo} disable={isRunning}>
                <SelectTrigger className="">
                    <SelectValue></SelectValue>
                </SelectTrigger>


                <SelectContent className="">
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
            <button
            onClick={onGenerateArray}
            disabled={isRunning}
            className="">
                {/* shuffle icon */}
                <Shuffle className="w-2 h-2 mr-2"></Shuffle>
                Generate New Array
            </button>

            {/* start button */}
            <button
            onClick={onStart}
            className="">
                {isPause ? (
                    <>
                    <Play></Play>
                    Resume
                    </>
                ) : isRunning ? (
                    <>
                    <Pause></Pause>
                    Pause
                    </>
                ): (
                    <>
                    <Play></Play>
                    Start
                    </>
                )}
            </button>

            {/* reset button show */}
            {(isRunning || isPause) && (
                <button
                onClick={onReset}
                className="">
                    {/* icon reset circle */}
                    <RotateCw></RotateCw>
                    Reset
                </button>
            )}
        </div>
        </>
    )
}
export default ControlPanel
