'use client';

import { FC, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from './Modal';
import Header from '../Header';
import CATEGORIES from '@/constants/category';
import useRentModal from '@/hooks/useRentModal';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface RentModalProps {}

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal: FC<RentModalProps> = ({}) => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(Steps.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      price: 1,
      title: '',
      category: '',
      roomCount: 1,
      imageSrc: '',
      guestCount: 1,
      location: null,
      description: '',
      bathroomCount: 1,
    },
  });

  const category = watch('category');
  const location = watch('location');
  const imageSrc = watch('imageSrc');
  const roomCount = watch('roomCount');
  const guestCount = watch('guestCount');
  const bathroomCount = watch('bathroomCount');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('inside submit', step);
    console.log(data);

    if (step !== Steps.PRICE) {
      return onNext();
    }

    console.log('saving to db..');

    setIsLoading(true);

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing Created!');
        router.refresh();
        reset();
        setStep(Steps.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === Steps.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Header
        title='Which of these best describes your place'
        subTitle='Pick a category'
      />
      <div className='grid gird-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {CATEGORIES.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              category={item}
              onClick={(category: string) =>
                setCustomValue('category', category)
              }
              isSelected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === Steps.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Header
          title='Where is your place located?'
          subTitle='Help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === Steps.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Header
          title='Share some basics about your place'
          subTitle='what amenities do you have?'
        />
        <Counter
          title='Guests'
          subTitle='How many guests do you allow?'
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title='Rooms'
          subTitle='How many rooms do you have?'
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title='Bathrooms'
          subTitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === Steps.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Header
          title='Add images of your place'
          subTitle='Show guests what your plce looks like!'
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === Steps.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Header
          title='How would you descripe your place?'
          subTitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === Steps.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Header
          title='Now, set your price'
          subTitle='How much do you charge per night'
        />
        <Input
          id='price'
          label='Price'
          formatPrice
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      title='Airbnb your home!'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      secondaryAction={step === Steps.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
};

export default RentModal;
