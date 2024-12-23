'use client';

import {cn} from '@/lib/utils';
import {setUser} from '@/redux/features/userSlice';
import Form from 'next/form';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useActionState, useEffect} from 'react';
import {useFormStatus} from 'react-dom';
import {useDispatch} from 'react-redux';
import {loginAction, registerAction} from './actions';

type FormType = 'login' | 'register';

const AuthForm = ({type}: {type: FormType}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialState = {
    message: '',
    user: '',
  };

  const isRegister = type === 'register';

  const useFormAction = isRegister ? registerAction : loginAction;

  const [state, formAction] = useActionState(useFormAction, initialState);

  const {pending} = useFormStatus();

  useEffect(() => {
    if (state.user) {
      dispatch(setUser(state.user));

      router.push('/');
    }

    if (!state.user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        router.push('/');
      } else '';
    }
  }, [state.user, dispatch, router]);

  return (
    <div className="w-full max-w-md mx-auto px-8 my-10">
      <h1 className="text-center text-2xl font-bold mb-6">Welcome!</h1>
      <h2 className="text-2xl font-bold mb-4">{isRegister ? 'Register' : 'Login'}</h2>

      <Form action={formAction} className="space-y-4">
        {isRegister && (
          <>
            <div>
              <label htmlFor="firstname" className="block mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="block mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <p aria-live="polite">{state?.message}</p>

        <button
          disabled={pending}
          type="submit"
          className={cn(
            'w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600',
            pending ? 'bg-purple-300' : ''
          )}>
          {isRegister ? 'Register' : 'Login'}
        </button>

        <div className="flex gap-2">
          <p>{!isRegister ? "Don't have an account?" : 'Have an account?'}</p>
          <Link href={!isRegister ? '/register' : '/login'} className="text-purple-600">
            {!isRegister ? 'Register' : 'Login'}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
