import { Link } from 'react-router-dom';
import type { User } from '../types';

export default function Navbar({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          CINE<span>VAULT</span>
        </Link>
        {user && (
          <nav className="navbar-links">
            <Link to="/browse">Home</Link>
            <Link to="/browse#mylist">My List</Link>
          </nav>
        )}
        <div className="navbar-right">
          {user ? (
            <div className="navbar-user">
              <span className="avatar">{user.displayName.charAt(0).toUpperCase()}</span>
              <button className="link-button" onClick={onLogout}>
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
