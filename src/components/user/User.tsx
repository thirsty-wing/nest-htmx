import * as Html from "@kitajs/html";
import Layout from "@/components/layout";
import { users } from "@/data/users";

export function User({ id }: { id: string }) {
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return <p>user not found!</p>;
  }

  return (
    <Layout title="user">
      <main class="container-fluid">
        <h1>User {user.fullName}</h1>
        <p>id: {user.id}</p>
        <p>email: {user.email}</p>
        <p>city: {user.city}</p>
        <p>shirt size: {user.shirtSize}</p>
        <p>department: {user.department}</p>
      </main>
    </Layout>
  );
}

export default User;
