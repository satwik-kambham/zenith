export default function PathCard({ path }) {
  return (
    <div className="card">
      <p>{path.topic}</p>
      <p>{path.level}</p>
      <p>{path.methods}</p>
      <p>{path.result}</p>
    </div>
  );
}
