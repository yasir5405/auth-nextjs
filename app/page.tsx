import { client } from "../lib/prisma";

const fetchUser = async () => {
  try {
    const user = await client.users.findFirst({});
    return {
      name: user?.name,
      email: user?.email,
    };
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const userData = await fetchUser();
  return (
    <div>
      <h1>Name: {userData?.name}</h1>
      <h1>Name: {userData?.email}</h1>
    </div>
  );
}
