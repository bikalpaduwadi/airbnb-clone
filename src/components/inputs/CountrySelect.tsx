'use client';

import { FC } from 'react';
import Select from 'react-select';

import Country from '@/models/Country';
import useCountries from '@/hooks/useCountries';

interface CountrySelectProps {
  value?: Country;
  onChange: (value: Country) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        isClearable
        value={value}
        options={getAll()}
        placeholder='Anywhere'
        onChange={(value) => onChange(value as Country)}
        formatOptionLabel={(option) => (
          <div className='flex flex-row items-center gap-3'>
            <div>{option.flag}</div>
            <div>
              {option.label}
              <span className='text-neutral-800 ml-1'>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
