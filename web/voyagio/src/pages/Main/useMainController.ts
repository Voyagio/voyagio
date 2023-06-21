import { useState } from "react";

export const useMainController = () => {
  const [count, setCount] = useState(0);

  return { count, setCount } as const;
};
