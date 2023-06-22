export default function Landing() {
  return (
    <div className="container">
      <h1>Zenith</h1>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="button" href="/api/auth/login">
        Login
      </a>
    </div>
  );
}
