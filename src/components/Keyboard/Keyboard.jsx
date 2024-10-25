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
        let guess =  guesses.find(guess => guess.input === item && guess.correctPosition);
        if (!guess) {
            guess = guesses.find(guess => guess.input === item && guess.wrongPosition);
        }
        if (!guess) {
            guess = guesses.find(guess => guess.input === item);
        }
        let addClass = '';
        if (!guess) {
            addClass = '';
        } else {
            if (guess.correctPosition) addClass = 'correctPos';
            if (guess.wrongPosition) addClass = 'wrongPos';
            if (guess.notPresent) addClass = 'notPresent';
        }
        return addClass;
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