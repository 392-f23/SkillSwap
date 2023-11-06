import { NavLink } from "react-router-dom";
import { signInWithGoogle, signOut, useAuthState} from "../utilities/firebase";

const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>
    Sign in
  </button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>
    Sign out
  </button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  if (user) {
    console.log('User Info:', user.name, user.email, user.photoURL);
  }
  return user ? <SignOutButton /> : <SignInButton />;
};

const activation = ({ isActive }) => (isActive ? "active" : "inactive");

const Navigation = () => (
  <nav className="d-flex">
    <AuthButton className="buttonstyle" />
  </nav>
);

export default Navigation;
