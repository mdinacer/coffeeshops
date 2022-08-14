import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useAppDispatch } from '../../app/store/configureStore';
import { loginValidationSchema } from './accountValidations';
import { signInUser } from '../../app/slices/accountSlice';
import TextInput from '../../components/input/TextInput';
import PasswordInput from '../../components/input/PasswordInput';
import Layout from '../../components/Layout';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { state }: any | null = useLocation();
  const [error, setError] = useState('');

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
    } catch (error: any) {
      setError('Email or password incorrect');
      console.log(error);
    }
  }

  useEffect(() => {
    const username = state?.username;
    if (username) {
      setValue('username', username);
    }
  }, [setValue, state?.username]);

  return (
    <Layout className='w-full h-full flex items-center justify-center'>
      <div className='h-auto lg:p-20 p-5 w-full flex items-center justify-center'>
        <div className='w-full lg:max-w-md '>
          <p className=' font-Primary text-4xl lg:text-7xl text-center pb-10 uppercase'>
            Connexion
          </p>

          <form
            onSubmit={handleSubmit(submitForm)}
            className='flex flex-col gap-y-4  w-full'
          >
            <TextInput
              autoComplete='username'
              type='text'
              control={control}
              label={`Nom d'utilisateur`}
              name='username'
              placeholder="Tapez votre nom d'utilisateur"
            />

            <PasswordInput
              autoComplete='password'
              control={control}
              label='Mot de passe'
              name='password'
              placeholder='Tapez votre mot de passe'
            />
            <p className=' text-red-500 text-sm text-center w-full'>{error}</p>
            <input
              disabled={!isValid}
              className={`${
                isValid
                  ? ' bg-indigo-500 text-white cursor-pointer '
                  : ' bg-gray-200 text-gray-500 '
              }   w-full py-2 mb-5 px-5 uppercase`}
              type='submit'
              value={isSubmitting ? 'Connexion en cours' : 'Se connecter'}
            />
          </form>

          <Link
            to={registerPath}
            className='underline underline-offset-4 text-center '
          >
            <p className=' font-Secondary text-lg '>Créer un nouveau compte.</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

const registerPath = '/account/register';
