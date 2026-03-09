import React from "react";
import SpeedControl from './SpeedControl'
const ControlPanel = ({onRandomize, onStart, selectAlgo, onAlgoChange, isAnimating, speed, onSpeedChange}) => {
    const algorithm = [
        {value: 'bubble', label: 'Bubble sort'},
        {value: 'selection', label: 'Selection sort'},
        {value: 'insertion', label: 'Insertion sort'}
    ]

    return (
        <div className="control-panel">
            <div className="btn-group">
                <button className="btn" onClick={onRandomize}>Random array</button>
                <button className={`btn ${isAnimating ? 'active' : ''}`} onClick={onStart}>Play</button>
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
            <SpeedControl speed={speed} onChange={onSpeedChange} disable={isAnimating}></SpeedControl>
        </div>
    )
}

export default ControlPanel;