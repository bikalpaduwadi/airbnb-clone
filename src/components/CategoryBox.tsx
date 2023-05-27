'use client';

import qs from 'query-string';
import { FC, useCallback } from 'react';

import Category from '@/models/category';
import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryBoxProps {
  category: Category;
  isSelected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({ category, isSelected }) => {
  const { icon: Icon, label, description } = category;

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        isSelected
          ? 'border-b-neutral-800 text-neutral-800'
          : 'border-transparent text-neutral-500'
      }`}
    >
      <Icon size={26} />
      <div className='font-medium text-sm'>{label}</div>
    </div>
  );
};

export default CategoryBox;
