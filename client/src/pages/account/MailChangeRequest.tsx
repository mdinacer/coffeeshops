import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
import AppButton from '../../components/common/AppButton';
import AppPasswordInput from '../../components/input/PasswordInput';
import TextInput from '../../components/input/TextInput';
import { emailChangeValidationSchema } from './accountValidations';

interface Props {
  onClose: () => void;
}

export default function MailChangeRequest({ onClose }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(emailChangeValidationSchema),
  });

  async function handleSubmitData(values: FieldValues) {
    try {
      const { password, email } = values;
      const result = await agent.Account.changeEmailRequest(password, email);
      if (result) {
        toast.success(
          'Un email a été envoyer a votre nouvelle adresse, veuillez verifier votre boite de message'
        );
      }
    } catch (error) {
      toast.error(
        'Un problème est survenu lors du changement de votre address email'
      );

      console.log(error);
    } finally {
      onClose();
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className=' flex w-full max-w-md flex-col gap-y-5'
    >
      <AppPasswordInput
        autoComplete='password'
        control={control}
        label='Mot de passe actuel'
        name='password'
        placeholder=''
      />
      <TextInput
        autoComplete='new-password'
        control={control}
        type='email'
        label='Nouvel email'
        name='email'
        placeholder=''
      />

      <div className='grid grid-cols-2 gap-4'>
        <AppButton
          type='button'
          onClick={onClose}
          genre='secondary'
          label={'Annuler'}
        />
        <AppButton
          disabled={!isValid}
          type='submit'
          genre='primary'
          label={isSubmitting ? 'Validation en cours' : 'Valider'}
        />
      </div>
    </form>
  );
}
