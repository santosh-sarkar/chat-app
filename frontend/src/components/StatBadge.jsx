const StatBadge = ({ label, value }) => {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm">
      <span className="text-gray-400">{label}: </span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
};

export default StatBadge;
