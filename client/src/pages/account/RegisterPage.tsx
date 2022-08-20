import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { registerValidationSchema } from './accountValidations';
import { useAppDispatch } from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import { signInUser } from '../../app/slices/accountSlice';
import PasswordInput from '../../components/input/PasswordInput';
import TextInput from '../../components/input/TextInput';
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'all', resolver: yupResolver(registerValidationSchema) });

  async function submitForm(data: FieldValues) {
    const { password2, ...user } = data;
    try {
      const result = await agent.Account.register(user);
      if (result) {
        await dispatch(signInUser(data));
        navigate('/profile');
      }
    } catch (error) {
      if (Array.isArray(error)) {
        setErrors(error);
      }
      console.log(error);
    }
  }

  return (
    <Layout className=''>
      <div className='flex h-auto w-full items-center justify-center p-5 lg:p-20'>
        <div className='w-full lg:max-w-md '>
          <p className='pb-10 text-center text-4xl uppercase lg:text-7xl'>
            Inscription
          </p>

          <form
            autoComplete='off'
            onSubmit={handleSubmit(submitForm)}
            className='grid w-full grid-flow-row  gap-4'
          >
            <TextInput
              autoComplete='off'
              type='text'
              control={control}
              label='Nom'
              name='username'
              placeholder=''
            />
            <TextInput
              autoComplete='off'
              type='email'
              control={control}
              label='Email'
              name='email'
              placeholder=''
            />

            <PasswordInput
              autoComplete='new-password'
              control={control}
              label='Mot de passe'
              name='password'
              placeholder=''
            />
            <PasswordInput
              autoComplete='repeat-password'
              control={control}
              label='Confirmation'
              name='password2'
              placeholder=''
            />

            <input
              disabled={!isValid}
              className={`${
                isValid
                  ? ' cursor-pointer bg-sky-500 text-white '
                  : ' bg-gray-200 text-gray-500 '
              }   mb-5 w-full py-2 px-5 uppercase`}
              type='submit'
              value={isSubmitting ? 'Inscription en cours' : 'Inscrire'}
            />
            <div className=' mb-5 text-red-500'>
              {errors.map((error, index) => (
                <p className='mb-1 text-sm' key={index}>
                  {error}
                </p>
              ))}
            </div>
          </form>
          <Link
            to={loginPath}
            className='text-center underline underline-offset-4'
          >
            <p className=' font-Secondary text-lg '>
              Vous êtes deja inscrit, Connectez vous.
            </p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

const loginPath = '/account/login';
