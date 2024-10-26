import { fetchUsers } from "@/app/services/auth/fetchUsers";
import { Suspense } from "react";
import { UserLoadUi, Users } from "./components";

export const dynamic = "force-dynamic";

export default function UsersServer() {
  const usersPromise = fetchUsers();

  return (
    <Suspense fallback={<UserLoadUi />}>
      {usersPromise.then((users) => (
        <Users users={users} />
      ))}
    </Suspense>
  );
}
