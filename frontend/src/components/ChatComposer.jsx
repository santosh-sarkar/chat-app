const ChatComposer = ({ value, onChange, onSend }) => {
  return (
    <div className="sticky bottom-0 z-10 shrink-0 border-t border-gray-700 bg-gray-900/95 px-6 py-4 backdrop-blur-sm">
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSend();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={onSend}
          className="rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white transition hover:bg-gray-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComposer;
