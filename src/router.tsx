// Stub router file required by the platform's TanStack Start wrapper.
// This project uses React Router DOM via src/App.tsx + src/main.tsx.
// The actual app is bootstrapped from src/main.tsx; this file exists only
// to satisfy the start-server-core module loader.
export function getRouter() {
  return {
    // Minimal shape — never actually invoked because the app renders via main.tsx
    routeTree: { children: [] },
    history: undefined,
  };
}

export default getRouter;
