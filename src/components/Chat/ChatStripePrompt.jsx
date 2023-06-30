import ChatStripe from "./ChatStripe";
export default function ChatStripePrompt({
  promptMessage = "",
  time,
  avatarSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIQctMpfDaRxFb7YrryqRe1-2hK2r1getr-w&usqp=CAU",
}) {
  return (
    <ChatStripe>
      <div className="d-flex flex-row-reverse">
        <div className="flex-shrink-0 ml-2">
          <img src={avatarSrc} alt="avatar" className="avatar" />
        </div>
        <div>
          <p className="chat-stripe-prompt">{promptMessage}</p>
          <small className="text-muted pull-right">{time}</small>
        </div>
      </div>
    </ChatStripe>
  );
}
