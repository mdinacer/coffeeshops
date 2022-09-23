import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useAppDispatch } from '../../app/store/configureStore';
import { loginValidationSchema } from './accountValidations';
import { signInUser } from '../../app/slices/accountSlice';
import TextInput from '../../components/input/TextInput';
import PasswordInput from '../../components/input/PasswordInput';
import Layout from '../../components/Layout';
import AppButton from '../../components/common/AppButton';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    control,
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

  return (
    <Layout className='flex h-full w-full items-center justify-center 2xl:max-w-none'>
      <div className='flex h-auto w-full items-center justify-center p-5 lg:p-20'>
        <div className='w-full lg:max-w-md '>
          <p className=' pb-10 text-center font-Primary text-4xl uppercase lg:text-7xl'>
            Connexion
          </p>

          <form
            onSubmit={handleSubmit(submitForm)}
            className='mb-5 flex w-full  flex-col gap-y-4'
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
            <Link to={'/account/resetPasswordRequest/'}>
              Mot de passe oublié ?
            </Link>
            <AppButton
              disabled={!isValid}
              genre='primary'
              type='submit'
              label={isSubmitting ? 'Connexion en cours' : 'Se connecter'}
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
