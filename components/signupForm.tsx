import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Input from "@components/Input";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function redirectOnLogin() {
      const session = await getSession();
      if (session) window.location.replace("/");
    }
    setName("kunle");
    setEmail("ad@gmail.com");
    setPassword("password");
    redirectOnLogin();
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          name={name}
          type="text"
          placeholder="name"
          required
          value={name}
          // oninput={(e) => setName(e.currentTarget.value)}
          classname="block border border-neutral-300 focus:ring-neutral-900"
        />

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email Address"
          required
          value={email}
          //   oninput={(e) => setEmail(e.currentTarget.value)}
          classname="block border border-neutral-300 focus:ring-neutral-900"
        />

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          //   oninput={(e) => setPassword(e.currentTarget.value)}
          classname="block border border-neutral-300 focus:ring-neutral-900"
        />

        <button type="submit" disabled={isSubmitting} className="p-1 text-white bg-blue-800">
          SIGN UP
        </button>
      </form>
    </>
  );
};

export default SignupForm;
