"use client";
import { useForm } from "react-hook-form";
import { Suspense, useEffect, useState } from "react";
import { loginUser, deleteUserCookie } from "@/app/services";
import { useRouter, useSearchParams } from "next/navigation";
import { IconButton, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@/app/components";

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
      setError("Usuario o contraseña incorrectos.");
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
              placeholder="Usuario"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative max-h-11">
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
              />
              <IconButton
                onClick={togglePasswordVisibility}
                className="!absolute !right-2 !top-1.5"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <Button type="submit" isLoading={isLoading} className="w-full">
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Login />
    </Suspense>
  );
};

export default Page;
