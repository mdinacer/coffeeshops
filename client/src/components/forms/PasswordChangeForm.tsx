import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FieldValues, useForm } from 'react-hook-form';
import AppButton from '../common/AppButton';
import AppPasswordInput from '../input/PasswordInput';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/store/configureStore';
import { signOut } from '../../app/slices/accountSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClose: () => void;
}

const resolver = yupResolver(
  yup.object({
    currentPassword: yup.string().required('Le mot de passe ne peut être vide'),
    newPassword: yup
      .string()
      .required('Le mot de passe ne peut être vide')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Le mot de passe doit contenir au minimum 8 caractères, à savoir : au moins une lettre minuscule et une lettre majuscule et un chiffre.'
      ),
    password2: yup
      .string()
      .oneOf(
        [yup.ref('newPassword'), null],
        'Le mot de passe doit être identique'
      ),
    // email: yup.string().email().required("Ce Champ est obligatoire"),
  })
);

export default function PasswordChangeForm({ onClose }: Props) {
  const dispatch = useAppDispatch();
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
    try {
      const { currentPassword, newPassword } = values;
      const result = await agent.Account.changePassword(
        currentPassword,
        newPassword
      );
      if (result) {
        toast.success('Le mot de passe a été changé avec success.', {
          autoClose: 5000,
          onClose: () => {
            dispatch(signOut());
            navigate('/account/login');
          },
        });
      }
    } catch (error) {
      toast.error(
        'Un problème est survenu lors du changement du mot de passe',
        {
          autoClose: 3000,
          onClose: () => {
            navigate('/account/profile');
          },
        }
      );
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className=' flex  flex-col gap-y-5'
    >
      <AppPasswordInput
        autoComplete='new-password'
        control={control}
        label='Mot de passe actuel'
        name='currentPassword'
        placeholder=''
      />
      <AppPasswordInput
        autoComplete='new-password'
        control={control}
        label='Nouveau mot de passe'
        name='newPassword'
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
