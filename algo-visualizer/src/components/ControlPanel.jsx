import React from "react";
import SpeedControl from './SpeedControl'
const ControlPanel = ({onRandomize, onStart, selectAlgo, onAlgoChange, isAnimating, speed, onSpeedChange}) => {
    const algorithm = [
        {value: 'bubble', label: 'Bubble sort'},
        {value: 'selection', label: 'Selection sort'},
        {value: 'insertion', label: 'Insertion sort'}
    ]

    return (
        <div className="div">
            <div className="div">
                <button className="btn" onClick={onRandomize}>Randomize</button>
                <button className="btn" onClick={onStart}>Play</button>
            </div>

            <div className="div">
                <label htmlFor="">algorithm</label>
                <div className="dropdown">
                    {/* map key value of algo */}
                    <select name="" id="" value={selectAlgo} onChange={(e) => onAlgoChange(e.target.value)}>
                        {algorithm.map(n => (
                            <option key={n.value} value={n.value}>{n.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* for speed here */}
        </div>
    )
}

export default ControlPanel;