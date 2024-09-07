"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { loginUser } from "@/app/services/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { cookies } from "next/headers";
import { deleteUserCookie } from "@/app/services/cookies/delete";

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchparams = useSearchParams().get("p");
  useEffect(() => {
    deleteUserCookie();
  }, []);

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);

    try {
      const result = await loginUser(data.username, data.password);
      if (result) {
        router.replace(searchparams || "/home");
      }
    } catch (err: any) {
      setError(err.message || "Usuario o contraseña incorrectos.");
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Ingresar</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <IconButton
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1.5"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
