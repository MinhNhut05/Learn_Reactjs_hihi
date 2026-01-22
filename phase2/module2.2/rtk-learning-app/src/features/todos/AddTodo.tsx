// ============================================
// SESSION 2.2.1 - AddTodo Component
// ============================================

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTodo } from './todosSlice';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text.trim()));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   text-gray-800 placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold
                   hover:bg-indigo-700 transition-colors disabled:opacity-50"
        disabled={!text.trim()}
      >
        Add
      </button>
    </form>
  );
}
