import { Link } from "react-router-dom";
import { Card } from "@/components";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card>
        <h1 className="text-3xl font-bold text-red-500">
          404 - Page Not Found
        </h1>
        <Link to="/" className="text-blue-500 underline mt-4 inline-block">
          Go Home
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
