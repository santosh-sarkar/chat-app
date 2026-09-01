import StatBadge from "./StatBadge";

const ChatHeader = ({ user, messageCount, userCount, onLogout }) => {
  return (
    <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-gray-700 bg-gray-800/95 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-600 font-bold text-white">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-300">
            Chat room
          </p>
          <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <StatBadge label="Messages" value={messageCount} />
        <StatBadge label="Users" value={userCount} />

        <button
          type="button"
          onClick={onLogout}
          className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2.5 font-medium text-gray-100 transition hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
