import { useState } from 'react';
import Counter from './features/counter/Counter';
import TodoList from './features/todos/TodoList';
import UserList from './features/users/UserList';
import PostList from './features/posts/PostList';
import BookmarkList from './features/bookmarks/BookmarkList';

type Tab = 'counter' | 'todos' | 'users' | 'posts' | 'bookmarks';

const tabs: { id: Tab; label: string; session: string }[] = [
  { id: 'counter', label: 'Counter', session: '2.2.1' },
  { id: 'todos', label: 'Todos', session: '2.2.1' },
  { id: 'users', label: 'Users', session: '2.2.2' },
  { id: 'posts', label: 'Posts', session: '2.2.2' },
  { id: 'bookmarks', label: 'Bookmarks', session: 'BT' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('counter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Redux Toolkit Learning App
          </h1>
          <p className="text-gray-500 mt-1">Module 2.2 - State Management</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
                <span className="ml-2 text-xs text-gray-400">({tab.session})</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'counter' && <Counter />}
        {activeTab === 'todos' && <TodoList />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'posts' && <PostList />}
        {activeTab === 'bookmarks' && <BookmarkList />}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm">
        Session 2.2.0 → 2.2.1 → 2.2.2 | Redux Toolkit + React + TypeScript
      </footer>
    </div>
  );
}

export default App;
