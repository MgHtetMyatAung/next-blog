import UserCard from "./UserCard";

async function getUsers() {
  const datas = await fetch("http://localhost:3000/api/users");
  return datas.json();
}

export default async function page() {
  const users = await getUsers();
  console.log(users);
  return (
    <div>
      <div className=" container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
