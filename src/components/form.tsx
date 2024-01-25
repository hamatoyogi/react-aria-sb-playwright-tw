import * as React from 'react';
import {
  XIcon,
  CheckIcon,
  OpenEyeIcon,
  ClosedEyeIcon,
  LockIcon,
} from './icons';
import { string, object } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface PasswordFormProps {
  onPasswordCreation: (password: string) => void;
}

interface PasswordRequirements {
  isLongEnough: boolean;
  hasOneSpecialCharacter: boolean;
  hasOneLowercase: boolean;
}

const SCORE_TEXT = ['Weak', 'OK', 'Good', 'Strong'];

const specialCharRegEx = /(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})/;
const atLeastOneLowerCaseRegEx = /([a-z]){1,}/;

const passwordFormSchema = object({ password: string().min(1) });

export const PasswordForm: React.FC<PasswordFormProps> = ({
  onPasswordCreation,
}) => {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: '',
    },
  });
  const passwordWatch = watch('password');
  const requirementsMet = React.useMemo<PasswordRequirements>(() => {
    const isLongEnough = passwordWatch.length >= 8;
    const hasOneSpecialCharacter = specialCharRegEx.test(passwordWatch);
    const hasOneLowercase = atLeastOneLowerCaseRegEx.test(passwordWatch);
    return { isLongEnough, hasOneSpecialCharacter, hasOneLowercase };
  }, [passwordWatch]);
  const isSubmitEnabled = React.useMemo<boolean>(() => {
    const { isLongEnough, hasOneSpecialCharacter, hasOneLowercase } =
      requirementsMet;
    return [isLongEnough, hasOneSpecialCharacter, hasOneLowercase].some(
      (value) => value
    );
  }, [requirementsMet]);
  const meterScore = React.useMemo<number>(() => {
    return Object.values(requirementsMet).reduce((acc, value) => {
      if (value) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [requirementsMet]);

  const [shouldShowPassword, setShouldShowPassword] =
    React.useState<boolean>(false);

  const onSubmit = (data: { password: string }) => {
    onPasswordCreation(data.password);
  };

  return (
    <main className="bg-emerald-200 flex flex-col justify-center items-center px-16 py-12 max-md:px-5">
      <section className="bg-slate-50 flex w-[455px] max-w-full flex-col mt-6 mb-6 px-10 py-12 rounded-[32px] max-md:px-5">
        <LockIcon />
        <h1
          className="text-neutral-800 text-2xl font-bold leading-10 whitespace-nowrap mt-1.5"
          aria-label="Create secure password"
        >
          Create a secure password
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
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
              {...register('password')}
              type={shouldShowPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter secure password"
              className="w-full text-black text-opacity-50 text-base leading-5 whitespace-nowrap border bg-white self-stretch justify-center pl-6 pr-16 py-6 rounded-xl border-solid border-black border-opacity-10 items-start max-md:px-5"
              aria-label="Password Input"
            />
            <button
              type="button"
              className="underline text-slate-400 absolute right-2 hover:text-slate-300"
              onClick={() => setShouldShowPassword(!shouldShowPassword)}
            >
              {shouldShowPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>Password stregth</p>
            <meter
              value={meterScore}
              max="3"
              low={1}
              high={2.7}
              optimum={3}
              className="w-1/2"
            />
            <p>{SCORE_TEXT[meterScore]}</p>
          </div>
          <div>
            <p>Must contain at least:</p>
            <ul className="mt-4">
              <li className="flex gap-4">
                {requirementsMet.isLongEnough ? <CheckIcon /> : <XIcon />}
                <span>8 characters</span>
              </li>
              <li className="flex gap-4">
                {requirementsMet.hasOneSpecialCharacter ? (
                  <CheckIcon />
                ) : (
                  <XIcon />
                )}
                <span>1 special character</span>
              </li>
              <li className="flex gap-4">
                {requirementsMet.hasOneLowercase ? <CheckIcon /> : <XIcon />}
                <span>1 lower case character</span>
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="text-white text-center text-xl leading-7 disabled:bg-slate-100 transition-colors bg-emerald-300 self-center justify-center mt-5 px-12 py-6 rounded-2xl max-md:px-5 w-full"
            disabled={!isSubmitEnabled}
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
