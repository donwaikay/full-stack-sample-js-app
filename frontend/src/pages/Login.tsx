import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="auth-page">
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          login.mutate(
            { email, password },
            { onSuccess: () => navigate('/browse') },
          );
        }}
      >
        <h1>Sign In</h1>
        {login.isError && <p className="form-error">{(login.error as Error).message}</p>}
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-lg" disabled={login.isPending}>
          {login.isPending ? 'Signing In…' : 'Sign In'}
        </button>
        <p className="auth-switch">
          New to CineVault? <Link to="/signup">Sign up now</Link>.
        </p>
      </form>
    </div>
  );
}
