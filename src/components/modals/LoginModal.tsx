'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useCallback, useState, FC } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from './Modal';
import Button from '../Button';
import Header from '../Header';
import Input from '../inputs/Input';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log('inside on submit');

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((response) => {
      setIsLoading(false);
      if (response?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
      if (response?.error) {
        toast.error(`Failed to login:  ${response.error}`);
      }
    });
  };

  const toogle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Header title='Welcome back' subTitle='Login to your account' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Loing with Google'
        icon={FcGoogle}
        onClick={() => {
          signIn('github');
        }}
      />
      <Button
        outline
        label='Login with Github'
        icon={AiFillGithub}
        onClick={() => {
          signIn('github');
        }}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>First time using Airbnb ?</div>
          <div
            onClick={toogle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Create an acount
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title='Login'
      body={bodyContent}
      disabled={isLoading}
      footer={footerContent}
      actionLabel='Continue'
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModal;
