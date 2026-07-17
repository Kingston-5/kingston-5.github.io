import React, { useState } from "react";
import {
  Card,
  Button,
  Loader,
  Input,
  Checkbox,
  PhoneInput,
} from "@/components";
import { Link } from "react-router-dom";
import { toast } from "@/utils/toast";
import { register } from "@/features/auth/authSlice";
import type { IRegisterInput } from "@/features/auth/authSlice";
import type { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import useNavigation from "@/hooks/useNavigation";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole] = useState("user");
  const dispatch = useDispatch<AppDispatch>();
  const { navigateTo } = useNavigation();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("Please confirm your password");
    } else {
      const userData: IRegisterInput = {
        name: fullName,
        phone_number: phoneNumber,
        role: userRole,
        email: email,
        password: password,
      };
      console.log("USER DATA", userData);

      const resultAction = await dispatch(register(userData));

      // Check if the thunk was fulfilled (soft or hard success)
      if (register.fulfilled.match(resultAction)) {
        // The API returned success=true
        if (resultAction.payload.success) {
          toast.success("Log in successful");
          navigateTo("/");
        } else {
          // Soft error returned inside payload
          toast.error(resultAction.payload.message || "Login failed");
        }
      } else {
        // Thunk rejected (hard error / network / server)
        // payload may be undefined in some edge cases
        const message =
          resultAction.payload?.message || "A network or server error occurred";
        toast.error(message);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Sign Up
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Input
              label="Full Name"
              type="text"
              placeholder="Your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <PhoneInput
              label="Phone Number"
              placeholder=""
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e)}
            />
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" />

            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>

          <Button>Register</Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/login">
            <p className="text-indigo-600 hover:text-indigo-500 font-medium">
              Sign In
            </p>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
