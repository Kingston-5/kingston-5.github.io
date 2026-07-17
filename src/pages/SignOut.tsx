import { useEffect } from "react";
import { Card, Button, Loader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/features/auth/authSlice";
import { toast } from "@/utils/toast";
import useNavigation from "@/hooks/useNavigation";

const SignOut: React.FC = () => {
  const { user, isLoading, isError, message } = useSelector(
    (state: RootState) => state.auth
  );
  const { navigateTo } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) {
      navigateTo("/login");
    }

    if (isError) {
      toast.error(message);
    }
  }, [user, isError, message, navigateTo]);

  const handleLogout = async () => {
    console.log("logout");
    dispatch(logout());
    navigateTo("/");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card>
        <h1 className="text-3xl font-bold text-primary">Sign Out Page</h1>
        <p>Click to log out</p>

            <Button onClick={() => handleLogout()}>Logout</Button>


      </Card>
    </div>
  );
};

export default SignOut;
