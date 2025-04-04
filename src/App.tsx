
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";
import Marketplace from "./pages/Marketplace";
import Transactions from "./pages/Transactions";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Layout
import MainLayout from "./layouts/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="/operator" element={<OperatorDashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
