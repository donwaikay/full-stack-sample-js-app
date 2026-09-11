import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-hero">
        <h1>Unlimited movies, shows, and more.</h1>
        <p>Watch anywhere. Cancel anytime.</p>
        <p className="landing-sub">Ready to watch? Enter your email to create or restart your membership.</p>
        <form
          className="landing-form"
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/signup', { state: { email } });
          }}
        >
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-lg">
            Get Started ›
          </button>
        </form>
      </div>
    </div>
  );
}
