'use client';

import { FC, useEffect } from 'react';
import EmptyState from '@/components/EmptyState';

interface ErrorProps {
  error: Error;
}

const Error: FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title='Ooops' subTitle='Something went wrong' />;
};

export default Error;
