Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid'
  }
});
