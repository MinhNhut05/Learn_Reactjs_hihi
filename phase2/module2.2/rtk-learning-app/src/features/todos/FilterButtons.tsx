// ============================================
// SESSION 2.2.1 - FilterButtons Component
// ============================================

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectFilter, setFilter } from './filterSlice';
import type { FilterValue } from './filterSlice';

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterButtons() {
  const currentFilter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => dispatch(setFilter(filter.value))}
          className={`px-4 py-2 rounded-lg font-medium transition-colors
            ${
              currentFilter === filter.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
