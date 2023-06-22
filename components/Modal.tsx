export default function Modal({ path, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-lg">
        <p className="text-xl font-semibold mb-2">{path.topic}</p>
        <p className="text-gray-300">Level: {path.level}</p>
        <p className="text-gray-300 mb-4">Methods: {path.methods}</p>
        <p className="text-gray-300">{path.result}</p>

        <button
          className="bg-gradient-to-r from-blue-500 to-teal-400 text-white mt-4 px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
