import * as React from 'react';
import { XIcon, CheckIcon } from './icons';

export interface PasswordFormProps {
  onAccountCreation: (password: string) => void;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  onAccountCreation,
}) => {
  const [password, setPassword] = React.useState<string>('');
  const [shouldShowPassword, setShouldShowPassword] =
    React.useState<boolean>(false);

  const handleAccountCreation = (event: React.FormEvent) => {
    event.preventDefault();
    onAccountCreation(password);
  };

  return (
    <main className="bg-emerald-200 flex flex-col justify-center items-center px-16 py-12 max-md:px-5">
      <section className="bg-slate-50 flex w-[455px] max-w-full flex-col mt-6 mb-6 px-10 py-12 rounded-[32px] max-md:px-5">
        <h1
          className="text-neutral-800 text-2xl font-bold leading-10 self-center whitespace-nowrap mt-1.5"
          aria-label="Create Account Title"
        >
          Create a secure password
        </h1>
        <form
          onSubmit={handleAccountCreation}
          className="flex flex-col gap-6 mt-10"
        >
          <div className="flex items-center gap-4 relative">
            <label
              htmlFor="password"
              className="text-opacity-50 text-base leading-5 whitespace-nowrap"
            >
              Password:
            </label>
            <input
              type={shouldShowPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure password"
              className="w-full text-black text-opacity-50 text-base leading-5 whitespace-nowrap border bg-white self-stretch justify-center pl-6 pr-16 py-6 rounded-xl border-solid border-black border-opacity-10 items-start max-md:px-5"
              aria-label="Password Input"
            />
            <button
              type="button"
              className="underline text-slate-400 absolute right-2 hover:text-slate-300"
              onClick={() => setShouldShowPassword(!shouldShowPassword)}
            >
              {shouldShowPassword ? (
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>Password stregth</p>
            <meter
              value={password.length}
              max="3"
              low={1}
              high={2.7}
              optimum={3}
              className="w-1/2"
            />
            <p>Weak</p>
          </div>
          <div>
            <p>Must contain at least:</p>
            <ul className="mt-4">
              <li className="flex gap-4">
                <XIcon /> <span>8 characters</span>
              </li>
              <li className="flex gap-4">
                <XIcon /> <span>1 special character</span>
              </li>
              <li className="flex gap-4">
                <XIcon /> <span>1 lower case character</span>
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="text-white text-center text-xl leading-7 bg-emerald-300 self-center justify-center mt-5 px-12 py-6 rounded-2xl max-md:px-5 w-full"
          >
            Continue
          </button>
          <p className="text-neutral-700 text-center text-sm leading-5 underline self-center whitespace-nowrap mt-4 mb-1.5">
            <a href="#" className="underline">
              Forgot password?
            </a>
          </p>
        </form>
      </section>
    </main>
  );
};
