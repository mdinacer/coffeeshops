import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { shopUserValidationSchema } from '../../pages/account/accountValidations';
import AppButton from '../common/AppButton';
import PasswordInput from '../input/PasswordInput';
import TextInput from '../input/TextInput';

interface Props {
  onClose: () => void;
}

type ShopUser = { username: string; displayName: string; email: string };
export default function ShopUsersForm({ onClose }: Props) {
  const [users, setUsers] = useState<ShopUser[]>([]);
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<FieldValues | any, any>({
    mode: 'all',
    defaultValues: {
      username: '',
      displayName: '',
      password: '',
      password2: '',
    },
    resolver: yupResolver(shopUserValidationSchema),
  });
  const fetchUsers = useCallback(async () => {
    try {
      const result = await agent.Shops.listUsers();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function handleSubmitData(values: FieldValues) {
    try {
      const result = await agent.Shops.createUser(values);
      if (result) {
        setUsers((prev) => [...prev, result]);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className=''>
      <p className=' text-xl'>Gestion des utilisateurs</p>

      {users.length < 3 && (
        <form
          autoComplete='off'
          onSubmit={handleSubmit(handleSubmitData)}
          className='grid w-full grid-flow-row  gap-4'
        >
          <TextInput
            autoComplete='off'
            type='text'
            control={control}
            label='Nom'
            name='displayName'
            placeholder=''
          />
          <TextInput
            autoComplete='off'
            type='text'
            control={control}
            label="Nom d'utilisateur"
            name='username'
            placeholder=''
          />

          <PasswordInput
            autoComplete='new-password'
            control={control}
            label='Mot de passe'
            name='password'
            placeholder=''
          />

          <div className=' grid grid-cols-2 gap-4 '>
            <AppButton
              disabled={!isDirty}
              genre='error'
              type='button'
              label={'effacer'}
              onClick={() => reset()}
            />
            <AppButton
              disabled={!isValid}
              type='submit'
              label={isSubmitting ? 'Enregistrement en cours' : 'Ajouter'}
            />
          </div>
        </form>
      )}
      <ul className='my-5 flex flex-col items-stretch gap-y-5'>
        {users.map((user, index) => (
          <li key={index} className='rounded-xl bg-stone-50 px-5 py-2'>
            <p className=' font-Primary text-lg uppercase'>
              {user.displayName}
            </p>
            <div className=' w-full font-Secondary text-base  lowercase'>
              <p className='text-base'>{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
      <AppButton
        label='Fermer'
        genre='secondary'
        className='w-full'
        onClick={() => onClose()}
      />
    </div>
  );
}

const usersItems = [
  {
    title: 'gestionnaire',
    points: [
      'Ajouter / Modifier / Supprimer des articles.',
      'Ajouter des achats / ventes.',
      'Acceder a la listes des operations.',
      "Acceder a la liste d'inventaire.",
      'Ajouter / Modifier des transactions monétaires.',
      'Ajouter des paiements de dettes.',
    ],
    role: 'Moderator',
  },
  {
    title: 'serveur',
    points: [
      'Ajouter des ventes.',
      'Ajouter des articles.',
      'Ajouter les informations des clients.',
    ],
    role: 'Agent',
  },
];
