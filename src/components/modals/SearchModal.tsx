'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic';
import { Range } from 'react-date-range';
import formatISO from 'date-fns/formatISO';
import { FC, useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Modal from './Modal';
import Header from '../Header';
import Country from '@/models/Country';
import Counter from '../inputs/Counter';
import Calendar from '../inputs/Calendar';
import useSearchModal from '@/hooks/useSearchModal';
import CountrySelect from '../inputs/CountrySelect';

interface SearchModalProps {}

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal: FC<SearchModalProps> = ({}) => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [location, setLocation] = useState<Country>();

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    onNext,
    params,
    router,
    location,
    dateRange,
    roomCount,
    guestCount,
    searchModal,
    bathroomCount,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLable = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Header
        title='Where do you wana go?'
        subTitle='Find the perfect location'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as Country)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Header
          title='When do you plan to go ?'
          subTitle='Make sure everyone is free!'
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Header title='More information' subTitle='Find your perfect place' />
        <Counter
          title='Guests'
          subTitle='How many guests are coming?'
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subTitle='How many rooms do you need?'
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title='Bathrooms'
          subTitle='How many bathrooms do you need?'
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title='Filters'
      body={bodyContent}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      secondaryActionLabel={secondaryActionLable}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;
