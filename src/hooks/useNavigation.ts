import { useNavigate } from "react-router-dom";

// Define an interface for the navigation functions
interface Navigation {
  navigateTo(path: string): void;
  replace(path: string): void;
  push<T>(path: string, state: T): void;
  back(): void;
}

// Create the facade using a custom hook
function useNavigation(): Navigation {
  const navigate = useNavigate();

  const navigateTo = (path: string) => navigate(path);
  const replace = (path: string) => navigate(path, { replace: true });
  const push = <T = unknown>(path: string, state?: T) =>
    navigate(path, { state });
  const back = () => navigate(-1); // go back in history

  return { navigateTo, replace, push, back };
}

export default useNavigation;
