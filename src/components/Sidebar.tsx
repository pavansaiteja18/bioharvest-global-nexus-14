
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { 
  Home,
  User,
  Factory,
  Globe,
  FileText,
  BarChart2,
  Info,
  Settings,
  HelpCircle,
  Leaf,
  Wheat,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const userRole = user?.role;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarComponent>
      <SidebarHeader className="flex items-center justify-center py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-green-500 p-2 rounded-lg">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Bio<span className="text-earth-100">Harvest</span></span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Show common sections for all authenticated users */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard')}>
                  <Link to="/dashboard">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/transactions')}>
                  <Link to="/transactions">
                    <FileText className="h-5 w-5" />
                    <span>Transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/marketplace')}>
                  <Link to="/marketplace">
                    <Globe className="h-5 w-5" />
                    <span>Global Market</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role-specific menu items */}
        <SidebarGroup>
          <SidebarGroupLabel>User Area</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Only show Farmer option if user is a farmer */}
              {(userRole === 'farmer' || userRole === null) && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive('/farmer')}>
                    <Link to="/farmer">
                      <Wheat className="h-5 w-5" />
                      <span>Farmer Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              
              {/* Only show Operator option if user is an operator */}
              {(userRole === 'operator' || userRole === null) && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive('/operator')}>
                    <Link to="/operator">
                      <Factory className="h-5 w-5" />
                      <span>Operator Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Info</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/about')}>
                  <Link to="/about">
                    <Info className="h-5 w-5" />
                    <span>About</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-3 py-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </Button>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
