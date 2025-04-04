
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";
import Marketplace from "./pages/Marketplace";
import Transactions from "./pages/Transactions";
import Payment from "./pages/Payment";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Layout
import MainLayout from "./layouts/MainLayout";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes accessible to all authenticated users */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/about" element={<About />} />
                <Route path="/payment" element={<Payment />} />
              </Route>
            </Route>
            
            {/* Farmer-specific routes */}
            <Route element={<ProtectedRoute allowedRoles={['farmer']} />}>
              <Route element={<MainLayout />}>
                <Route path="/farmer" element={<FarmerDashboard />} />
              </Route>
            </Route>
            
            {/* Operator-specific routes */}
            <Route element={<ProtectedRoute allowedRoles={['operator']} />}>
              <Route element={<MainLayout />}>
                <Route path="/operator" element={<OperatorDashboard />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
