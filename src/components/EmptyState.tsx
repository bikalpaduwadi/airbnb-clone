'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import Header from './Header';
import Button from './Button';

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({
  showReset,
  title = 'No exact matches',
  subTitle = 'Try changing or removing some of your filters',
}) => {
  const router = useRouter();
  return (
    <div className={`h-[60vh] flex flex-col gap-2 justify-center items-center`}>
      <Header center title={title} subTitle={subTitle} />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='Remove all filters'
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
