import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const from = state?.from || '/';
  const navigate = useNavigate();
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
      navigate('/');
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
    <Layout className='flex h-full w-full items-center justify-center'>
      <div className='flex h-auto w-full items-center justify-center p-5 lg:p-20'>
        <div className='w-full lg:max-w-md '>
          <p className=' pb-10 text-center font-Primary text-4xl uppercase lg:text-7xl'>
            Connexion
          </p>

          <form
            onSubmit={handleSubmit(submitForm)}
            className='flex w-full flex-col  gap-y-4'
          >
            <TextInput
              autoComplete='email'
              type='email'
              control={control}
              label={`Email`}
              name='email'
              placeholder='Tapez votre email'
            />

            <PasswordInput
              autoComplete='password'
              control={control}
              label='Mot de passe'
              name='password'
              placeholder='Tapez votre mot de passe'
            />
            <p className=' w-full text-center text-sm text-red-500'>{error}</p>
            <input
              disabled={!isValid}
              className={`${
                isValid
                  ? ' cursor-pointer bg-sky-500 text-white '
                  : ' bg-gray-200 text-gray-500 '
              }   mb-5 w-full py-2 px-5 uppercase`}
              type='submit'
              value={isSubmitting ? 'Connexion en cours' : 'Se connecter'}
            />
          </form>

          <Link
            to={registerPath}
            className='text-center underline underline-offset-4 '
          >
            <p className=' font-Secondary text-lg '>Créer un nouveau compte.</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

const registerPath = '/account/register';
