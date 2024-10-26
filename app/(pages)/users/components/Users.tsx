import { User } from "@/app/models/User ";
import { UserCard } from "./UserCard";
import { Header } from "@/app/components";

type Props = {
  users: User[];
};

export function Users({ users }: Props) {
  return (
    <section>
      <Header></Header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
