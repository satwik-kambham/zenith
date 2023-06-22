export default function PathCard({ path, onClick }) {
  const handleCardClick = () => {
    onClick(path);
  };

  const truncateResult = (result, maxLength) => {
    if (result.length <= maxLength) {
      return result;
    }
    const truncatedResult = result.substr(0, maxLength).trim();
    return truncatedResult + "...";
  };

  const truncatedResult = truncateResult(path.result, 100);

  return (
    <div className="p-4" onClick={handleCardClick}>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6">
        <p className="text-xl font-semibold mb-2">{path.topic}</p>
        <p className="text-gray-300">{path.level}</p>
        <p className="text-gray-300 mb-4">{path.methods}</p>
        <p className="text-gray-300">{truncatedResult}</p>
      </div>
    </div>
  );
}
