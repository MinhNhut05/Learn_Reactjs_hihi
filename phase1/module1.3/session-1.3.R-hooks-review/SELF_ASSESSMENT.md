# 📊 Self-Assessment - Session 1.3.R

## Part 1: Hooks Mastery Rating

Rate yourself **1-5** for each skill:

- **1** = Không hiểu
- **2** = Hiểu lý thuyết, chưa code được
- **3** = Code được với reference
- **4** = Code được tự tin
- **5** = Có thể dạy người khác

| Skill                                              | 1   | 2   | 3   | 4   | 5   | Notes |
| -------------------------------------------------- | --- | --- | --- | --- | --- | ----- |
| **useState** - lazy init, functional update        |     |     |     |     |     |       |
| **useEffect** - deps, cleanup, AbortController     |     |     |     |     |     |       |
| **useRef** - DOM ref, mutable values               |     |     |     |     |     |       |
| **useCallback** - memoize, React.memo combo        |     |     |     |     |     |       |
| **useMemo** - expensive calc, referential equality |     |     |     |     |     |       |
| **useContext** - create, provide, consume          |     |     |     |     |     |       |
| **useReducer** - reducer, dispatch, actions        |     |     |     |     |     |       |
| **Custom Hooks** - naming, compose, return         |     |     |     |     |     |       |

**Your Total Score: \_\_\_ / 40**

### Scoring Guide:

- **35-40**: 🎉 Ready for Phase 2!
- **28-34**: 👍 Good, minor review needed
- **20-27**: 📚 Need more practice
- **< 20**: 🔄 Review Module 1.3 again

---

## Part 2: Mini Project Checklist

### Features

- [ ] Add tasks works
- [ ] Toggle completion works
- [ ] Delete tasks works
- [ ] Filter All/Active/Completed works
- [ ] Search with debounce works
- [ ] Theme toggle works
- [ ] Persist to localStorage works
- [ ] Stats display correctly

### Code Quality

- [ ] TypeScript types correct (no `any`)
- [ ] No ESLint warnings
- [ ] Clean folder structure
- [ ] Proper hook usage (no violations)

### Performance

- [ ] TaskItem uses React.memo
- [ ] Handlers use useCallback
- [ ] Filter uses useMemo
- [ ] No unnecessary re-renders (check DevTools)

---

## Part 3: Weak Areas Action Plan

Nếu score thấp ở hook nào, quay lại session tương ứng:

| Weak Area    | Review Session | Key Files                             |
| ------------ | -------------- | ------------------------------------- |
| useState     | 1.3.1          | LazyInit, FunctionalUpdate            |
| useEffect    | 1.3.2          | EffectBasics, Cleanup, DataFetching   |
| useRef       | 1.3.3          | UseRefBasics, UseRefAdvanced          |
| useCallback  | 1.3.3          | UseCallback                           |
| useMemo      | 1.3.5          | UseMemoBasics                         |
| useContext   | 1.3.4          | UseContextBasics                      |
| useReducer   | 1.3.4          | UseReducerBasics                      |
| Custom Hooks | 1.3.5          | CustomHookBasics, AdvancedCustomHooks |

---

## Part 4: Timed Challenge Results

### Challenge 1: Hook Identification (15 phút)

- Completed in: \_\_\_ minutes
- Score: \_\_\_ / 5 correct

### Challenge 2: Debug Hooks (20 phút)

- Completed in: \_\_\_ minutes
- Score: \_\_\_ / 5 bugs found

### Challenge 3: Build useAsync Hook (25 phút)

- Completed in: \_\_\_ minutes
- All features working: [ ] Yes [ ] No

---

## Part 5: Phase 1 Completion Status

### Module 1.1: TypeScript cho React

- [ ] Session 1.1.1: TypeScript Basics ✅
- [ ] Session 1.1.2: TypeScript Intermediate ✅
- [ ] Session 1.1.3: TypeScript Advanced ✅
- [ ] Session 1.1.4: TypeScript + React ✅

### Module 1.2: React Mental Model

- [ ] Session 1.2.1: Component Thinking ✅
- [ ] Session 1.2.2: Props & State ✅
- [ ] Session 1.2.3: Render Cycle ✅

### Module 1.3: Hooks Deep Dive

- [ ] Session 1.3.1: useState Advanced ✅
- [ ] Session 1.3.2: useEffect Mastery ✅
- [ ] Session 1.3.3: useRef & useCallback ✅
- [ ] Session 1.3.4: useContext & useReducer ✅
- [ ] Session 1.3.5: useMemo & Custom Hooks ✅
- [ ] Session 1.3.R: Review & Mini Project ✅

---

## Ready for Phase 1.5?

Answer these questions honestly:

1. **Can you explain what each hook does without looking at docs?**

   - [ ] Yes [ ] Mostly [ ] Need review

2. **Can you build a component using multiple hooks together?**

   - [ ] Yes [ ] With some help [ ] Struggle

3. **Do you understand when to use which hook?**

   - [ ] Yes [ ] Sometimes confused [ ] Often confused

4. **Can you create custom hooks that compose other hooks?**
   - [ ] Yes [ ] With reference [ ] Not confident

**If all "Yes" → Ready for Tailwind CSS Mastery! 🎉**
