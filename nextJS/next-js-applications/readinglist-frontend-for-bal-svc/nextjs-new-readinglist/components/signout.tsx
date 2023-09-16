import { signOut } from "next-auth/react";
<button
  onClick={(e) => {
    e.preventDefault();
    signOut({ callbackUrl: "/" });
  }}
>
  Logout
</button>;
