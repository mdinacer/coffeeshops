import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
import { signOut } from '../../app/slices/accountSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppButton from '../../components/common/AppButton';
import AppLink from '../../components/common/AppLink';
import AppPasswordInput from '../../components/input/PasswordInput';
import { passwordResetValidationSchema } from './accountValidations';

export default function PasswordResetPage() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(passwordResetValidationSchema),
  });

  async function handleSubmitData(values: FieldValues) {
    if (!token || !email) return;
    try {
      const { password } = values;
      const result = await agent.Account.resetPassword(email, token, password);
      if (result) {
        toast.success('Le mot de passe a été changé avec success.');
        dispatch(signOut());
        navigate('/account/login');
      }
    } catch (error) {
      toast.error('Un problème est survenu lors du changement du mot de passe');
      navigate('/account/profile');
      console.log(error);
    }
  }

  if (!token || !email) return <Navigate to={'/'} />;
  return (
    <div className='m-auto  flex h-auto w-auto items-center justify-center text-stone-600 '>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className=' flex w-full max-w-md flex-col gap-y-5 bg-stone-300 p-6 md:rounded'
      >
        <p className=' mb-5 text-center font-Primary text-xl'>
          Changer le mot de passe
        </p>
        <AppPasswordInput
          autoComplete='new-password'
          control={control}
          label='Mot de passe'
          name='password'
          placeholder=''
        />
        <AppPasswordInput
          autoComplete='new-password'
          control={control}
          label='Confirmation'
          name='password2'
          placeholder=''
        />

        <div className='grid grid-cols-2 gap-4'>
          <AppLink
            toPath='/account/profile'
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
    </div>
  );
}
