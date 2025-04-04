
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="text-center max-w-md px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          We couldn't find the page you're looking for. The path may be incorrect or the page might have been moved.
        </p>
        <Button asChild size="lg">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
