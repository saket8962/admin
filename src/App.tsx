import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

// Create a client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Avoid refetching when shifting browser tabs
      retry: 1,                    // Retry failed requests once
      staleTime: 2 * 60 * 1000,     // Cache data is considered fresh for 2 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster position="top-right" richColors closeButton />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
