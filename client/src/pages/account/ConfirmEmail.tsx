import { MailIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
import AppButton from '../../components/common/AppButton';
import AppLink from '../../components/common/AppLink';
import Layout from '../../components/Layout';

const Status = {
  Verifying: 'Verifying',
  Failed: 'Failed',
  Success: 'Success',
};

export default function ConfirmEmail() {
  const [status, setStatus] = useState(Status.Verifying);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  async function handleConfirmEmailResend() {
    if (!email) return;
    try {
      const result = await agent.Account.resendEmailConfirm(email);
      if (result) {
        toast.success(
          'E-mail de vérification renvoyé - veuillez vérifier votre boite e-mail'
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const verifyEmailData = useCallback(async (email: string, token: string) => {
    try {
      const result = await agent.Account.verifyEmail(token, email);
      if (result) {
        setStatus(Status.Success);
      }
    } catch (error) {
      setStatus(Status.Failed);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (token && email) {
      verifyEmailData(email, token);
    }
  }, [token, email]);

  function getBody() {
    switch (status) {
      case Status.Verifying:
        return <p>Vérification...</p>;
      case Status.Failed:
        return (
          <div className=' w-full'>
            <p>
              Échec de la vérification. Vous pouvez essayer de renvoyer le lien
              de vérification à votre adresse e-mail
            </p>
            <div className='mt-5 flex w-full justify-end'>
              <AppButton
                genre='primary'
                onClick={handleConfirmEmailResend}
                label='Resend email'
              />
            </div>
          </div>
        );
      case Status.Success:
        return (
          <div>
            <p>
              L'e-mail a été vérifié - vous pouvez maintenant vous connecter
            </p>
            <div className='mt-5 flex w-full justify-end'>
              <AppLink
                label='Se connecter'
                genre='primary'
                toPath='/account/login'
              />
            </div>
          </div>
        );
    }
  }

  return (
    <Layout className=' flex items-center justify-center bg-gray-200'>
      <div className=' rounded-2xl bg-white p-6'>
        <div className=' mb-5 inline-flex items-center'>
          <MailIcon className='mr-2 h-7 w-7' />
          <p className=' font-Secondary text-2xl'>Vérification de l'E-mail</p>
        </div>

        <div>{getBody()}</div>
      </div>
    </Layout>
  );
}
