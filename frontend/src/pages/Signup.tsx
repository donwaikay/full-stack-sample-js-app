import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = (location.state as { email?: string } | null)?.email ?? '';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <div className="auth-page">
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          signup.mutate(
            { email, password, displayName },
            { onSuccess: () => navigate('/browse') },
          );
        }}
      >
        <h1>Create Account</h1>
        {signup.isError && <p className="form-error">{(signup.error as Error).message}</p>}
        <input
          type="text"
          required
          placeholder="Your name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
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
          minLength={8}
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-lg" disabled={signup.isPending}>
          {signup.isPending ? 'Creating Account…' : 'Sign Up'}
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>.
        </p>
      </form>
    </div>
  );
}
