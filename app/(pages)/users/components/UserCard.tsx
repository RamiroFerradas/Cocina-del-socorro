import { User } from "@/app/models/User ";

export function UserCard({ user }: { user: User }) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold">
        {user.first_name} {user.last_name}
      </h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-500">Usuario: {user.username}</p>
      <p className="text-gray-500">Sucursal: {user.branch}</p>
      <p
        className={`text-sm font-medium ${
          user.is_active ? "text-green-600" : "text-red-600"
        }`}
      >
        {user.is_active ? "Activo" : "Inactivo"}
      </p>
    </div>
  );
}
