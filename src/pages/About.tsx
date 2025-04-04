
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Users, Code, Database, Globe, Lock } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">About BioHarvest</h2>
          <p className="text-muted-foreground">Our mission and technology</p>
        </div>
      </div>

      <Tabs defaultValue="project" className="w-full">
        <TabsList>
          <TabsTrigger value="project">Project</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="tech">Technology</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>
        
        {/* Project Tab */}
        <TabsContent value="project" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain-Powered Bioenergy Marketplace</CardTitle>
              <CardDescription>A decentralized platform for sustainable agriculture and energy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Our Vision</h3>
                <p>
                  BioHarvest is a decentralized platform that connects smallholder farmers with microgrid operators to convert 
                  agricultural waste into bioenergy (such as biogas and biomass electricity) while also enabling 
                  the export of surplus bio-waste to international markets, ensuring higher profits for farmers 
                  and promoting global sustainability.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Key Mechanisms</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="font-semibold">Bio-Waste Conversion</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Crop residues (e.g., rice husks, wheat straw) are supplied by farmers and processed by 
                      microgrid operators to generate bioenergy such as biogas and biomass electricity.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-earth-100 p-2 rounded-full">
                        <Lock className="h-5 w-5 text-earth-500" />
                      </div>
                      <h4 className="font-semibold">Blockchain Transparency</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ensures secure, tamper-proof records of bio-waste transactions and energy production, 
                      building trust between stakeholders.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-water-100 p-2 rounded-full">
                        <Code className="h-5 w-5 text-water-500" />
                      </div>
                      <h4 className="font-semibold">Smart Contracts</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automate payments, waste verification, and energy tracking, ensuring quick and 
                      secure transactions between farmers and microgrid operators.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Globe className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="font-semibold">Global Market Integration</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Surplus bio-waste that is not converted into energy locally is exported to international markets, 
                      where it commands higher prices, boosting farmer incomes and supporting sustainable trade.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Problem Solution</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-3 text-left font-medium">Problem</th>
                        <th className="p-3 text-left font-medium">Solution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 border-t">Limited income for farmers due to lack of market access.</td>
                        <td className="p-3 border-t font-medium">Global Market Integration: Connects farmers with international buyers for higher profits.</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-t">Inefficiency and delays in payment processing.</td>
                        <td className="p-3 border-t font-medium">Smart Contracts: Automate payments and ensure instant transactions.</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-t">Lack of transparency in bio-waste transactions.</td>
                        <td className="p-3 border-t font-medium">Blockchain: Ensures tamper-proof, transparent records.</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-t">Environmental harm caused by burning crop residues.</td>
                        <td className="p-3 border-t font-medium">Bioenergy Conversion: Converts waste into clean energy, reducing pollution.</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-t">Surplus bio-waste left unutilized locally.</td>
                        <td className="p-3 border-t font-medium">Export Opportunities: Taps into high-demand global bioenergy markets.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team HackElite</CardTitle>
              <CardDescription>The innovative minds behind BioHarvest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                        SR
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Sayi Ranaaddir</h3>
                      <p className="text-green-600 font-medium mb-2">Team Leader</p>
                      <p className="text-sm text-muted-foreground">CSE, 2nd Year</p>
                      <p className="text-sm mt-3">
                        Project management, blockchain integration, and system architecture.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                        PS
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Pavan Sai Teja</h3>
                      <p className="text-green-600 font-medium mb-2">Team Member</p>
                      <p className="text-sm text-muted-foreground">CSE, 2nd Year</p>
                      <p className="text-sm mt-3">
                        Frontend development, UI/UX design, and data visualization.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                        SR
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Sayi Ranaaddir</h3>
                      <p className="text-green-600 font-medium mb-2">Team Member</p>
                      <p className="text-sm text-muted-foreground">CSE, 2nd Year</p>
                      <p className="text-sm mt-3">
                        Smart contract development and blockchain integration.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                        BP
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Baladeep Ponnaganti</h3>
                      <p className="text-green-600 font-medium mb-2">Team Member</p>
                      <p className="text-sm text-muted-foreground">CSE, 2nd Year</p>
                      <p className="text-sm mt-3">
                        Backend development, API design, and database management.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-6 bg-muted/20">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center bg-gradient-to-br from-earth-400 to-earth-600 text-white">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Gokaraju Rangaraju Institute of Engineering and Technology</h3>
                      <p className="text-sm text-muted-foreground">Computer Science Department</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Technology Tab */}
        <TabsContent value="tech" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>Our end-to-end technology solution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Frontend</h3>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Code className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">React (Vite)</div>
                          <div className="text-xs text-muted-foreground">Modern UI framework with fast refresh</div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Code className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Tailwind CSS</div>
                          <div className="text-xs text-muted-foreground">Utility-first CSS framework</div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Code className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Redux/Context API</div>
                          <div className="text-xs text-muted-foreground">State management solutions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Backend</h3>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-earth-100 p-2 rounded-full">
                          <Code className="h-4 w-4 text-earth-500" />
                        </div>
                        <div>
                          <div className="font-medium">Node.js & Express</div>
                          <div className="text-xs text-muted-foreground">Server-side JavaScript runtime</div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-earth-100 p-2 rounded-full">
                          <Database className="h-4 w-4 text-earth-500" />
                        </div>
                        <div>
                          <div className="font-medium">MongoDB</div>
                          <div className="text-xs text-muted-foreground">NoSQL database</div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-earth-100 p-2 rounded-full">
                          <Database className="h-4 w-4 text-earth-500" />
                        </div>
                        <div>
                          <div className="font-medium">IPFS</div>
                          <div className="text-xs text-muted-foreground">Distributed file storage</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Blockchain</h3>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-water-100 p-2 rounded-full">
                          <Lock className="h-4 w-4 text-water-500" />
                        </div>
                        <div>
                          <div className="font-medium">Ethereum/Polygon</div>
                          <div className="text-xs text-muted-foreground">Smart contract platforms</div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-water-100 p-2 rounded-full">
                          <Code className="h-4 w-4 text-water-500" />
                        </div>
                        <div>
                          <div className="font-medium">Solidity</div>
                          <div className="text-xs text-muted-foreground">Smart contract language</div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-water-100 p-2 rounded-full">
                          <Database className="h-4 w-4 text-water-500" />
                        </div>
                        <div>
                          <div className="font-medium">Chainlink Oracles</div>
                          <div className="text-xs text-muted-foreground">Off-chain data integration</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">IoT & Monitoring</h3>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Code className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Raspberry Pi/ESP32</div>
                          <div className="text-xs text-muted-foreground">Edge computing devices</div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-3 flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Code className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">MQTT Protocol</div>
                          <div className="text-xs text-muted-foreground">IoT communication</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-bold mb-4">System Architecture</h3>
                  <div className="relative h-[200px] md:h-[300px] bg-muted/30 rounded-lg border-2 border-dashed flex items-center justify-center">
                    <div className="text-muted-foreground">Architecture diagram placeholder</div>
                    <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg border shadow-md">
                      <div className="font-medium">Farmers</div>
                    </div>
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg border shadow-md">
                      <div className="font-medium">Blockchain Layer</div>
                    </div>
                    <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg border shadow-md">
                      <div className="font-medium">Microgrid Operators</div>
                    </div>
                    <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white p-4 rounded-lg border shadow-md">
                      <div className="font-medium">Global Marketplace</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Impact Tab */}
        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-World Impact</CardTitle>
              <CardDescription>Creating sustainable solutions with tangible benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border p-5 space-y-4">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Empowering Farmers</h3>
                    <p className="text-sm text-muted-foreground">
                      Connects farmers to local and global markets, ensuring higher profits and creating new revenue streams from agricultural waste.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Income Increase</span>
                        <span className="font-medium text-green-600">+30%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-5 space-y-4">
                    <div className="bg-earth-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-earth-500" />
                    </div>
                    <h3 className="text-xl font-bold">Rural Energy Independence</h3>
                    <p className="text-sm text-muted-foreground">
                      Microgrid operators generate bioenergy to power rural communities, reducing reliance on centralized power and fossil fuels.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Energy Self-sufficiency</span>
                        <span className="font-medium text-green-600">+45%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-5 space-y-4">
                    <div className="bg-water-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-water-500" />
                    </div>
                    <h3 className="text-xl font-bold">Environmental Benefits</h3>
                    <p className="text-sm text-muted-foreground">
                      Reduces crop burning and carbon emissions while promoting circular economy principles through waste utilization.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Carbon Emissions Reduction</span>
                        <span className="font-medium text-green-600">-40%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-6">
                  <h3 className="text-xl font-bold mb-4">Unique Value Proposition</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted/20 p-4 flex gap-4">
                      <div className="bg-green-100 p-2 rounded-full h-fit">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Dual Market Strategy</h4>
                        <p className="text-sm text-muted-foreground">
                          Enables local bioenergy generation and global bio-waste exports, maximizing profits and creating
                          resilient income streams for agricultural communities.
                        </p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-muted/20 p-4 flex gap-4">
                      <div className="bg-earth-100 p-2 rounded-full h-fit">
                        <Lock className="h-5 w-5 text-earth-500" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Blockchain Transparency</h4>
                        <p className="text-sm text-muted-foreground">
                          Ensures secure, tamper-proof transactions, building trust between farmers and buyers through
                          verifiable records of bio-waste quality, quantity, and transactions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-muted/20 p-4 flex gap-4">
                      <div className="bg-water-100 p-2 rounded-full h-fit">
                        <Code className="h-5 w-5 text-water-500" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Smart Contract Automation</h4>
                        <p className="text-sm text-muted-foreground">
                          Facilitates instant payments and seamless workflow, eliminating intermediaries and ensuring
                          farmers receive fair compensation quickly.
                        </p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-muted/20 p-4 flex gap-4">
                      <div className="bg-green-100 p-2 rounded-full h-fit">
                        <Globe className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Carbon Credit Incentives</h4>
                        <p className="text-sm text-muted-foreground">
                          Rewards sustainable practices, encouraging long-term participation and creating additional
                          revenue streams through tradable carbon credits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-6 bg-gradient-to-br from-green-50 to-green-100">
                  <h3 className="text-xl font-bold mb-4">Business Model & Market Potential</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-3">Revenue Streams</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <div className="bg-green-100 p-1 rounded-full h-fit">
                            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          </div>
                          <span><span className="font-medium">Transaction Fees:</span> 1-3% per transaction</span>
                        </li>
                        <li className="flex gap-2">
                          <div className="bg-green-100 p-1 rounded-full h-fit">
                            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          </div>
                          <span><span className="font-medium">Subscription Plans:</span> Tiered feature-based plans</span>
                        </li>
                        <li className="flex gap-2">
                          <div className="bg-green-100 p-1 rounded-full h-fit">
                            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          </div>
                          <span><span className="font-medium">Verification Fees:</span> Charges for producer verification</span>
                        </li>
                        <li className="flex gap-2">
                          <div className="bg-green-100 p-1 rounded-full h-fit">
                            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          </div>
                          <span><span className="font-medium">Carbon Credit Trading:</span> Fees from carbon credit trades</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Market Growth</h4>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Bioenergy Market (2030)</span>
                            <span>~$800B</span>
                          </div>
                          <div className="h-2 rounded-full bg-green-200">
                            <div className="h-2 rounded-full bg-green-600 w-4/5"></div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Carbon Credit Market (2027)</span>
                            <span>$2.4T</span>
                          </div>
                          <div className="h-2 rounded-full bg-green-200">
                            <div className="h-2 rounded-full bg-green-600 w-11/12"></div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Global Bio-waste Production</span>
                            <span>140M tons/year</span>
                          </div>
                          <div className="h-2 rounded-full bg-green-200">
                            <div className="h-2 rounded-full bg-green-600 w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default About;
