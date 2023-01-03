import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import supabase from "./supabase";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<User | null>(null);

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
    });
  }, []);

  return (
    <section>
      {user ? <h1>Logged in as: {user.email}</h1> : <h1>Signup / Login</h1>}

      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <br />

      <button onClick={handleSignup}>Sign up</button>
      <button onClick={handleLogin}>Log in</button>
      {user && <button onClick={() => supabase.auth.signOut()}>Log out</button>}
    </section>
  );
}
