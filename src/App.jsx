import { useEffect, useRef, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Keyboard from './components/Keyboard/Keyboard';
import {getDefaultState} from './data/defaultState';
import dictionary from './data/dictionary_five.json'
import Gameboard from './components/Gameboard/Gameboard';

// let wordExample = dictionary[Math.floor(Math.random()*dictionary.length)];
let wordExample = 'loose';

function App() {
  const [inputs, setInputs] = useState(getDefaultState());
  const [index, setIndex] = useState(0);
  const [row, setRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    danger: true,
  });

  const container = useRef(null);

  const resetGame = () => {
    resetInputsState()
    setIndex(0);
    setRow(0);
    setMessage({text: '', danger: true});
    setGameOver(false);
    wordExample = dictionary[Math.floor(Math.random()*dictionary.length)];
  }
  
  // function to handle { inputs } state changes
  const changeValue = (property, value, position) => {
    setInputs((prevState) => {
      const copy = [...prevState.map((item, index) => {
        if (index === position) {
          return {
            ...item,
            [property]: value
          }
        } else {
          return {
            ...item
          }
        }
      })];
      return copy;
    })
  }

  const resetInputsState = () => {
    setInputs((prevState) => {
      const copy = [...prevState.map((item) => {
        return {
          id: item.id,
          input: '',
          correctPosition: false,
          wrongPosition: false,
          notPresent: false
        }
      })];
      return copy;
    })
  }

  const getRow = (row, length = 5) => {
    if (row*length >= inputs.length) return;
    const start = row * length;
    const end = (row+1) * length;
    const currentRow = inputs.slice(start, end);
    return {start, end, currentRow};
  }
  
  // check how many times a letter repeats in a word
  const checkForRepeatLetters = (arr) => {
    const repeats = {};
    arr.forEach(item => {
      if (repeats.hasOwnProperty(item)) {
        repeats[item] += 1;
      } else {
        repeats[item] = 1;
      }
    })
    return repeats;
  }

  const checkUserInputValidity = (wordToMatch, currentUserInput) => {
    const wordArr = wordToMatch.toLowerCase().split('');
    const {currentRow, start, end} = currentUserInput;
    const wordArrRepeats = checkForRepeatLetters(wordArr);
    const rowCopy = [...currentRow.map((item, index) => {
      // handle letter in correct position
      if (item.input === wordArr[index]) {
        wordArrRepeats[item.input] -= 1;
        return {
          ...item,
          correctPosition: true
        };
      } else
      // handle letter in wrong position
      if (wordArr.includes(item.input) && wordArrRepeats[item.input] !== 0) {
        wordArrRepeats[item.input] -= 1;
        return {
          ...item,
          wrongPosition: true
        }
      } else {
      // handle letter not present in word
        return {
          ...item,
          notPresent: true
        }
      }
    })];
    const correctGuess = rowCopy.every((item) => item.correctPosition);
    setInputs((prevState) => [...prevState.slice(0, start), ...rowCopy, ...prevState.slice(end)]);
    return correctGuess;
  }


  const isAWord = (word, dictArr = dictionary) => {
    return dictArr.includes(word);
  }

  const handleInput = (input) => {
    if (gameOver) return;
    if (message.text !== '') setMessage({text: '', danger: true});

    // handle 'ENTER' input
    if (/enter/i.test(input)) {
      if (index !== 5* (row+1)) return;
      const userInput = getRow(row);
      let inputWord = userInput.currentRow.map(item => item.input).join('').toLowerCase();
      if (!isAWord(inputWord)) {
        setMessage({
          text: `'${inputWord.toUpperCase()}' is not a word`,
          danger: true
        });
        return;
      }
      const correctGuess = checkUserInputValidity(wordExample, userInput);
      if (correctGuess) {
        setGameOver(true);
        setMessage({
          text: 'Congratulations! You are correct',
          danger: false
          });
      } else if (row === 5) {
        setGameOver(true);
        setMessage({
          text: `Game Over. '${wordExample.toUpperCase()}' was the correct word`,
          danger: true
        });
      }
      
      setRow(prev => prev + 1);
    }

    // handle 'BACKSPACE' input
    if (/backspace/i.test(input)) {
      if (index === row*5) return;
      changeValue('input', '', index-1);
      setIndex(prev => prev - 1)
    }
    
    // handle character inputs
    if (/^[a-zA-Z]$/.test(input)) {
      if (index >= 5 * (row + 1) || row >= 6) return;
      changeValue('input', input.toLowerCase(), index);
      setIndex(prev => prev + 1);
    }
  };

  // get focus on container on every rerender for onKeyDown to work
  useEffect(() => {
    container.current.focus();
  }, [inputs]);

  return (
    <div className='container' ref={container} tabIndex={0} onKeyDown={(e) => handleInput(e.key)}>
      <Header />
      <Gameboard inputs={inputs} />
      {message.text !== '' && <div className={`sysMessage ${message.danger ? 'dangerMsg' : 'correctMsg'}`}>{message.text}</div>}
      {gameOver && <button className='resetBtn' onClick={resetGame}>Reset Game</button>}
      {!gameOver && <Keyboard handleClick={handleInput} guesses={inputs} />}
    </div>
  )
}

export default App
