
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowRight, ArrowUpRight, TrendingUp, Leaf, Factory, Users, Globe } from 'lucide-react';

// Mock data
const transactionData = [
  { month: 'Jan', bioWaste: 400, energy: 240, revenue: 2400 },
  { month: 'Feb', bioWaste: 300, energy: 139, revenue: 1398 },
  { month: 'Mar', bioWaste: 200, energy: 980, revenue: 3800 },
  { month: 'Apr', bioWaste: 278, energy: 390, revenue: 3908 },
  { month: 'May', bioWaste: 189, energy: 480, revenue: 4800 },
  { month: 'Jun', bioWaste: 239, energy: 380, revenue: 3800 },
];

const wasteTypeData = [
  { name: 'Rice Husks', value: 35 },
  { name: 'Wheat Straw', value: 25 },
  { name: 'Corn Stalks', value: 20 },
  { name: 'Sugarcane Bagasse', value: 15 },
  { name: 'Other', value: 5 },
];

const recentTransactions = [
  { id: '0x8f23...9a47', type: 'Bio-Waste Deposit', from: 'Farmer_123', to: 'Operator_456', amount: '500kg Rice Husks', value: '₹2,500', status: 'Completed' },
  { id: '0x7d31...6c28', type: 'Energy Conversion', from: 'Operator_456', to: 'Grid_789', amount: '300kWh', value: '₹4,200', status: 'Pending' },
  { id: '0x3e12...2d91', type: 'Export Sale', from: 'Operator_456', to: 'Global_Buyer', amount: '200kg Rice Husks', value: '$400', status: 'Completed' },
];

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Leaf className="mr-2 h-4 w-4" />
            Add New Waste
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bio-Waste</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845 kg</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Generated</CardTitle>
            <Factory className="h-4 w-4 text-earth-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 kWh</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">+10.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <Users className="h-4 w-4 text-water-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">+3</span> new this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Exports</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">785 kg</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">+18.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Overview</CardTitle>
              <Tabs defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>Bio-waste collected and energy generated</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={transactionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorBioWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F7942" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F7942" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B4513" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B4513" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="bioWaste" name="Bio-Waste (kg)" stroke="#4F7942" fillOpacity={1} fill="url(#colorBioWaste)" />
                <Area type="monotone" dataKey="energy" name="Energy (kWh)" stroke="#8B4513" fillOpacity={1} fill="url(#colorEnergy)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Bio-Waste by Type</CardTitle>
            <CardDescription>Distribution of collected bio-waste</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteTypeData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Percentage %" fill="#4F7942" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest blockchain-verified transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground">
                <div>Transaction</div>
                <div>From</div>
                <div>To</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="grid grid-cols-5 items-center text-sm">
                  <div className="font-medium">{transaction.type}</div>
                  <div className="truncate">{transaction.from}</div>
                  <div className="truncate">{transaction.to}</div>
                  <div>{transaction.amount}</div>
                  <div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link to="/transactions" className="text-sm text-green-600 hover:underline font-medium inline-flex items-center">
                View all transactions <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Button variant="outline" asChild className="justify-start h-auto py-3">
                  <Link to="/farmer" className="flex items-start">
                    <Leaf className="mr-3 h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">Register Bio-Waste</div>
                      <div className="text-xs text-muted-foreground">Add new agricultural waste</div>
                    </div>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="justify-start h-auto py-3">
                  <Link to="/operator" className="flex items-start">
                    <Factory className="mr-3 h-5 w-5 text-earth-500" />
                    <div className="text-left">
                      <div className="font-medium">Convert to Energy</div>
                      <div className="text-xs text-muted-foreground">Process waste into bioenergy</div>
                    </div>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="justify-start h-auto py-3">
                  <Link to="/marketplace" className="flex items-start">
                    <Globe className="mr-3 h-5 w-5 text-water-500" />
                    <div className="text-left">
                      <div className="font-medium">Export to Global Markets</div>
                      <div className="text-xs text-muted-foreground">Connect with international buyers</div>
                    </div>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="justify-start h-auto py-3">
                  <Link to="/transactions" className="flex items-start">
                    <TrendingUp className="mr-3 h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">View Analytics</div>
                      <div className="text-xs text-muted-foreground">Track performance metrics</div>
                    </div>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
