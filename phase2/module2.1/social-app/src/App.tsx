import { useState } from 'react'

// Exercises - Uncomment từng cái khi làm
import { Exercise01Demo } from './exercises/01-BasicTabs'
// import { Exercise02Demo } from './exercises/02-TabsStyling'
// import { Exercise03Demo } from './exercises/03-TabsA11y'
// import { Exercise04Demo } from './exercises/04-ProfileTabs'

// Solutions - Uncomment để xem solution
// import { Solution01Demo } from './solutions/01-BasicTabs.solution'
// import { Solution02Demo } from './solutions/02-TabsStyling.solution'
// import { Solution03Demo } from './solutions/03-TabsA11y.solution'
// import { Solution04Demo } from './solutions/04-ProfileTabs.solution'

type ViewType = 'exercise' | 'solution'
type ExerciseNumber = 1 | 2 | 3 | 4

function App() {
  const [currentExercise, setCurrentExercise] = useState<ExerciseNumber>(1)
  const [viewType, setViewType] = useState<ViewType>('exercise')

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Session 2.1.1 - Compound Components
          </h1>
          <p className="text-gray-600">
            Đọc README.md và THEORY.md trước khi bắt đầu!
          </p>
        </div>

        {/* Exercise Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentExercise(num as ExerciseNumber)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentExercise === num
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Exercise {num}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewType('exercise')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewType === 'exercise'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📝 Exercise (Bài tập)
            </button>
            <button
              onClick={() => setViewType('solution')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewType === 'solution'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✅ Solution (Đáp án)
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {viewType === 'exercise' ? (
            <>
              {currentExercise === 1 && <Exercise01Demo />}
              {currentExercise === 2 && (
                <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">
                    Uncomment <code>Exercise02Demo</code> import trong App.tsx
                  </p>
                </div>
              )}
              {currentExercise === 3 && (
                <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">
                    Uncomment <code>Exercise03Demo</code> import trong App.tsx
                  </p>
                </div>
              )}
              {currentExercise === 4 && (
                <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">
                    Uncomment <code>Exercise04Demo</code> import trong App.tsx
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-purple-800">
                Uncomment <code>Solution0{currentExercise}Demo</code> import trong App.tsx để xem solution.
              </p>
              <p className="text-sm text-purple-600 mt-2">
                Tip: Cố gắng tự làm exercise trước khi xem solution!
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">📚 Hướng dẫn:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Đọc <code>src/THEORY.md</code> để hiểu lý thuyết</li>
            <li>Mở file <code>src/exercises/01-BasicTabs.tsx</code></li>
            <li>Làm theo các TODO trong file</li>
            <li>Uncomment demo component và test</li>
            <li>So sánh với solution khi hoàn thành</li>
          </ol>
        </div>

        {/* File Structure */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">📁 Files:</h3>
          <pre className="text-xs text-gray-600 font-mono">
{`src/
├── README.md          ← Đọc flow học tập
├── THEORY.md          ← Đọc lý thuyết
├── exercises/         ← Làm bài tập ở đây
│   ├── 01-BasicTabs.tsx
│   ├── 02-TabsStyling.tsx
│   ├── 03-TabsA11y.tsx
│   └── 04-ProfileTabs.tsx
└── solutions/         ← Xem đáp án ở đây
    ├── 01-BasicTabs.solution.tsx
    ├── 02-TabsStyling.solution.tsx
    ├── 03-TabsA11y.solution.tsx
    └── 04-ProfileTabs.solution.tsx`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App
