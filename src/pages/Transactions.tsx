
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ArrowUpDown,
  FileDown,
  FileUp,
  Download,
  MoreHorizontal,
  ExternalLink,
  Filter,
  Calendar,
  Search,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';

// Mock transaction data
const transactionData = [
  {
    id: "0x8F23...9A47",
    type: "Bio-Waste Deposit",
    from: "Farmer_123",
    to: "Operator_456",
    amount: "500kg Rice Husks",
    value: "₹2,500",
    timestamp: "2025-03-22 14:32:45",
    status: "Completed",
    category: "Deposit"
  },
  {
    id: "0x7D31...6C28",
    type: "Energy Conversion",
    from: "Operator_456",
    to: "Grid_789",
    amount: "300kWh",
    value: "₹4,200",
    timestamp: "2025-03-22 16:45:12",
    status: "Pending",
    category: "Conversion"
  },
  {
    id: "0x3E12...2D91",
    type: "Export Sale",
    from: "Operator_456",
    to: "Global_Buyer",
    amount: "200kg Rice Husks",
    value: "$400",
    timestamp: "2025-03-21 09:12:33",
    status: "Completed",
    category: "Export"
  },
  {
    id: "0x1A58...7F22",
    type: "Payment",
    from: "Global_Buyer",
    to: "Operator_456",
    amount: "-",
    value: "$400",
    timestamp: "2025-03-21 09:15:22",
    status: "Completed",
    category: "Payment"
  },
  {
    id: "0x9C43...1B38",
    type: "Bio-Waste Deposit",
    from: "Farmer_789",
    to: "Operator_456",
    amount: "320kg Wheat Straw",
    value: "₹1,920",
    timestamp: "2025-03-20 11:22:18",
    status: "Completed",
    category: "Deposit"
  },
  {
    id: "0x6B73...4D29",
    type: "Energy Conversion",
    from: "Operator_456",
    to: "Grid_789",
    amount: "210kWh",
    value: "₹2,940",
    timestamp: "2025-03-20 15:08:51",
    status: "Completed",
    category: "Conversion"
  },
  {
    id: "0x5E18...3F47",
    type: "Carbon Credit",
    from: "System",
    to: "Farmer_123",
    amount: "5 Credits",
    value: "₹2,000",
    timestamp: "2025-03-19 08:45:37",
    status: "Completed",
    category: "Carbon"
  },
  {
    id: "0x2A34...8C19",
    type: "Export Sale",
    from: "Operator_456",
    to: "Global_Buyer_2",
    amount: "450kg Corn Stalks",
    value: "$850",
    timestamp: "2025-03-18 14:22:09",
    status: "Pending",
    category: "Export"
  },
];

// Activity chart data
const chartData = [
  { date: '03/15', deposits: 8, conversions: 6, exports: 2, payments: 4 },
  { date: '03/16', deposits: 5, conversions: 4, exports: 1, payments: 3 },
  { date: '03/17', deposits: 7, conversions: 6, exports: 3, payments: 5 },
  { date: '03/18', deposits: 12, conversions: 9, exports: 4, payments: 7 },
  { date: '03/19', deposits: 10, conversions: 8, exports: 3, payments: 6 },
  { date: '03/20', deposits: 15, conversions: 12, exports: 5, payments: 10 },
  { date: '03/21', deposits: 18, conversions: 14, exports: 6, payments: 12 },
  { date: '03/22', deposits: 20, conversions: 16, exports: 7, payments: 15 },
];

const TransactionTable = ({ transactions }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'desc',
  });
  
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Deposit':
        return <FileUp className="h-4 w-4" />;
      case 'Conversion':
        return <ArrowUpDown className="h-4 w-4" />;
      case 'Export':
        return <FileDown className="h-4 w-4" />;
      case 'Payment':
        return <ArrowDown className="h-4 w-4" />;
      case 'Carbon':
        return <ArrowUp className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  Type
                  {sortConfig.key === 'type' && (
                    sortConfig.direction === 'asc' ? 
                    <ArrowDown className="h-3 w-3 ml-1" /> : 
                    <ArrowUp className="h-3 w-3 ml-1" />
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('from')}
                >
                  From / To
                  {sortConfig.key === 'from' && (
                    sortConfig.direction === 'asc' ? 
                    <ArrowDown className="h-3 w-3 ml-1" /> : 
                    <ArrowUp className="h-3 w-3 ml-1" />
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Amount / Value</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('timestamp')}
                >
                  Date & Time
                  {sortConfig.key === 'timestamp' && (
                    sortConfig.direction === 'asc' ? 
                    <ArrowDown className="h-3 w-3 ml-1" /> : 
                    <ArrowUp className="h-3 w-3 ml-1" />
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Transaction ID</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedTransactions.map((tx, index) => (
              <tr key={index} className="hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="mr-2 bg-muted rounded p-1">
                      {getCategoryIcon(tx.category)}
                    </div>
                    {tx.type}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">From:</span>
                      <span className="ml-1">{tx.from}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">To:</span>
                      <span className="ml-1">{tx.to}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div>{tx.amount}</div>
                    <div className="text-green-600 font-medium">{tx.value}</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {tx.timestamp}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  {tx.id}
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Explorer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download Receipt
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(transactionData);
  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredTransactions(transactionData);
    } else {
      const filtered = transactionData.filter(tx => 
        tx.id.toLowerCase().includes(query) ||
        tx.type.toLowerCase().includes(query) ||
        tx.from.toLowerCase().includes(query) ||
        tx.to.toLowerCase().includes(query) ||
        tx.amount.toLowerCase().includes(query)
      );
      setFilteredTransactions(filtered);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blockchain Transactions</h2>
          <p className="text-muted-foreground">View and analyze all blockchain-verified transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="sm:w-auto w-full">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Transaction Activity</CardTitle>
          <CardDescription>Weekly overview of transaction volume by type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F7942" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F7942" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B4513" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B4513" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4682B4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4682B4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPayments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6B8E23" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6B8E23" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="deposits" 
                  name="Bio-Waste Deposits"
                  stroke="#4F7942" 
                  fillOpacity={1} 
                  fill="url(#colorDeposits)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  name="Energy Conversions"
                  stroke="#8B4513" 
                  fillOpacity={1} 
                  fill="url(#colorConversions)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="exports" 
                  name="Export Sales"
                  stroke="#4682B4" 
                  fillOpacity={1} 
                  fill="url(#colorExports)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="payments" 
                  name="Payments"
                  stroke="#6B8E23" 
                  fillOpacity={1} 
                  fill="url(#colorPayments)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Transaction Ledger</CardTitle>
              <CardDescription>All blockchain-verified transactions in the system</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8 w-[200px] md:w-[260px]"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <input type="checkbox" className="mr-2" id="deposit" />
                    <label htmlFor="deposit">Bio-Waste Deposit</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <input type="checkbox" className="mr-2" id="conversion" />
                    <label htmlFor="conversion">Energy Conversion</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <input type="checkbox" className="mr-2" id="export" />
                    <label htmlFor="export">Export Sale</label>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <input type="checkbox" className="mr-2" id="payment" />
                    <label htmlFor="payment">Payment</label>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button size="sm" className="w-full">Apply Filters</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" /> Date Range
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="conversions">Conversions</TabsTrigger>
              <TabsTrigger value="exports">Exports</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TransactionTable transactions={filteredTransactions} />
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {transactionData.length} transactions
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="w-8 p-0">1</Button>
              <Button variant="outline" size="sm" className="w-8 p-0">2</Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">+180</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1.2M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">+22%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">+0.8%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Confirmation Time</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">-5s</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
