import { CircularProgress } from "@mui/material";

export default function loading() {
  return (
    <div className="w-full h-screen flex justify-center item">
      <CircularProgress />
    </div>
  );
}
