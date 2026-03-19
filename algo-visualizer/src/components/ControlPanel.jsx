import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Select } from "./sub_components/Select"

function ControlPanel({
    selectedAlgo,
    onChangeSelectedAlgo,
    isRunning
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
        </>
    )
}
export default ControlPanel