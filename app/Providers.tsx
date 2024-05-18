'use client';

import { ClassProvider } from './context/class';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ClassProvider>{children}</ClassProvider>;
}
