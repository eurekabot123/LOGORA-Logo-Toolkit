import { getUser } from "@/service/user";
import { User } from "@/types/user";

export async function POST(req: Request) {
  const user: User = await getUser(req);
  console.log("user in getUserInfo: ", user);
  if (!user.phone && !user.email) {
    return Response.json("not login");
  }
  // const phone = user.phone;
  // const user_credits = await getUser(user_email);
  // console.log("user_credits", user_credits);

  return Response.json({
    code: 0,
    message: "ok",
    data: user,
  });
}
