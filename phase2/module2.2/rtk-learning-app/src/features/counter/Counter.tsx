// ============================================
// SESSION 2.2.1 - Counter Component
// ============================================

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  selectCount,
} from "./counterSlice";

export default function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("5");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Counter App
      </h2>

      {/* Count Display */}
      <div className="text-6xl font-bold text-center text-indigo-600 mb-8">
        {count}
      </div>

      {/* Basic Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => dispatch(decrement())}
          className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold
                     hover:bg-red-600 transition-colors text-xl"
        >
          −
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold
                     hover:bg-green-600 transition-colors text-xl"
        >
          +
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(7))}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold
                     hover:bg-blue-600 transition-colors"
        >
          +7
        </button>
      </div>

      {/* Custom Amount */}
      <div className="flex gap-3 mb-6">
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Amount"
        />
        <button
          onClick={() => dispatch(incrementByAmount(incrementValue))}
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg font-semibold
                     hover:bg-indigo-600 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => dispatch(reset())}
        className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold
                   hover:bg-gray-300 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
