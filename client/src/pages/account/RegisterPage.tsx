import {FieldValues, useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

import {registerValidationSchema} from './accountValidations';
import {useAppDispatch} from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import {signInUser} from '../../app/slices/accountSlice';
import PasswordInput from '../../components/input/PasswordInput';
import TextInput from '../../components/input/TextInput';
import {useState} from 'react';

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
    <div className='h-screen w-screen flex items-center justify-center   '>
      <div className='h-auto lg:p-20 p-5 w-full flex items-center justify-center'>
        <div className='w-full lg:max-w-md '>
          <p className='text-4xl lg:text-7xl text-center pb-10 uppercase'>
            Inscription
          </p>

          <form
            autoComplete='off'
            onSubmit={handleSubmit(submitForm)}
            className='grid grid-flow-row gap-4  w-full'
          >
            <TextInput
              autoComplete='off'
              type='text'
              control={control}
              label="Nom d'utilisateur"
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
              label='Confirmation du mot de passe'
              name='password2'
              placeholder=''
            />

            <input
              disabled={!isValid}
              className={`${
                isValid
                  ? ' bg-indigo-500 text-white cursor-pointer '
                  : ' bg-gray-200 text-gray-500 '
              }   w-full py-2 mb-5 px-5 uppercase`}
              type='submit'
              value={isSubmitting ? 'Inscription en cours' : 'Inscrire'}
            />
            <div className=' text-red-500 mb-5'>
              {errors.map((error, index) => (
                <p className='text-sm mb-1' key={index}>
                  {error}
                </p>
              ))}
            </div>
          </form>
          <Link
            to={loginPath}
            className='underline underline-offset-4 text-center'
          >
            <p className=' font-Secondary text-lg '>
              Vous êtes deja inscrit, Connectez vous.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

const loginPath = '/account/login';
