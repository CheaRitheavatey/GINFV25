const SpeedControl = ({speed, onSpeedChange, disable}) => {
    return (
        <div className="div">
            <input type="range" min="100" max="1200" onChange={e => onSpeedChange(Number(e.target.value))} 
            disabled={disable} />
            <span className="speed-value">{speed}</span>
        </div>
    )
}

export default SpeedControl;