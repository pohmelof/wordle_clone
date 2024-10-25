import Cell from "./Cell";
import './gameboard.css';

const Gameboard = ({inputs}) => {
  return (
    <div className='gameboard'>
      {inputs.map((input, index) => {
        const animMult = index % 5;
        return <Cell key={input.id} input={input} animMult={animMult} />
      })}
    </div>
  )
}

export default Gameboard;