import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Draggable from 'react-draggable';
import { useAlert } from "react-alert";
import axios from "axios";
import Background from "./endless-constellation.png";
import LevelDisplay from './LevelDisplay';
import DraggableItems from './DraggableItems';
import ExpressionSlots from './ExpressionSlots';
import ResultDisplay from './ResultDisplay';
import ResetButton from './ResetButton';

function App() {
  const alert = useAlert();
  const navigate = useNavigate();
  const ref = useRef(null);
  const numberRef = useRef(null);
  const [items, setItems] = useState([]);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [expression, setExpression] = useState(["", "", "", "", "", "", ""]);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resetExpression = () => {
    setExpression(["", "", "", "", "", "", ""]);
  };

  const loadLevel = () => {
    if (levels.length > 0) {
      resetExpression();
      const { content } = levels[currentLevel];
      const numbers = [];
      for (let i = 0; i < content.length; i += 2) {
        numbers.push(parseInt(content[i]));
      }
      const operators = ['+', '-', '*', '/'];
      setItems([...numbers, ...operators]);
    }
  };

  useEffect(() => {
    if (numberRef.current) {
      Array.from(numberRef.current.children).forEach(child => {
        child.style.transform = "translate(0px, 0px)";
      });
    }
    calculateResult();
  }, [items, expression]);

  useEffect(() => {
    loadLevel();
  }, [levels, currentLevel]);

  useEffect(() => {
    const checkForEquation = (str) => {
      for (let i = 3; i < str.length; i += 2) {
        if ((str[i] === '*' || str[i] === '/') && (str[i - 2] === '+' || str[i - 2] === '-')) {
          return false;
        }
      }
      return true;
    };

    setLoading(true);
    axios.get("http://localhost:4001/create/getAllLevelsV1")
      .then(res => {
        let data = res.data;
        let t = [];
        for (let i = 0; i < data.length; i++) {
          if (checkForEquation(data[i]["content"])) {
            t.push(data[i]);
          }
        }
        setLevels(t);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching levels:", err);
        setError("Failed to load game levels. Please try again.");
        setLoading(false);
      });
  }, []);

  const doTheSum = (stack) => {
    console.log("This is The Stack ", stack);
    for (let i = 0; i < stack.length; i++) {
      if (stack[i] === "*" || stack[i] === "/") {
        let x = parseInt(stack[i - 1]);
        let y = parseInt(stack[i + 1]);
        let op = stack[i];
        let sum = 0;
        if (op === "*") sum = x * y;
        else sum = Math.floor(x / y);
        stack[i + 1] = sum;
        stack.splice(i - 1, 2);
        i = -2;
      }
    }
    console.log(stack);
    for (let i = 0; i < stack.length; i++) {
      if (stack[i] === "+" || stack[i] === "-") {
        let x = parseInt(stack[i - 1]);
        let y = parseInt(stack[i + 1]);
        let op = stack[i];
        let sum = 0;
        if (op === "+") sum = x + y;
        else sum = Math.floor(x - y);
        stack[i + 1] = sum;
        stack.splice(i - 1, 2);
        i = -2;
      }
    }
    setResult(stack[0]);
    if (currentLevel !== levels.length - 1) {
      if (stack[0] === 24) {
        alert.success('Level Finished', {
          timeout: 4000,
          onClose: () => {
            setCurrentLevel(prev => prev + 1);
            setResult(0);
          }
        });
      }
    } else {
      if (stack[0] === 24) {
        alert.success('Game Finished', {
          timeout: 4000,
          onClose: () => {
            setCurrentLevel(0);
            setResult(0);
          }
        });
      }
    }
  };

  const calculateResult = () => {
    const arr = expression;
    let operators = ["+", "-", "/", "*"];
       // Check Also For Validity Of The Expression 
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "") {
        setResult(0);
        return false;
      }
    }

    // Checking If The User Used All The Operators
    let stack = [...arr];
    for (let i = 1; i < stack.length; i++) {
      console.log("4")
      if (operators.indexOf(stack[i]) ==  operators.indexOf(stack[i - 1]) ) {
        alert.error("Wrong Expression", {
          timeout: 4000,
        })
        setResult(0);
        return false;
      }
    }
  

    doTheSum(stack);
  };

  const handleRemove = (index) => {

    const newExpression = [...expression];
    const removedValue = newExpression[index];
    newExpression[index] = "";
    setExpression(newExpression);
    if (removedValue) {
      setItems([...items, removedValue]);
    }
    calculateResult();
  };

  const onStop = (e, data, itemIndex) => {
    const slots = ref.current.children;
    let closestIndex = -1;
    let minDistance = Infinity;
    Array.from(slots).forEach((slot, idx) => {
      const rect = slot.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < minDistance && !expression[idx]) {
        minDistance = distance;
        closestIndex = idx;
      }
    });
    if (closestIndex !== -1 && minDistance < 50) {
      const value = items[itemIndex];
      const newExpression = [...expression];
      newExpression[closestIndex] = value;
      setExpression(newExpression);
      const newItems = items.filter((_, idx) => idx !== itemIndex);
      setItems(newItems);
      calculateResult();
    } else {
      data.node.style.transform = "translate(0px, 0px)";
    }
  };

  const resetLevel = () => {
    resetExpression();
    loadLevel();
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="game-container" style={{ backgroundImage: `url(${Background})` }}>
        <div className="game-card">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading Levels...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-container" style={{ backgroundImage: `url(${Background})` }}>
        <div className="game-card">
          <div className="error-message">{error}</div>
          <button className="reset-btn" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container" style={{ backgroundImage: `url(${Background})` }}>
      <button className="logout-btn" onClick={handleLogout} aria-label="Logout">Logout</button>
      <div className="game-card">
        <LevelDisplay currentLevel={currentLevel} totalLevels={levels.length} />
        <DraggableItems items={items} onStop={onStop} numberRef={numberRef} />
        <ExpressionSlots expression={expression} handleRemove={handleRemove} refProp={ref} />
        <ResultDisplay result={result} />
        <ResetButton onClick={resetLevel} />
      </div>
    </div>
  );
}

export default App;
