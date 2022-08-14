import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { UserProfile } from '../../app/models/userProfile';
import { setProfile } from '../../app/slices/accountSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { ProfileValidationSchema } from '../../app/validation/profileValidationSchema';
import AppButton from '../common/AppButton';
import TextInput from '../input/TextInput';

interface Props {
  onClose: (value?: UserProfile) => void;
}

export default function ProfileForm({ onClose }: Props) {
  const { profile } = useAppSelector((state) => state.account);
  const isEdit = !!profile;

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(ProfileValidationSchema),
  });

  useEffect(() => {
    if (profile && !isDirty) {
      const item = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone || '',
        mobile: profile.mobile,
        address1: profile.address1,
        address2: profile.address2 || '',
      };
      reset(item, { keepDirty: false });
    }
  }, [isDirty, profile, reset]);

  async function submitData(data: FieldValues) {
    let result = null;
    try {
      if (isEdit) {
        result = await agent.Account.editProfile(data);
      } else {
        result = await agent.Account.createProfile(data);
      }

      if (result && result.id) {
        dispatch(setProfile(result));
        onClose(result);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className='flex flex-col gap-y-4 w-full'
    >
      <TextInput
        control={control}
        placeholder={''}
        label='Prénom'
        name={'firstName'}
      />
      <TextInput
        control={control}
        placeholder={''}
        label='Nom'
        name={'lastName'}
      />

      <div className='grid grid-cols-2 gap-5'>
        <TextInput
          autoComplete='phone'
          control={control}
          placeholder={''}
          type='tel'
          label='Téléphone'
          name={'phone'}
        />
        <TextInput
          autoComplete='mobile'
          control={control}
          placeholder={''}
          type='tel'
          label='Mobile'
          name={'mobile'}
        />
      </div>
      <TextInput
        control={control}
        placeholder={''}
        label='Address'
        name={'address1'}
      />
      <TextInput
        control={control}
        placeholder={''}
        label='Address auxiliaire'
        name={'address2'}
      />

      <div className='w-full grid grid-cols-2 gap-x-5 mt-5'>
        <AppButton
          label='Annuler'
          genre='secondary'
          type='button'
          onClick={() => onClose()}
        />
        <AppButton
          disabled={!isValid || !isDirty || isSubmitting}
          label={isSubmitting ? 'Enregistrement en cours' : 'Enregistrer'}
          genre='primary'
          type='submit'
        />
      </div>
    </form>
  );
}
