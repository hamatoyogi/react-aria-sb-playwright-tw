import * as React from 'react';

interface PasswordFormProps {
  onAccountCreation: (email: string, password: string) => void;
  onSignInClick: () => void;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  onAccountCreation,
  onSignInClick,
}) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleAccountCreation = (event: React.FormEvent) => {
    event.preventDefault();
    onAccountCreation(email, password);
  };

  return (
    <main className="bg-emerald-200 flex max-w-[800px] flex-col justify-center items-center px-16 py-12 max-md:px-5">
      <section className="bg-slate-50 flex w-[455px] max-w-full flex-col mt-6 mb-6 px-10 py-12 rounded-[32px] max-md:px-5">
        <h1
          className="text-neutral-800 text-center text-4xl font-bold leading-10 self-center whitespace-nowrap mt-1.5"
          aria-label="Create Account Title"
        >
          Create An Account
        </h1>
        <p
          className="text-neutral-700 text-center text-base leading-5 self-center max-w-[308px] mt-5"
          aria-label="Create Account Description"
        >
          Create an account to enjoy all the services without any ads for free!
        </p>
        <form onSubmit={handleAccountCreation}>
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="text-black text-opacity-50 text-center text-base leading-5 whitespace-nowrap border bg-white self-stretch justify-center mt-8 pl-6 pr-16 py-6 rounded-xl border-solid border-black border-opacity-10 items-start max-md:px-5"
            aria-label="Email Address Input"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="text-black text-opacity-50 text-center text-base leading-5 whitespace-nowrap border bg-white self-stretch justify-center mt-4 pl-6 pr-16 py-6 rounded-xl border-solid border-black border-opacity-10 items-start max-md:px-5"
            aria-label="Password Input"
          />
          <button
            type="submit"
            className="text-white text-center text-2xl font-bold leading-7 whitespace-nowrap bg-emerald-300 self-center justify-center items-stretch mt-5 px-12 py-6 rounded-2xl max-md:px-5"
          >
            Create Account
          </button>
        </form>
        <p className="text-neutral-700 text-center text-sm leading-5 underline self-center whitespace-nowrap mt-4 mb-1.5">
          Already Have An Account?
          <a href="#" onClick={onSignInClick} className="underline">
            Sign In
          </a>
        </p>
      </section>
    </main>
  );
};
