const Cell = ({input, animMult}) => {
    const {correctPosition, wrongPosition, notPresent} = input;
    return (
        <div
            style={{animationDelay: 0.15 * (animMult) + 's'}}
            className={`cell ${correctPosition ? 'correctPos' :
                        wrongPosition ? 'wrongPos' : 
                        notPresent ? 'notPresent' : ''}`}
        >
            {input.input.toUpperCase()}
        </div>
    )
}

export default Cell;