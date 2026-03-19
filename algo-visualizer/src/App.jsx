import { useState, useEffect, useRef } from 'react';
import { CodePanel } from './components/CodePanel';
import { VisualizationArea } from './components/VisualizationArea';
import { ControlPanel } from './components/ControlPanel';
import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateSelectionSortSteps,
  generateQuickSortSteps,
  generateMergeSortSteps,
} from './utils/sortingAlgo';
import '../src/App.css'
import Header from './components/Header';
export default function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [array, setArray] = useState([45, 23, 67, 12, 89, 34, 56, 78, 21, 90, 43, 65]);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [currentLine, setCurrentLine] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const stepsRef = useRef([]);
  const currentStepRef = useRef(0);
  const animationRef = useRef(null);

  const generateSortSteps = (arr, algorithm) => {
    switch (algorithm) {
      case 'bubble':
        return generateBubbleSortSteps(arr);
      case 'insertion':
        return generateInsertionSortSteps(arr);
      case 'selection':
        return generateSelectionSortSteps(arr);
      case 'quick':
        return generateQuickSortSteps(arr);
      case 'merge':
        return generateMergeSortSteps(arr);
      default:
        return generateBubbleSortSteps(arr);
    }
  };

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const animate = () => {
      if (currentStepRef.current < stepsRef.current.length) {
        const step = stepsRef.current[currentStepRef.current];
        setArray(step.array);
        setHighlightedIndices(step.highlightedIndices);
        setCurrentLine(step.currentLine);
        setComparisons(step.comparisons);
        setSwaps(step.swaps);

        currentStepRef.current++;

        const delay = 1000 / animationSpeed;
        animationRef.current = window.setTimeout(animate, delay);
      } else {
        setIsRunning(false);
        setHighlightedIndices([]);
        currentStepRef.current = 0;
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isRunning, isPaused, animationSpeed]);

  const generateNewArray = () => {
    const newArray = Array.from({ length: 12 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArray);
    setHighlightedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setCurrentLine(1);
    setIsRunning(false);
    setIsPaused(false);
    currentStepRef.current = 0;
  };

  const handleStart = () => {
    if (isPaused) {
      setIsPaused(false);
    } else if (isRunning) {
      setIsPaused(true);
    } else {
      stepsRef.current = generateSortSteps(array, selectedAlgorithm);
      currentStepRef.current = 0;
      setIsRunning(true);
      setIsPaused(false);
    }
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setHighlightedIndices([]);
    setCurrentLine(1);
    setComparisons(0);
    setSwaps(0);
    currentStepRef.current = 0;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <Header/>

        <div className="main-grid">
        {/* code panel on left */}
          <CodePanel currentLine={currentLine} algorithm={selectedAlgorithm} />
          {/* viszu on right */}
          <VisualizationArea array={array} highlightedIndices={highlightedIndices} />
        </div>
        <ControlPanel
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
          onGenerateArray={generateNewArray}
          onStart={handleStart}
          onReset={handleReset}
          animationSpeed={animationSpeed}
          onSpeedChange={setAnimationSpeed}
          comparisons={comparisons}
          swaps={swaps}
          isRunning={isRunning}
          isPaused={isPaused}
        />

      </div>
    </div>
  );
}
