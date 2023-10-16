
import { NavLink } from 'react-router-dom';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import React from 'react';

const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>Sign out</button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const activation = (isActive) => isActive ? 'active' : 'inactive';

const Navigation = () => (
  <nav className="d-flex">
    <NavLink to="/" className={activation(true)} end>Posts</NavLink> {/* Note: activation(true) is just a placeholder. You should replace this with the correct logic. */}
    <NavLink to="/users" className={activation(false)} end>Users</NavLink> {/* Note: activation(false) is just a placeholder. You should replace this with the correct logic. */}
    <AuthButton />
  </nav>
);

export default Navigation;