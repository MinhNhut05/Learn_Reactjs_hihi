# SESSION START FORM - Session 2.2.2

---

## SESSION INFO

**Session ID:** 2.2.2
**Session Title:** RTK Async & Patterns
**Module:** 2.2 - Redux Toolkit
**Phase:** Phase 2 - State Management & Data Fetching
**Roadmap Version:** V2.1
**Duration:** 2-3 hours

---

## SESSION CONTEXT

**Vị trí trong Roadmap:**
- **Phase 2:** State Management & Data Fetching (Session 5/12)
- **Previous Session:** 2.2.1 - Redux Toolkit Basics
- **Next Session:** 2.3.1 - Zustand Basics

**Prerequisites Completed:**
- Session 2.2.1 - Redux Toolkit Basics
- Hiểu createSlice, configureStore
- Hiểu useSelector, useDispatch
- Đã build Counter và Todo App với RTK

**Why This Session Important:**
- **Real-world Apps** - Hầu hết apps đều cần fetch data từ API
- **Async Handling** - Hiểu cách RTK xử lý async operations
- **Loading States** - UX tốt cần handle loading, error, success
- **Patterns** - createAsyncThunk là pattern chuẩn trong RTK

---

## LEARNING OBJECTIVES

Sau session này, tôi sẽ:

1. **Hiểu Thunk concept** - Function trả về function
2. **Sử dụng createAsyncThunk** để fetch data
3. **Handle loading states** - pending, fulfilled, rejected
4. **Sử dụng extraReducers** với builder pattern
5. **Implement error handling** với proper UX
6. **Hiểu RTK Query basics** (giới thiệu)
7. **Build Users List** với async fetching
8. **Thêm Posts feature** vào app (async CRUD)

---

## PROJECT SETUP

**Project:** RTK Learning App (tiếp tục)
**Location:** `phase2/module2.2/rtk-learning-app/`
**API Source:** JSONPlaceholder (https://jsonplaceholder.typicode.com)

**Folder Structure sau session này:**
```
rtk-learning-app/
├── src/
│   ├── app/
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── features/
│   │   ├── counter/
│   │   │   └── ...
│   │   ├── todos/
│   │   │   └── ...
│   │   ├── users/                    # NEW
│   │   │   ├── usersSlice.ts         # Async slice
│   │   │   ├── UserList.tsx
│   │   │   ├── UserCard.tsx
│   │   │   └── UserSkeleton.tsx      # Loading skeleton
│   │   └── posts/                    # NEW
│   │       ├── postsSlice.ts         # Async CRUD
│   │       ├── PostList.tsx
│   │       ├── PostCard.tsx
│   │       ├── PostForm.tsx
│   │       └── PostSkeleton.tsx
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Skeleton.tsx
│   │       └── ErrorMessage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── api/
│   │   └── config.ts                 # API base URL
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

---

## KEY CONCEPTS TO COVER

### 1. Thunk là gì?

```typescript
// Normal action creator - trả về object
const increment = () => ({ type: 'INCREMENT' });

// Thunk action creator - trả về FUNCTION
const incrementAsync = () => {
  return async (dispatch, getState) => {
    await delay(1000);
    dispatch(increment());
  };
};

// Thunk = function trả về function
// Middleware "thunk" sẽ catch và execute function này
```

**Tại sao cần Thunk?**
- Redux reducers phải là **pure functions** - không side effects
- Async operations (API calls) là side effects
- Thunk cho phép dispatch actions trong async flow

---

### 2. createAsyncThunk - Modern Async Handling

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Định nghĩa async thunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',  // Action type prefix
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();  // Payload cho fulfilled action
    } catch (error) {
      return rejectWithValue(error.message);  // Payload cho rejected action
    }
  }
);

// createAsyncThunk tự động tạo 3 action types:
// - users/fetchUsers/pending   → khi bắt đầu
// - users/fetchUsers/fulfilled → khi thành công
// - users/fetchUsers/rejected  → khi lỗi
```

**Với parameters:**
```typescript
// Thunk với argument
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.json();
  }
);

// Usage
dispatch(fetchUserById('123'));
```

---

### 3. extraReducers - Handle Async Actions

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface UsersState {
  entities: User[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  entities: [],
  loading: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Sync reducers ở đây (nếu có)
  },
  // extraReducers cho async actions
  extraReducers: (builder) => {
    builder
      // Pending - bắt đầu fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      // Fulfilled - thành công
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.entities = action.payload;
      })
      // Rejected - lỗi
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string || action.error.message || 'Unknown error';
      });
  },
});
```

**Builder Pattern:**
- `addCase(actionCreator, reducer)` - Handle specific action
- `addMatcher(matcher, reducer)` - Handle matching actions
- `addDefaultCase(reducer)` - Handle unmatched actions

---

### 4. Loading States Pattern

```typescript
// State types cho loading
type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';

// Trong component
function UserList() {
  const { entities, loading, error } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchUsers());
    }
  }, [loading, dispatch]);

  // UI based on loading state
  if (loading === 'pending') {
    return <UserListSkeleton />;
  }

  if (loading === 'failed') {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchUsers())}
      />
    );
  }

  if (entities.length === 0) {
    return <EmptyState message="No users found" />;
  }

  return (
    <div className="grid gap-4">
      {entities.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

---

### 5. Thunk với Parameters và Options

```typescript
// Thunk với nhiều options
export const fetchUserPosts = createAsyncThunk(
  'posts/fetchByUser',
  async (userId: number, { getState, dispatch, rejectWithValue, signal }) => {
    // getState() - access toàn bộ Redux state
    const state = getState() as RootState;
    const token = state.auth.token;

    // signal - AbortController signal cho cancellation
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal, // Cho phép cancel request
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      return response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        return rejectWithValue('Request cancelled');
      }
      return rejectWithValue(error.message);
    }
  },
  {
    // Condition - chỉ fetch nếu chưa có data
    condition: (userId, { getState }) => {
      const state = getState() as RootState;
      const posts = state.posts.byUserId[userId];
      if (posts?.loading === 'pending') {
        return false; // Không fetch nếu đang pending
      }
      return true;
    },
  }
);
```

---

### 6. unwrap() - Handle Promise Result

```typescript
function AddPostForm() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PostFormData) => {
    try {
      // unwrap() throws nếu rejected, returns payload nếu fulfilled
      const result = await dispatch(createPost(data)).unwrap();
      console.log('Post created:', result);
      // Navigate, show success toast, etc.
    } catch (err) {
      // Handle error locally
      setError(err as string);
    }
  };

  // ...
}
```

---

### 7. CRUD với createAsyncThunk

```typescript
// postsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostsState {
  items: Post[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  creating: boolean;
  deleting: number | null; // ID của post đang delete
}

// READ - Fetch all posts
export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await fetch(API_URL);
  return response.json() as Promise<Post[]>;
});

// CREATE - Add new post
export const createPost = createAsyncThunk(
  'posts/create',
  async (post: Omit<Post, 'id'>) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return response.json() as Promise<Post>;
  }
);

// UPDATE - Edit post
export const updatePost = createAsyncThunk(
  'posts/update',
  async (post: Post) => {
    const response = await fetch(`${API_URL}/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return response.json() as Promise<Post>;
  }
);

// DELETE - Remove post
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId: number) => {
    await fetch(`${API_URL}/${postId}`, { method: 'DELETE' });
    return postId; // Return ID để remove from state
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: 'idle',
    error: null,
    creating: false,
    deleting: null,
  } as PostsState,
  reducers: {
    // Optimistic update cho like (sync)
    likePost: (state, action: PayloadAction<number>) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        // Thêm logic like ở đây
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })

      // Create post
      .addCase(createPost.pending, (state) => {
        state.creating = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload); // Add to beginning
      })
      .addCase(createPost.rejected, (state) => {
        state.creating = false;
      })

      // Delete post
      .addCase(deletePost.pending, (state, action) => {
        state.deleting = action.meta.arg; // ID from argument
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleting = null;
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state) => {
        state.deleting = null;
      });
  },
});

export const { likePost } = postsSlice.actions;
export default postsSlice.reducer;
```

---

### 8. RTK Query - Introduction (Bonus)

```typescript
// RTK Query = Powerful data fetching solution built into RTK
// Sẽ học kỹ hơn ở React Query section, nhưng intro ở đây

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define API
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

// Auto-generated hooks!
export const { useGetPostsQuery, useAddPostMutation } = postsApi;

// Usage in component
function PostList() {
  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [addPost, { isLoading: isCreating }] = useAddPostMutation();

  // ...
}
```

**RTK Query vs createAsyncThunk:**
| RTK Query | createAsyncThunk |
|-----------|------------------|
| Automatic caching | Manual caching |
| Auto refetching | Manual refetch |
| Less boilerplate | More control |
| Built-in hooks | Custom hooks |
| Cache invalidation | Manual state update |

> **Note:** Chúng ta sẽ học React Query (TanStack Query) ở module 2.4, cũng tương tự RTK Query nhưng framework-agnostic.

---

## EXERCISES

### Mini Exercise: Fetch Users (25 phút)

**Mục tiêu:** Fetch và hiển thị danh sách users từ JSONPlaceholder

**API Endpoint:**
```
GET https://jsonplaceholder.typicode.com/users
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": { "city": "Gwenborough" },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": { "name": "Romaguera-Crona" }
  },
  // ... 9 more users
]
```

**UI Preview:**
```
┌─────────────────────────────────────────────────┐
│  👥 Users                         [ Refresh ]   │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐   │
│  │  Leanne Graham                          │   │
│  │  @Bret                                  │   │
│  │  📧 Sincere@april.biz                   │   │
│  │  🏢 Romaguera-Crona                     │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  Ervin Howell                           │   │
│  │  @Antonette                             │   │
│  │  ...                                    │   │
│  └─────────────────────────────────────────┘   │
│                    ...                         │
└─────────────────────────────────────────────────┘
```

**Checklist:**

**1. usersSlice.ts:**
- [ ] User interface với id, name, username, email, company
- [ ] UsersState với entities, loading, error
- [ ] fetchUsers async thunk
- [ ] extraReducers handle pending, fulfilled, rejected

**2. UserList.tsx:**
- [ ] useEffect fetch on mount
- [ ] Conditional rendering based on loading state
- [ ] Refresh button

**3. UserCard.tsx:**
- [ ] Display user info với styling
- [ ] Avatar placeholder (initial letter)

**4. UserSkeleton.tsx:**
- [ ] Loading skeleton animation

**5. ErrorMessage.tsx:**
- [ ] Error display với retry button

**Code Template:**

```typescript
// usersSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}

interface UsersState {
  entities: User[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  entities: [],
  loading: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json() as Promise<User[]>;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        // TODO: Set loading state
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // TODO: Set success state and data
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        // TODO: Set error state
      });
  },
});

export default usersSlice.reducer;
```

```typescript
// UserList.tsx
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUsers } from './usersSlice';
import UserCard from './UserCard';
import UserSkeleton from './UserSkeleton';
import ErrorMessage from '../../components/ui/ErrorMessage';

export default function UserList() {
  const dispatch = useAppDispatch();
  const { entities, loading, error } = useAppSelector(state => state.users);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchUsers());
    }
  }, [loading, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  // TODO: Implement conditional rendering

  return (
    <div className="space-y-4">
      {/* TODO: Header with title and refresh button */}
      {/* TODO: User cards or loading skeleton */}
    </div>
  );
}
```

---

### Real Exercise: Posts CRUD (45 phút)

**Mục tiêu:** Build Posts feature với full CRUD operations

**API Endpoints:**
```
GET    /posts           - Fetch all posts
GET    /posts/:id       - Fetch single post
POST   /posts           - Create new post
PUT    /posts/:id       - Update post
DELETE /posts/:id       - Delete post
```

**Features:**
```
1. Fetch và display posts list
2. Create new post với form
3. Delete post với confirmation
4. Loading states cho mỗi operation
5. Error handling với retry
6. Optimistic UI cho better UX (bonus)
```

**UI Preview:**
```
┌─────────────────────────────────────────────────────────────┐
│  📝 Posts                                                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Title: [________________________]                    │   │
│  │ Body:  [________________________]                    │   │
│  │        [________________________]                    │   │
│  │                                      [ Create Post ] │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  sunt aut facere repellat...                    [🗑] │   │
│  │  ───────────────────────────────────────────────    │   │
│  │  quia et suscipit suscipit recusandae...            │   │
│  │  👤 User 1                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  qui est esse                                   [🗑] │   │
│  │  ───────────────────────────────────────────────    │   │
│  │  est rerum tempore vitae...                         │   │
│  │  👤 User 1                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ...                                │
│                    [ Load More ]                           │
└─────────────────────────────────────────────────────────────┘
```

**Checklist:**

**1. postsSlice.ts:**
- [ ] Post interface
- [ ] PostsState với items, loading, error, creating, deleting
- [ ] fetchPosts thunk
- [ ] createPost thunk
- [ ] deletePost thunk
- [ ] extraReducers cho tất cả async actions

**2. PostList.tsx:**
- [ ] Fetch posts on mount
- [ ] Display loading skeleton
- [ ] Error với retry
- [ ] Map posts to PostCard

**3. PostCard.tsx:**
- [ ] Display title, body (truncated), userId
- [ ] Delete button với loading state
- [ ] Confirm before delete (optional)

**4. PostForm.tsx:**
- [ ] Controlled form với title, body
- [ ] Submit handler với createPost
- [ ] Loading state on submit button
- [ ] Clear form after success

**5. UI Polish:**
- [ ] Skeleton loading
- [ ] Delete button loading spinner
- [ ] Create button loading state
- [ ] Toast notification (optional)

**State Shape:**
```typescript
interface PostsState {
  items: Post[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  creating: boolean;
  deleting: number | null; // post id being deleted
}
```

**Code Template:**

```typescript
// postsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostsState {
  items: Post[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  creating: boolean;
  deleting: number | null;
}

const initialState: PostsState = {
  items: [],
  loading: 'idle',
  error: null,
  creating: false,
  deleting: null,
};

// Fetch all posts (limit to 10 for demo)
export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await fetch(`${API_URL}?_limit=10`);
  return response.json() as Promise<Post[]>;
});

// Create new post
export const createPost = createAsyncThunk(
  'posts/create',
  async (post: { title: string; body: string; userId: number }) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return response.json() as Promise<Post>;
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId: number) => {
    await fetch(`${API_URL}/${postId}`, { method: 'DELETE' });
    return postId;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPosts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })

      // Create
      .addCase(createPost.pending, (state) => {
        state.creating = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.creating = false;
      })

      // Delete
      .addCase(deletePost.pending, (state, action) => {
        state.deleting = action.meta.arg;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleting = null;
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state) => {
        state.deleting = null;
      });
  },
});

export default postsSlice.reducer;
```

```typescript
// PostForm.tsx
import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createPost } from './postsSlice';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useAppDispatch();
  const creating = useAppSelector(state => state.posts.creating);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    try {
      await dispatch(createPost({
        title,
        body,
        userId: 1, // Hardcoded for demo
      })).unwrap();

      // Clear form on success
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      {/* TODO: Title input */}
      {/* TODO: Body textarea */}
      {/* TODO: Submit button with loading state */}
    </form>
  );
}
```

---

## INTERVIEW Q&A

### Q1: createAsyncThunk giải quyết vấn đề gì?

**Expected Answer:**
> createAsyncThunk giúp:
> - Tự động tạo 3 action types (pending, fulfilled, rejected)
> - Handle async flow trong Redux
> - Integrate với TypeScript
> - Cancel requests với AbortController
> - Access store state và dispatch trong thunk

---

### Q2: Thunk là gì?

**Expected Answer:**
> Thunk là function trả về function. Trong Redux context:
> ```typescript
> // Normal action
> () => ({ type: 'INCREMENT' })
>
> // Thunk action
> () => async (dispatch, getState) => {
>   const data = await fetchData();
>   dispatch({ type: 'SET_DATA', payload: data });
> }
> ```
> Redux Thunk middleware sẽ catch function này và execute nó.

---

### Q3: pending, fulfilled, rejected states?

**Expected Answer:**
> Đây là 3 lifecycle states của async operation:
> - **pending**: Bắt đầu request, show loading
> - **fulfilled**: Request thành công, có data
> - **rejected**: Request thất bại, có error
>
> Tương ứng với Promise states: pending, resolved, rejected

---

### Q4: extraReducers vs reducers?

**Expected Answer:**
> | reducers | extraReducers |
> |----------|---------------|
> | Sync actions | Async actions từ createAsyncThunk |
> | Tự động tạo action creators | Respond to external actions |
> | Cho slice's own actions | Cho actions từ slice khác |

---

### Q5: unwrap() dùng khi nào?

**Expected Answer:**
> `unwrap()` dùng khi cần handle result của async thunk trong component:
> ```typescript
> try {
>   const result = await dispatch(createPost(data)).unwrap();
>   // Success - result là fulfilled payload
>   toast.success('Created!');
> } catch (err) {
>   // Error - err là rejected payload
>   toast.error(err);
> }
> ```
> Không dùng unwrap() thì dispatch luôn resolve (không throw).

---

### Q6: RTK Query vs createAsyncThunk?

**Expected Answer:**
> | RTK Query | createAsyncThunk |
> |-----------|------------------|
> | Automatic caching | Manual |
> | Auto refetch | Manual |
> | Generated hooks | Manual hooks |
> | Less boilerplate | More control |
> | Best for CRUD APIs | Best for complex logic |

---

### Q7: Khi nào dùng RTK vs Zustand?

**Expected Answer:**
> | Use RTK | Use Zustand |
> |---------|-------------|
> | Large team | Small team |
> | Need DevTools | Simpler debugging OK |
> | Complex async | Simple async |
> | Enterprise apps | Startup/MVPs |
> | Existing Redux codebase | New projects |

---

### Q8: Middleware trong Redux?

**Expected Answer:**
> Middleware là layer giữa dispatch và reducer:
> ```
> dispatch(action) → Middleware → Reducer
> ```
> Common middleware:
> - **thunk**: Handle async actions
> - **logger**: Log actions for debugging
> - **saga**: Complex async flows
> - **RTK includes thunk by default**

---

## SUCCESS CRITERIA

Session 2.2.2 hoàn thành khi:

- [ ] Hiểu Thunk concept
- [ ] Sử dụng được createAsyncThunk
- [ ] Handle được loading states (pending, fulfilled, rejected)
- [ ] Implement được error handling với retry
- [ ] Hoàn thành Mini Exercise - Users List
- [ ] Hoàn thành Real Exercise - Posts CRUD
- [ ] Posts có Create và Delete hoạt động
- [ ] Loading skeletons hiển thị đúng
- [ ] Code TypeScript không có errors
- [ ] Trả lời được 6/8 Knowledge Check

---

## COMMON PITFALLS

1. **Quên handle error trong thunk**
   ```typescript
   // ❌ Error không được catch
   async () => {
     const response = await fetch(url);
     return response.json();
   }

   // ✅ Proper error handling
   async (_, { rejectWithValue }) => {
     try {
       const response = await fetch(url);
       if (!response.ok) throw new Error('Failed');
       return response.json();
     } catch (error) {
       return rejectWithValue(error.message);
     }
   }
   ```

2. **Không update UI based on loading state**
   ```typescript
   // ❌ No loading feedback
   return <div>{posts.map(...)}</div>

   // ✅ Proper loading states
   if (loading === 'pending') return <Skeleton />
   if (loading === 'failed') return <Error onRetry={...} />
   return <div>{posts.map(...)}</div>
   ```

3. **Fetch trong mỗi render**
   ```typescript
   // ❌ Infinite loop
   useEffect(() => {
     dispatch(fetchPosts());
   }, []);

   // ✅ Check loading state
   useEffect(() => {
     if (loading === 'idle') {
       dispatch(fetchPosts());
     }
   }, [loading, dispatch]);
   ```

4. **Quên add reducer to store**
   ```typescript
   // ❌ Slice không hoạt động
   export const store = configureStore({
     reducer: {
       counter: counterReducer,
       // Quên thêm postsReducer
     },
   });
   ```

---

## DIFFICULTY & TIME ESTIMATE

**Độ khó:** Medium-Hard

**Thời gian dự kiến:**
- Theory & Concepts: 30 phút
- Mini Exercise (Users): 30 phút
- Real Exercise (Posts CRUD): 60 phút
- Knowledge Check: 20 phút

**Total:** ~2.5 hours

---

## READY TO START

**AI, please:**

1. **Continue from 2.2.1** rtk-learning-app project
2. **Guide Users Exercise** với createAsyncThunk
3. **Guide Posts CRUD** với full async handling
4. **Implement loading skeletons**
5. **Demo error handling** với retry
6. **Quiz Knowledge Check**

**Lưu ý quan trọng:**
- Focus vào **loading states** và UX
- **Error handling** với user feedback
- Sử dụng **JSONPlaceholder** cho real API calls
- **Tailwind** cho styling

---

**VERSION:** 1.0
**CREATED:** 2025-01-19
**FOR:** Session 2.2.2 - RTK Async & Patterns
**PROJECT:** RTK Learning App
**PREVIOUS SESSION:** 2.2.1 - RTK Basics
**NEXT SESSION:** 2.3.1 - Zustand Basics
