
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Leaf, FileText, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

// Mock data
const farmerInventory = [
  { 
    id: "BW001", 
    type: "Rice Husks", 
    quantity: 120, 
    harvestDate: "2025-03-22", 
    status: "Available", 
    verifiedByBlockchain: true 
  },
  { 
    id: "BW002", 
    type: "Wheat Straw", 
    quantity: 85, 
    harvestDate: "2025-03-20", 
    status: "Pending Operator", 
    verifiedByBlockchain: true 
  },
  { 
    id: "BW003", 
    type: "Corn Stalks", 
    quantity: 200, 
    harvestDate: "2025-03-18", 
    status: "Converted to Energy", 
    verifiedByBlockchain: true 
  },
  { 
    id: "BW004", 
    type: "Rice Husks", 
    quantity: 150, 
    harvestDate: "2025-03-15", 
    status: "Exported", 
    verifiedByBlockchain: true 
  },
];

const FarmerDashboard = () => {
  const { toast } = useToast();
  const [bioWasteType, setBioWasteType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!bioWasteType || !quantity || !harvestDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate blockchain transaction
    setTimeout(() => {
      // Success notification with blockchain transaction ID
      toast({
        title: "Bio-waste Registered Successfully!",
        description: (
          <div>
            <p>Transaction ID: 0x74e2c1dc...b5f8</p>
            <p className="text-xs mt-1">Verified on blockchain</p>
          </div>
        ),
      });
      
      // Reset form
      setBioWasteType("");
      setQuantity("");
      setHarvestDate("");
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Farmer Dashboard</h2>
          <p className="text-muted-foreground">Register and manage your agricultural waste</p>
        </div>
        <Button variant="outline" className="sm:w-auto w-full">
          <FileText className="mr-2 h-4 w-4" />
          View Transaction History
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Register Bio-Waste</CardTitle>
            <CardDescription>Add new agricultural waste to the blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bioWasteType">Bio-Waste Type</Label>
                <Select value={bioWasteType} onValueChange={setBioWasteType}>
                  <SelectTrigger id="bioWasteType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice_husks">Rice Husks</SelectItem>
                    <SelectItem value="wheat_straw">Wheat Straw</SelectItem>
                    <SelectItem value="corn_stalks">Corn Stalks</SelectItem>
                    <SelectItem value="sugarcane_bagasse">Sugarcane Bagasse</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (kg)</Label>
                <Input 
                  id="quantity" 
                  type="number"
                  placeholder="Enter quantity" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="harvestDate">Harvest Date</Label>
                <Input 
                  id="harvestDate" 
                  type="date"
                  value={harvestDate} 
                  onChange={(e) => setHarvestDate(e.target.value)}
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  <Leaf className="mr-2 h-4 w-4" />
                  Register Bio-Waste
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Inventory</CardTitle>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="available">Available</TabsTrigger>
                  <TabsTrigger value="processed">Processed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>Your registered bio-waste inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Harvest Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Blockchain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmerInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.harvestDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === 'Available' ? 'bg-green-100 text-green-800' :
                        item.status === 'Pending Operator' ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'Converted to Energy' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.verifiedByBlockchain ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {farmerInventory.length} of {farmerInventory.length} entries
            </div>
            <Button variant="outline" size="sm">
              View All <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Potential Revenue</CardTitle>
          <CardDescription>Estimated earnings based on current market rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground mb-1">Local Energy Conversion</div>
              <div className="text-2xl font-bold">₹12,450</div>
              <div className="text-xs text-muted-foreground mt-1">Based on 230kg of available bio-waste</div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground mb-1">Global Export Market</div>
              <div className="text-2xl font-bold">₹18,750</div>
              <div className="text-xs text-muted-foreground mt-1">Based on international market rates</div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground mb-1">Carbon Credits</div>
              <div className="text-2xl font-bold">₹4,200</div>
              <div className="text-xs text-muted-foreground mt-1">Additional sustainability incentives</div>
            </div>
            
            <div className="rounded-lg border p-4 bg-green-50">
              <div className="text-sm font-medium text-green-700 mb-1">Total Potential Revenue</div>
              <div className="text-2xl font-bold text-green-700">₹35,400</div>
              <div className="text-xs text-green-600 mt-1">Combined from all channels</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;
