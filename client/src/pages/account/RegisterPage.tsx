import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { registerValidationSchema } from './accountValidations';
import agent from '../../app/api/agent';
import PasswordInput from '../../components/input/PasswordInput';
import TextInput from '../../components/input/TextInput';
import { useState } from 'react';
import Layout from '../../components/Layout';
import AppDialog from '../../components/common/AppDialog';
import AppButton from '../../components/common/AppButton';
import { toast } from 'react-toastify';
import AppLink from '../../components/common/AppLink';

export default function RegisterPage() {
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
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
        setSuccess(true);
        setEmail(data.email);
      }
    } catch (error) {
      if (Array.isArray(error)) {
        setErrors(error);
      }
      console.log(error);
    }
  }

  function handleConfirmEmailResend() {
    if (!email) return;
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success(
          'E-mail de vérification renvoyé - veuillez vérifier votre boite e-mail'
        );
      })
      .catch((error) => console.log(error));
  }

  return (
    <Layout
      className=''
      dialogVisible={success}
      dialogContent={
        <AppDialog
          title='Enregistré avec succès!'
          className='max-w-lg bg-white'
        >
          <div>
            <p className=' mb-5 font-Secondary text-base'>
              Veuillez vérifier votre boite e-mail (y compris le courrier
              indésirable) pour l'e-mail de vérification
            </p>

            <small className=' font-Secondary text-sm '>
              Vous n'avez pas reçu l'e-mail ? Cliquez sur le bouton ci-dessous
              pour renvoyer
            </small>

            <div className='mt-10 flex flex-row items-center justify-between gap-x-5'>
              <AppButton
                label="Ré-envoyer l'email"
                genre='warning'
                onClick={() => handleConfirmEmailResend()}
              />
              <AppLink toPath='/' label='Fermer' genre='info' />
            </div>
          </div>
        </AppDialog>
      }
    >
      <div className='flex h-auto w-full items-center justify-center p-5 lg:p-20'>
        <div className='w-full lg:max-w-md '>
          <p className='pb-10 text-center text-4xl uppercase lg:text-7xl'>
            Inscription
          </p>

          <form
            autoComplete='name'
            onSubmit={handleSubmit(submitForm)}
            className='grid w-full grid-flow-row  gap-4'
          >
            <TextInput
              autoComplete='name'
              type='text'
              control={control}
              label='Nom'
              name='displayName'
              placeholder=''
            />
            <TextInput
              autoComplete='username'
              type='text'
              control={control}
              label="Nom d'utilisateur"
              name='username'
              placeholder=''
            />
            <TextInput
              autoComplete='email'
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
