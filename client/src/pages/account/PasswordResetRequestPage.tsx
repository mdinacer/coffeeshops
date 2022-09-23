import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FieldValues, useForm } from 'react-hook-form';

import TextInput from '../../components/input/TextInput';
import AppButton from '../../components/common/AppButton';
import AppLink from '../../components/common/AppLink';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const resolver = yupResolver(
  yup.object({
    email: yup
      .string()
      .email()
      .required("Le nom d'utilisateur est obligatoire"),
  })
);

export default function PasswordResetRequestPage() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver,
  });

  async function handleSubmitData(values: FieldValues) {
    console.log(values);

    try {
      const { email } = values;
      const result = await agent.Account.resetPasswordRequest(email);
      if (result) {
        console.log(result);
        toast.success('Success');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=' m-auto h-auto max-w-md text-stone-600 '>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className='flex flex-col items-stretch justify-center gap-y-4 bg-stone-300 p-6 font-Primary md:rounded'
      >
        <p className=' text-center text-2xl'>Mot de passe oublié ?</p>
        <p>
          Veuillez entrer votre adresse e-mail pour lancer la réinitialisation
          du mot de passe.
        </p>
        <TextInput
          type='email'
          control={control}
          label='Adresse e-mail'
          name={'email'}
        />

        <div className='mt-5 grid grid-cols-2 gap-4'>
          <AppLink toPath='/' genre='secondary' label={'Annuler'} />
          <AppButton
            disabled={!isValid}
            genre='primary'
            type='submit'
            label={isSubmitting ? 'Validation en cours' : 'Valider'}
          />
        </div>
      </form>
    </div>
  );
}
