export default function Profile({ user }) {
  return (
    <div className="container">
      <h1>Zenith</h1>
      <img src={user.picture} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <a className="button" href="/api/auth/logout">
        Logout
      </a>
    </div>
  );
}
