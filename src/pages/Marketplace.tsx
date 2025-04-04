
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, MapPin, User, Tag } from 'lucide-react';

// Sample data for marketplace listings
const mockListings = [
  {
    id: 1,
    title: 'Rice Husks - Premium Quality',
    type: 'Rice Husks',
    description: 'High-quality rice husks available for energy conversion or export. Low moisture content, high energy potential.',
    quantity: '500 kg',
    price: '₹1,500 per 100kg',
    location: 'Punjab, India',
    seller: 'Farmer Singh',
    image: '🌾'
  },
  {
    id: 2,
    title: 'Wheat Straw - Bulk Supply',
    type: 'Wheat Straw',
    description: 'Dry wheat straw available in bulk quantities. Ideal for bioenergy conversion or animal bedding.',
    quantity: '1200 kg',
    price: '₹800 per 100kg',
    location: 'Haryana, India',
    seller: 'AgriHarvest Co.',
    image: '🌿'
  },
  {
    id: 3,
    title: 'Corn Stalks - Fresh Harvest',
    type: 'Corn Stalks',
    description: 'Freshly harvested corn stalks. Good for biofuel production or composting.',
    quantity: '350 kg',
    price: '₹1,200 per 100kg',
    location: 'Karnataka, India',
    seller: 'Organic Farms Ltd.',
    image: '🌽'
  },
  {
    id: 4,
    title: 'Sugarcane Bagasse',
    type: 'Sugarcane Bagasse',
    description: 'Premium quality bagasse from sugar production. High fiber content, excellent for paper products or energy.',
    quantity: '800 kg',
    price: '₹1,000 per 100kg',
    location: 'Maharashtra, India',
    seller: 'SugarTech Industries',
    image: '🍯'
  },
  {
    id: 5,
    title: 'Mixed Agricultural Waste',
    type: 'Mixed Waste',
    description: 'Mixed agricultural waste suitable for biogas production. Includes various crop residues.',
    quantity: '600 kg',
    price: '₹700 per 100kg',
    location: 'Gujarat, India',
    seller: 'GreenWaste Solutions',
    image: '♻️'
  },
  {
    id: 6,
    title: 'Coconut Shells - Export Quality',
    type: 'Coconut Shells',
    description: 'High-quality coconut shells for activated carbon production or export.',
    quantity: '400 kg',
    price: '₹2,500 per 100kg',
    location: 'Kerala, India',
    seller: 'CocoTrade Exports',
    image: '🥥'
  },
];

// Waste types for filtering
const wasteTypes = [
  { label: 'All Types', value: 'all_types' },
  { label: 'Rice Husks', value: 'Rice Husks' },
  { label: 'Wheat Straw', value: 'Wheat Straw' },
  { label: 'Corn Stalks', value: 'Corn Stalks' },
  { label: 'Sugarcane Bagasse', value: 'Sugarcane Bagasse' },
  { label: 'Coconut Shells', value: 'Coconut Shells' },
  { label: 'Mixed Waste', value: 'Mixed Waste' },
];

const Marketplace = () => {
  // State for filter and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all_types');
  const [globalListings, setGlobalListings] = useState(mockListings);
  
  // Filter listings based on search term and selected type
  const filteredListings = globalListings.filter(listing => 
    (searchTerm === "" || 
     listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     listing.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
     listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
     listing.seller.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedType === "all_types" || listing.type === selectedType)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Global Marketplace</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input 
            placeholder="Search by type, location, or seller..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select 
            value={selectedType} 
            onValueChange={setSelectedType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by waste type" />
            </SelectTrigger>
            <SelectContent>
              {wasteTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No listings found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{listing.title}</CardTitle>
                  <div className="text-4xl">{listing.image}</div>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {listing.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{listing.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{listing.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">{listing.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{listing.seller}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Contact Seller
                </Button>
                <Button size="sm">
                  Purchase
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
