
// Update the filteredListings logic to handle the "all_types" value
const filteredListings = globalListings.filter(listing => 
  (searchTerm === "" || listing.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
   listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
   listing.seller.toLowerCase().includes(searchTerm.toLowerCase())) &&
  (selectedType === "" || selectedType === "all_types" || listing.type === selectedType)
);
