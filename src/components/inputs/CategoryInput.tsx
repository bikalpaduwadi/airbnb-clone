import Category from '@/models/Category';
import { FC } from 'react';

interface CategoryInputProps {
  category: Category;
  isSelected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: FC<CategoryInputProps> = ({
  category,
  onClick,
  isSelected,
}) => {
  const { label, icon: Icon } = category;

  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        isSelected ? 'border-black' : 'border-neutral-200'
      }`}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  );
};

export default CategoryInput;
