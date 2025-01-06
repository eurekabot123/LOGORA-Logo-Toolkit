import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/(.*)",
    "/(pricing)(.*)",
    "/(terms)(.*)",
    "/(policy)(.*)",
    "/(generat)(.*)",
    "/(api)(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
