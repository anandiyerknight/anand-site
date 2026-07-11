// jsdom lacks IntersectionObserver; framer-motion's whileInView needs it.
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(globalThis, "IntersectionObserver", { value: IO, writable: true });
