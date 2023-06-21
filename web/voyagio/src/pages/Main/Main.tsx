import { useMainController } from "./useMainController.ts";
import { Heading } from "./Main.styles.ts";

export const Main = () => {
  const { count, setCount } = useMainController();

  return (
    <>
      <div></div>
      <Heading size={72}>Vite + React</Heading>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};
