export function VisualizationArea({ array, highlightedIndices }) {
  const maxValue = Math.max(...array);

  return (
    <div className="viz-container">
      <div className="viz-header">
        <h2 className="viz-title">Array Visualization</h2>
      </div>
      <div className="viz-bars-container">
        {array.map((value, index) => {
          const heightPercent = (value / maxValue) * 100;
          const isHighlighted = highlightedIndices.includes(index);

          return (
            <div
              key={index}
              className="viz-bar-wrapper"
            >
              <div 
                className="viz-bar-track" 
                style={{ 
                  flex: 1, 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'flex-end' 
                }}
              >
                <div
                  className={`viz-bar ${isHighlighted ? 'viz-bar-highlighted' : 'viz-bar-default'}`}
                  style={{
                    height: `${heightPercent}%`,
                    minHeight: '20px',
                  }}
                >
                  {isHighlighted && (
                    <div className="viz-bar-highlight-overlay" />
                  )}
                </div>
              </div>
              <span className="viz-bar-value">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
