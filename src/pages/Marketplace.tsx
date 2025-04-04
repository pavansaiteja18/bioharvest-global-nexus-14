
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin, TrendingUp, Clock, ShoppingCart, Leaf } from 'lucide-react';

// Mock data
const globalListings = [
  {
    id: "GL001",
    seller: "AgriCoop India",
    type: "Rice Husks",
    quantity: 2000,
    price: 15.75,
    location: "Punjab, India",
    distance: "Global",
    verified: true,
    trending: true,
    carbonCredits: true
  },
  {
    id: "GL002",
    seller: "Thai Bioenergy Ltd",
    type: "Rice Husks",
    quantity: 5000,
    price: 14.25,
    location: "Bangkok, Thailand",
    distance: "Global",
    verified: true,
    trending: false,
    carbonCredits: true
  },
  {
    id: "GL003",
    seller: "Vietnam EcoPower",
    type: "Rice Husks",
    quantity: 3500,
    price: 13.50,
    location: "Mekong Delta, Vietnam",
    distance: "Global",
    verified: true,
    trending: false,
    carbonCredits: false
  },
  {
    id: "GL004",
    seller: "BioHarvest Local",
    type: "Wheat Straw",
    quantity: 1200,
    price: 12.80,
    location: "Haryana, India",
    distance: "120km",
    verified: true,
    trending: false,
    carbonCredits: true
  },
  {
    id: "GL005",
    seller: "Punjab Farms Collective",
    type: "Wheat Straw",
    quantity: 2400,
    price: 11.75,
    location: "Punjab, India",
    distance: "85km",
    verified: true,
    trending: true,
    carbonCredits: true
  },
  {
    id: "GL006",
    seller: "Indonesia Palm Biofuels",
    type: "Palm Residues",
    quantity: 8000,
    price: 9.25,
    location: "Sumatra, Indonesia",
    distance: "Global",
    verified: true,
    trending: false,
    carbonCredits: false
  },
];

const marketTrends = [
  { type: "Rice Husks", trend: "+2.3%", avgPrice: "₹14.75/kg" },
  { type: "Wheat Straw", trend: "-0.8%", avgPrice: "₹12.20/kg" },
  { type: "Corn Stalks", trend: "+1.5%", avgPrice: "₹13.40/kg" },
  { type: "Sugarcane Bagasse", trend: "+4.2%", avgPrice: "₹10.80/kg" },
  { type: "Palm Residues", trend: "-1.2%", avgPrice: "₹9.60/kg" },
];

const Marketplace = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [viewDetails, setViewDetails] = useState<any>(null);
  const [purchaseModal, setPurchaseModal] = useState(false);
  
  const filteredListings = globalListings.filter(listing => 
    (searchTerm === "" || listing.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
     listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
     listing.seller.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedType === "" || listing.type === selectedType)
  );
  
  const uniqueTypes = [...new Set(globalListings.map(item => item.type))];
  
  const handlePurchase = () => {
    toast({
      title: "Purchase Request Sent",
      description: "Your offer has been sent to the seller. You will be notified when they respond.",
    });
    setPurchaseModal(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Global Marketplace</h2>
          <p className="text-muted-foreground">Buy and sell bio-waste across international markets</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="sm:w-auto w-full">
            <TrendingUp className="mr-2 h-4 w-4" />
            Market Analytics
          </Button>
          <Button className="sm:w-auto w-full">
            <Leaf className="mr-2 h-4 w-4" />
            List Bio-Waste
          </Button>
        </div>
      </div>
      
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold mb-2">Global Bio-Waste Market</h3>
              <p className="text-sm text-green-800">
                Access international markets and maximize your bio-waste value through our
                blockchain-verified global marketplace.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button>Browse Listings</Button>
                <Button variant="outline">My Exports</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">25+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">120K</div>
                <div className="text-sm text-gray-600">Tons Traded</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">$15.2M</div>
                <div className="text-sm text-gray-600">Market Value</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Available Listings</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search listings..." 
                    className="max-w-[300px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {uniqueTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="local">Local</TabsTrigger>
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="carbon">Carbon Credits</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{listing.type}</CardTitle>
                        <Badge 
                          variant={listing.verified ? "default" : "outline"}
                          className={listing.verified ? "bg-green-600" : ""}
                        >
                          Verified
                        </Badge>
                      </div>
                      <CardDescription>{listing.seller}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Quantity:</span>
                          <span className="font-medium">{listing.quantity.toLocaleString()} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">₹{listing.price}/kg</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {listing.location}
                          {listing.distance === "Global" ? (
                            <span className="ml-auto flex items-center text-xs">
                              <Globe className="h-3 w-3 mr-1" /> Global
                            </span>
                          ) : (
                            <span className="ml-auto text-xs">{listing.distance}</span>
                          )}
                        </div>
                        {listing.trending && (
                          <div className="flex items-center text-orange-600 text-xs font-medium">
                            <TrendingUp className="h-3 w-3 mr-1" /> Trending
                          </div>
                        )}
                        {listing.carbonCredits && (
                          <div className="flex items-center text-green-600 text-xs font-medium">
                            <Leaf className="h-3 w-3 mr-1" /> Carbon Credits Eligible
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setViewDetails(listing)}
                      >
                        View Details
                      </Button>
                      <Button size="sm" onClick={() => {
                        setViewDetails(listing);
                        setPurchaseModal(true);
                      }}>
                        <ShoppingCart className="h-3 w-3 mr-1" /> Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredListings.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                    <Globe className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No listings found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t">
              <div className="text-sm text-muted-foreground">
                Showing {filteredListings.length} of {globalListings.length} listings
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>Latest price movements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{trend.type}</div>
                      <div className="text-sm text-muted-foreground">Avg: {trend.avgPrice}</div>
                    </div>
                    <div className={`text-lg font-semibold ${
                      trend.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trend.trend}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Tips</CardTitle>
              <CardDescription>Optimize your marketplace strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium mb-1">Best Time to Sell</div>
                  <p className="text-sm text-muted-foreground">
                    Rice husks prices peak during November-January
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="font-medium mb-1">Carbon Credits</div>
                  <p className="text-sm text-muted-foreground">
                    Listings with carbon credits sell 30% faster
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="font-medium mb-1">Bundle Shipping</div>
                  <p className="text-sm text-muted-foreground">
                    Group shipments to reduce export costs by 15%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Export Destinations</CardTitle>
              <CardDescription>Most active countries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5">🇪🇺</div>
                    <span>European Union</span>
                  </div>
                  <span className="text-muted-foreground text-sm">38%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5">🇯🇵</div>
                    <span>Japan</span>
                  </div>
                  <span className="text-muted-foreground text-sm">24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5">🇺🇸</div>
                    <span>United States</span>
                  </div>
                  <span className="text-muted-foreground text-sm">18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5">🇰🇷</div>
                    <span>South Korea</span>
                  </div>
                  <span className="text-muted-foreground text-sm">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5">🇨🇦</div>
                    <span>Canada</span>
                  </div>
                  <span className="text-muted-foreground text-sm">8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Listing Details Dialog */}
      <Dialog open={viewDetails && !purchaseModal} onOpenChange={(open) => {
        if (!open) setViewDetails(null);
      }}>
        {viewDetails && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{viewDetails.type} Details</DialogTitle>
              <DialogDescription>Listing ID: {viewDetails.id}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Seller</Label>
                  <div className="font-medium">{viewDetails.seller}</div>
                </div>
                <div className="space-y-1">
                  <Label>Location</Label>
                  <div className="font-medium">{viewDetails.location}</div>
                </div>
                <div className="space-y-1">
                  <Label>Quantity</Label>
                  <div className="font-medium">{viewDetails.quantity.toLocaleString()} kg</div>
                </div>
                <div className="space-y-1">
                  <Label>Price</Label>
                  <div className="font-medium">₹{viewDetails.price}/kg</div>
                </div>
                <div className="space-y-1">
                  <Label>Total Value</Label>
                  <div className="font-medium text-green-600">₹{(viewDetails.quantity * viewDetails.price).toLocaleString()}</div>
                </div>
                <div className="space-y-1">
                  <Label>Listing Date</Label>
                  <div className="font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 3 days ago
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 mt-4">
                <h4 className="font-medium mb-2">Specifications</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-muted-foreground">Moisture Content:</div>
                  <div>8-12%</div>
                  <div className="text-muted-foreground">Ash Content:</div>
                  <div>{"<"}18%</div>
                  <div className="text-muted-foreground">Calorific Value:</div>
                  <div>3,200-3,400 kcal/kg</div>
                  <div className="text-muted-foreground">Certification:</div>
                  <div>ISO 17225-1</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/30">
                <h4 className="font-medium mb-2">Blockchain Verification</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Hash:</span>
                    <span className="font-mono">0x74c9e212...3b5f</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verified Date:</span>
                    <span>2025-03-22 14:32 UTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quality Certificate:</span>
                    <span className="text-blue-600">View Certificate</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDetails(null)}>Close</Button>
              <Button onClick={() => setPurchaseModal(true)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Purchase
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Purchase Dialog */}
      <Dialog open={purchaseModal} onOpenChange={setPurchaseModal}>
        {viewDetails && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase {viewDetails.type}</DialogTitle>
              <DialogDescription>
                Complete your purchase from {viewDetails.seller}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Listing ID:</div>
                  <div>{viewDetails.id}</div>
                  <div className="text-muted-foreground">Type:</div>
                  <div>{viewDetails.type}</div>
                  <div className="text-muted-foreground">Available Quantity:</div>
                  <div>{viewDetails.quantity.toLocaleString()} kg</div>
                  <div className="text-muted-foreground">Price Per kg:</div>
                  <div>₹{viewDetails.price}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Purchase Quantity (kg)</Label>
                <Input id="quantity" type="number" placeholder="Enter quantity" defaultValue={Math.min(1000, viewDetails.quantity)} />
                <p className="text-xs text-muted-foreground">Maximum available: {viewDetails.quantity.toLocaleString()} kg</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Requested Delivery Date</Label>
                <Input id="deliveryDate" type="date" defaultValue="2025-04-15" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select defaultValue="smart_contract">
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smart_contract">Smart Contract (Instant)</SelectItem>
                    <SelectItem value="escrow">Blockchain Escrow (3% fee)</SelectItem>
                    <SelectItem value="credit">Credit (Net 30)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-medium">
                  <span>Subtotal (1,000 kg):</span>
                  <span>₹{(1000 * viewDetails.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Platform Fee (2%):</span>
                  <span>₹{(0.02 * 1000 * viewDetails.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-green-600 mt-3">
                  <span>Total:</span>
                  <span>₹{(1000 * viewDetails.price * 1.02).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="rounded-lg border p-4 bg-green-50 mt-4">
                <div className="text-sm font-medium text-green-700 mb-1">Smart Contract Payment</div>
                <div className="text-xs text-green-600">
                  Funds will be held in escrow until delivery is confirmed and verified on the blockchain.
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPurchaseModal(false)}>Cancel</Button>
              <Button onClick={handlePurchase}>
                Confirm Purchase
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Marketplace;
