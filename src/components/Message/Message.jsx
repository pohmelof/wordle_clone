import './message.css';

const Message = ({message}) => {
    return (
        <div className={`sysMessage ${message.danger ? 'dangerMsg' : 'correctMsg'} ${message.text !== '' ? 'sysMessage-active' : ''}`}>
            {message.text}
        </div>
    )
};

export default Message;