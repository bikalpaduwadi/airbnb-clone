'use client';

import { FC } from 'react';

import Container from '../Container';
import CategoryBox from '../CategoryBox';
import CATEGORIES from '@/constants/category';
import { usePathname, useSearchParams } from 'next/navigation';

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const categoryQuery = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {CATEGORIES.map((category) => (
          <CategoryBox
            key={category.label}
            isSelected={category.label === categoryQuery}
            category={category}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
