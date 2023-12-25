import Router from "./routes";
import ThemeProvider from "./theme";
import SnackBar from "./components/SnackBar";
import { ErrorBoundary } from "react-error-boundary";

const FallbackComponent = ({ error, resetErrorBoundary }) => (
  <div>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <SnackBar />

      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Router />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
