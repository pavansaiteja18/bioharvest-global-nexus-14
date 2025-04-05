
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, BarChart2, Globe, Shield, Zap } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="w-full py-4 px-6 flex items-center justify-between bg-background sticky top-0 z-50 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 p-1.5 rounded">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-green-600">Bio<span className="text-earth-500">Harvest</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-green-600 transition-colors">Features</a>
          <a href="#workflow" className="text-sm font-medium hover:text-green-600 transition-colors">Workflow</a>
          <a href="#impact" className="text-sm font-medium hover:text-green-600 transition-colors">Impact</a>
          <a href="#team" className="text-sm font-medium hover:text-green-600 transition-colors">Team</a>
        </nav>
        <Button asChild>
          <Link to="/dashboard">Get Started</Link>
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-green-100 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6 animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Blockchain-Powered <span className="text-green-600">Bioenergy</span> Marketplace
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg">
                Connect farmers with microgrid operators to convert agricultural waste into 
                clean energy while enabling global exports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link to="/farmer" className="flex items-center gap-2">
                    Farmer Dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/operator" className="flex items-center gap-2">
                    Operator Dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center animate-fade-in">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-8 bg-green-500 rounded-full opacity-30 animate-pulse [animation-delay:500ms]"></div>
                <div className="absolute inset-16 bg-green-600 rounded-full opacity-40 animate-pulse [animation-delay:1000ms]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-full shadow-lg">
                    <Leaf className="h-16 w-16 text-green-600" />
                  </div>
                </div>
                <div className="absolute top-1/4 left-0 transform -translate-x-1/2 bg-earth-500 p-4 rounded-full shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 bg-water-500 p-4 rounded-full shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-green-600 p-4 rounded-full shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Key Features</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Transforming agricultural waste into valuable resources with blockchain transparency
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <div className="bg-green-100 p-3 rounded-full"><Leaf className="h-6 w-6 text-green-600" /></div>,
                title: "Bio-Waste Conversion",
                description: "Convert crop residues like rice husks and wheat straw into valuable bioenergy resources."
              },
              {
                icon: <div className="bg-earth-100 p-3 rounded-full"><Shield className="h-6 w-6 text-earth-500" /></div>,
                title: "Blockchain Transparency",
                description: "Secure, tamper-proof records of bio-waste transactions and energy production."
              },
              {
                icon: <div className="bg-water-100 p-3 rounded-full"><Zap className="h-6 w-6 text-water-500" /></div>,
                title: "Smart Contracts",
                description: "Automated payments, waste verification, and energy tracking for secure transactions."
              },
              {
                icon: <div className="bg-green-100 p-3 rounded-full"><Globe className="h-6 w-6 text-green-600" /></div>,
                title: "Global Market Integration",
                description: "Export surplus bio-waste to international markets for higher profits."
              },
              {
                icon: <div className="bg-earth-100 p-3 rounded-full"><BarChart2 className="h-6 w-6 text-earth-500" /></div>,
                title: "Real-time Analytics",
                description: "Track transactions, energy production, and market trends with comprehensive analytics."
              },
              {
                icon: <div className="bg-water-100 p-3 rounded-full"><Shield className="h-6 w-6 text-water-500" /></div>,
                title: "Carbon Credit System",
                description: "Earn carbon credits for sustainable practices, creating additional revenue streams."
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Workflow Section */}
      <section id="workflow" className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">End-to-End Workflow</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our platform connects all stakeholders in a transparent and efficient ecosystem
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-2 transform -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Farmer Input",
                  description: "Farmers register bio-waste inventory on the blockchain",
                  color: "bg-green-500"
                },
                {
                  step: "2",
                  title: "Energy Conversion",
                  description: "Microgrid operators process waste into biogas and electricity",
                  color: "bg-earth-500"
                },
                {
                  step: "3",
                  title: "Market Distribution",
                  description: "Energy powers local communities or bio-waste is exported globally",
                  color: "bg-water-500"
                }
              ].map((step, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  <div className={`${step.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10`}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-700 text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link to="/dashboard">Experience the Workflow</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section id="impact" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World Impact</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Creating sustainable solutions with tangible benefits for communities and the environment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div className="md:order-2">
              {/* <img 
                src="https://rodaleinstitute.org/wp-content/uploads/NatandCody_NewFarm_170816_1464_HiRes.jpg" 
                alt="Sustainable farming"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              /> */}
            </div>
            <div className="space-y-8 md:order-1">
              {[
                {
                  title: "Empowering Farmers",
                  description: "Increase farmer income by up to 30% by creating value from agricultural waste"
                },
                {
                  title: "Environmental Protection",
                  description: "Reduce CO₂ emissions by preventing crop burning and fostering sustainable practices"
                },
                {
                  title: "Energy Independence",
                  description: "Provide reliable power to rural communities through local bioenergy production"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xl">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Team HackElite</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              The innovative minds behind BioHarvest
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sayi Ranaaddir",
                role: "Team Leader",
                branch: "CSE, 2nd Year"
              },
              {
                name: "Pavan Sai Teja",
                role: "Team Member",
                branch: "CSE, 2nd Year"
              },
              {
                name: "Sayi Ranaaddir",
                role: "Team Member",
                branch: "CSE, 2nd Year"
              },
              {
                name: "Baladeep Ponnaganti",
                role: "Team Member",
                branch: "CSE, 2nd Year"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(" ").map(part => part[0]).join("")}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.branch}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-white p-1.5 rounded">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xl font-bold">Bio<span className="text-earth-100">Harvest</span></span>
            </div>
            
            <div>
              <p className="text-sm text-gray-300 text-center md:text-right">
                &copy; 2025 BioHarvest by Team HackElite | Gokaraju Rangaraju Institute of Engineering and Technology
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
