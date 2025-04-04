
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
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Factory, Zap, RefreshCcw, CheckCircle2, ArrowRight, Globe, Leaf } from 'lucide-react';

// Mock data
const availableBioWaste = [
  { 
    id: "BW001", 
    farmer: "Farmer_123", 
    type: "Rice Husks", 
    quantity: 120, 
    harvestDate: "2025-03-22", 
    distance: "12km",
    selected: false
  },
  { 
    id: "BW005", 
    farmer: "Farmer_456", 
    type: "Wheat Straw", 
    quantity: 85, 
    harvestDate: "2025-03-20", 
    distance: "8km",
    selected: false
  },
  { 
    id: "BW008", 
    farmer: "Farmer_789", 
    type: "Corn Stalks", 
    quantity: 200, 
    harvestDate: "2025-03-18", 
    distance: "15km",
    selected: false
  },
];

const conversionRates = {
  rice_husks: 0.8, // kWh per kg
  wheat_straw: 0.65,
  corn_stalks: 0.7,
  sugarcane_bagasse: 0.9,
};

const processingQueue = [
  {
    id: "PC001",
    source: "BW003",
    type: "Corn Stalks",
    quantity: 200,
    startTime: "09:30 AM",
    duration: "4h",
    progress: 75,
    estimatedCompletion: "01:30 PM"
  }
];

const OperatorDashboard = () => {
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [convertedEnergy, setConvertedEnergy] = useState<number | null>(null);
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [processingState, setProcessingState] = useState("idle"); // idle, converting, completed
  
  const handleToggleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  const calculateTotalSelected = () => {
    return availableBioWaste
      .filter(item => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.quantity, 0);
  };
  
  const simulateConversion = () => {
    setProcessingState("converting");
    const totalQuantity = calculateTotalSelected();
    
    // Simulate progress with setTimeout
    setTimeout(() => {
      const energyProduced = totalQuantity * 0.75; // Simplified conversion rate
      setConvertedEnergy(energyProduced);
      setProcessingState("completed");
      
      toast({
        title: "Conversion Completed",
        description: (
          <div>
            <p>Successfully converted {totalQuantity}kg to {energyProduced.toFixed(0)}kWh</p>
            <p className="text-xs mt-1">Transaction verified on blockchain: 0x91f3e8c2...</p>
          </div>
        ),
      });
    }, 3000);
  };
  
  const handleExportSubmit = () => {
    toast({
      title: "Export Request Submitted",
      description: "Your bio-waste has been listed on the global marketplace.",
    });
    setExportDialogOpen(false);
    setSelectedItems([]);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Operator Dashboard</h2>
          <p className="text-muted-foreground">Convert bio-waste to energy or export to global markets</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="sm:w-auto w-full">
            <Zap className="mr-2 h-4 w-4" />
            Energy Statistics
          </Button>
          <Button className="sm:w-auto w-full">
            <Factory className="mr-2 h-4 w-4" />
            Plant Status
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Bio-Waste</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">405 kg</div>
            <p className="text-xs text-muted-foreground">
              From 3 farmers in your area
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Capacity</CardTitle>
            <Factory className="h-4 w-4 text-earth-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">300 kg / day</div>
            <p className="text-xs text-muted-foreground">
              Currently at <span className="text-green-600">35%</span> utilization
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Output</CardTitle>
            <Zap className="h-4 w-4 text-water-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 kWh</div>
            <p className="text-xs text-muted-foreground">
              This month's total generation
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
              Exported to 4 countries this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Bio-Waste</CardTitle>
          <CardDescription>Select items to convert to energy or export</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Select</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity (kg)</TableHead>
                <TableHead>Harvest Date</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableBioWaste.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300" 
                      checked={selectedItems.includes(item.id)} 
                      onChange={() => handleToggleSelect(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.farmer}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.harvestDate}</TableCell>
                  <TableCell>{item.distance}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Details</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex items-center justify-between">
          <div className="text-sm">
            Selected: <span className="font-medium">{selectedItems.length} items</span> (
            <span className="font-medium">{calculateTotalSelected()} kg</span>)
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              disabled={selectedItems.length === 0}
              onClick={() => setExportDialogOpen(true)}
            >
              <Globe className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button 
              disabled={selectedItems.length === 0}
              onClick={() => setConvertDialogOpen(true)}
            >
              <Zap className="mr-2 h-4 w-4" />
              Convert to Energy
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Processing Queue</CardTitle>
          <CardDescription>Current bio-waste to energy conversion processes</CardDescription>
        </CardHeader>
        <CardContent>
          {processingQueue.length > 0 ? (
            <div className="space-y-4">
              {processingQueue.map((process) => (
                <div key={process.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium">{process.id}</span> - {process.type} ({process.quantity} kg)
                    </div>
                    <span className="text-sm text-muted-foreground">Started: {process.startTime}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress: {process.progress}%</span>
                      <span>Est. completion: {process.estimatedCompletion}</span>
                    </div>
                    <Progress value={process.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No active processing tasks. Select bio-waste items to convert.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog for Energy Conversion */}
      <Dialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Convert Bio-Waste to Energy</DialogTitle>
            <DialogDescription>
              Start the process to convert selected bio-waste to bioenergy.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {processingState === "idle" && (
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="text-sm font-medium">Selected Bio-Waste</div>
                  <div className="flex justify-between items-center mt-2">
                    <span>{calculateTotalSelected()} kg total</span>
                    <span>{selectedItems.length} items</span>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="text-sm font-medium">Estimated Energy Output</div>
                  <div className="flex justify-between items-center mt-2">
                    <span>~{(calculateTotalSelected() * 0.75).toFixed(0)} kWh</span>
                    <span className="text-xs text-muted-foreground">Based on average conversion rates</span>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4 bg-green-50">
                  <div className="text-sm font-medium text-green-700">Farmer Payment</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-green-700">₹{(calculateTotalSelected() * 5).toFixed(2)}</span>
                    <span className="text-xs text-green-600">Via smart contract</span>
                  </div>
                </div>
              </div>
            )}
            
            {processingState === "converting" && (
              <div className="space-y-4 py-8 text-center">
                <div className="flex justify-center">
                  <RefreshCcw className="h-12 w-12 text-green-600 animate-spin" />
                </div>
                <div className="text-lg font-medium mt-4">Converting Bio-Waste to Energy</div>
                <div className="text-sm text-muted-foreground">This process is being verified on the blockchain...</div>
                <Progress value={65} className="h-2 mt-4" />
              </div>
            )}
            
            {processingState === "completed" && (
              <div className="space-y-4 py-8 text-center">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-lg font-medium mt-4">Conversion Complete!</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Successfully converted {calculateTotalSelected()}kg to {convertedEnergy?.toFixed(0)}kWh
                </div>
                <div className="rounded-lg border p-4 bg-green-50">
                  <div className="text-sm font-medium text-green-700">Transaction Completed</div>
                  <div className="text-xs text-green-600 mt-1">
                    Blockchain Transaction ID: 0x91f3e8c2...4d27
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-between">
            {processingState === "idle" && (
              <>
                <Button variant="outline" onClick={() => setConvertDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={simulateConversion}>
                  <Zap className="mr-2 h-4 w-4" />
                  Start Conversion
                </Button>
              </>
            )}
            
            {processingState === "converting" && (
              <Button disabled className="w-full">
                Processing...
              </Button>
            )}
            
            {processingState === "completed" && (
              <Button onClick={() => {
                setConvertDialogOpen(false);
                setProcessingState("idle");
                setSelectedItems([]);
              }} className="w-full">
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for Export */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export to Global Market</DialogTitle>
            <DialogDescription>
              List selected bio-waste on the global marketplace for international buyers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="rounded-lg border p-4 bg-muted/50">
              <div className="text-sm font-medium">Selected Bio-Waste</div>
              <div className="flex justify-between items-center mt-2">
                <span>{calculateTotalSelected()} kg total</span>
                <span>{selectedItems.length} items</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Asking Price (per kg)</Label>
              <Input id="price" type="number" placeholder="Enter price" defaultValue="18.50" />
              <p className="text-xs text-muted-foreground">Current market range: ₹15-20 per kg</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exportMarket">Target Market</Label>
              <Select defaultValue="europe">
                <SelectTrigger id="exportMarket">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe">European Market</SelectItem>
                  <SelectItem value="americas">North & South America</SelectItem>
                  <SelectItem value="asia">Asian Market</SelectItem>
                  <SelectItem value="global">Global (All Markets)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-lg border p-4 bg-green-50">
              <div className="text-sm font-medium text-green-700">Estimated Revenue</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-green-700">₹{(calculateTotalSelected() * 18.5).toFixed(2)}</span>
                <span className="text-xs text-green-600">Minus 3% platform fee</span>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExportSubmit}>
              <Globe className="mr-2 h-4 w-4" />
              List for Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OperatorDashboard;
