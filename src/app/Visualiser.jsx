import React, { useState, useEffect } from 'react';

import { ProceduresReader } from './VisualiserCore';
import { generateRandomNumber } from '../utils/generators';
import { getQuickSortRightPivotProcedures } from '../algorithms/QuickSortRightPivot';
import { getQuickSortMidPivotProcedures } from '../algorithms/QuickSortMidPivot';
import { getBubbleSortProcedures } from '../algorithms/BubbleSort';

import './Visualiser.css';
import { Colors } from '../styles';

const ANIMATION_SPEED = 1;
const MIN_NUM_ARRAYS = 50;
const MAX_NUM_ARRAYS = 800;

const Visualiser = () => {
  const [visualArray, updateArray] = useState(() => []);
  const [sliderValue, updateSliderValue] = useState(
    (MAX_NUM_ARRAYS + MIN_NUM_ARRAYS) / 2
  );
  const [isRunning, updateIsRunning] = useState(false);

  function resetArray() {
    const array = [];
    for (let i = 0; i < sliderValue; i++) {
      const num = generateRandomNumber(3, 500);
      array.push(num);
      updateArray(array);
    }
    // set the colors to default color
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let j = 0; j < arrayBars.length; j++) {
      arrayBars[j].style.backgroundColor = Colors.BAR_DEFAULT;
    }
  }

  // when the component first mounts, create a new random array
  useEffect(() => resetArray(), []);

  async function quickSortWithRightPivot() {
    const procedures = getQuickSortRightPivotProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }

  async function quickSortWithMidPivot() {
    const procedures = getQuickSortMidPivotProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }

  async function bubbleSort() {
    const procedures = getBubbleSortProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }

  return (
    <div className="visualiser-layout">
      <h1>Sorting Visualiser</h1>
      <p>By Renyi Tan</p>
      <div className="visualiser-container">
        {visualArray.map((i, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: i, backgroundColor: Colors.BAR_DEFAULT }}
          />
        ))}
      </div>
      <div className="controls-container">
        <div className="btn'">
          <input
            type="range"
            min={MIN_NUM_ARRAYS}
            max={MAX_NUM_ARRAYS}
            value={sliderValue}
            onChange={(event) => {
              updateSliderValue(event.target.value);
              resetArray();
            }}
            disabled={isRunning}
          />
          <span
            style={{
              color: 'white',
              fontWeight: 'bold',
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            {sliderValue}
          </span>
        </div>
        <button
          className="btn"
          onClick={() => {
            bubbleSort();
            updateIsRunning(true);
          }}
          disabled={isRunning}
        >
          Bubble Sort
        </button>
        <button
          className="btn"
          onClick={() => {
            quickSortWithRightPivot();
            updateIsRunning(true);
          }}
          disabled={isRunning}
        >
          Quick Sort (Lomuto)
        </button>
        <button
          className="btn"
          onClick={() => {
            quickSortWithMidPivot();
            updateIsRunning(true);
          }}
          disabled={isRunning}
        >
          Quick Sort (Hoare)
        </button>
        <button
          className="btn"
          onClick={() => {
            resetArray();
          }}
          disabled={isRunning}
        >
          Reset Arrays
        </button>
      </div>
    </div>
  );
};

export default Visualiser;