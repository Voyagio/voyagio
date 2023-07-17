import { useMainController } from './useMainController';

export function Main() {
  useMainController('/search');

  return <p>Redirecting...</p>;
}
