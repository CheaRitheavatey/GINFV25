import { algoCode } from "../utils/algoCode";
export function CodePanel({ currentLine, algorithm }) {
  const { title, code: codeLines } = algoCode[algorithm] || algoCode.bubble;

  const highlightSyntax = (code) => {
    const keywords = ['function', 'let', 'for', 'if', 'return', 'while', 'else'];
    const parts = [];
    let remaining = code;
    let keyIndex = 0;

    keywords.forEach((keyword) => {
      const index = remaining.indexOf(keyword);
      if (index !== -1) {
        if (index > 0) {
          parts.push(
            <span key={`text-${keyIndex++}`} className="code-text">
              {remaining.substring(0, index)}
            </span>
          );
        }
        parts.push(
          <span key={`keyword-${keyIndex++}`} className="code-keyword">
            {keyword}
          </span>
        );
        remaining = remaining.substring(index + keyword.length);
      }
    });

    const functionMatch = remaining.match(/(\w+)\(/);
    if (functionMatch) {
      const index = remaining.indexOf(functionMatch[1]);
      if (index > 0) {
        parts.push(
          <span key={`pre-func-${keyIndex++}`} className="code-text">
            {remaining.substring(0, index)}
          </span>
        );
      }
      parts.push(
        <span key={`func-${keyIndex++}`} className="code-function">
          {functionMatch[1]}
        </span>
      );
      remaining = remaining.substring(index + functionMatch[1].length);
    }

    if (remaining) {
      parts.push(
        <span key={`rest-${keyIndex++}`} className="code-text">
          {remaining}
        </span>
      );
    }

    return parts.length > 0 ? parts : <span className="code-text">{code}</span>;
  };

  return (
    <div className="code-panel-container">
      <div className="code-panel-header">
        <h2 className="code-panel-title">{title}</h2>
      </div>
      <div className="code-panel-content">
        {codeLines.map((item) => (
          <div
            key={item.line}
            className={`code-line ${item.line === currentLine ? 'code-line-highlighted' : ''}`}
          >
            <span className="code-line-number">
              {item.line}
            </span>
            <span
              className="code-line-code"
              style={{ paddingLeft: `${item.indent * 1.5}rem` }}
            >
              {highlightSyntax(item.code)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
