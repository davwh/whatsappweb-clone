export default function ChatMessages({
  messages,
  user,
}) {
  
  if (!messages) return null;
  return messages.map((message) => {
    const isSender = message.uid === user.uid;
    
    return (
    <div
    key={message.id}
    className={`chat__message ${isSender ? "chat__message--sender" : ""}`}>
      <span className="chat__name">{message.name}</span>
      <span className="chat__message--message">{message.message}</span><br />
      <span className="chat__timestamp">{message.time}</span>
    </div>
    );
});
}
