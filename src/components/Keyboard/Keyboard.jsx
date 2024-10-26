import './keyboard.css';
import {keyboard} from '../../data/keyboard';

const eng_keyboard = keyboard.EN;

const KeyboardButton = ({value, onclick, addClass}) => {

    return (
        <div className={`kbBtn ${addClass}`}
             onClick={() => onclick(value)}
        >
                {/enter/i.test(value) ? '✔' : /backspace/i.test(value) ? '<' : value}
        </div>
    )
};

const Keyboard = ({handleClick, guesses}) => {
    const getBtnClass = (item) => {
        const filteredGuesses = guesses.filter(guess => guess.input === item);
        let btnClass;
        if (filteredGuesses.length === 0) {
            btnClass = '';
        } else {
            btnClass = filteredGuesses.some(item => item.correctPosition) ? 'correctPos':
                       filteredGuesses.some(item => item.wrongPosition) ? 'wrongPos' : 
                       filteredGuesses.some(item => item.notPresent) ? 'notPresent' : '';
        }
        return btnClass;
    }

    return (
        <div className='keyboard'>
            <div className='firstRow'>
                {eng_keyboard.firstRow.map(item => <KeyboardButton addClass={getBtnClass(item)} key={item} onclick={handleClick} value={item.toUpperCase()}/>)}
            </div>
            <div className='secondRow'>
                {eng_keyboard.secondRow.map(item => <KeyboardButton  addClass={getBtnClass(item)} key={item} onclick={handleClick} value={item.toUpperCase()}/>)}
            </div>
            <div className='thirdRow'>
                {eng_keyboard.thirdRow.map(item => <KeyboardButton  addClass={getBtnClass(item)} key={item} onclick={handleClick} value={item.toUpperCase()}/>)}
            </div>
        </div>
    )
}

export default Keyboard;