import React from "react";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <div className="container container-fluid">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            disableRipple
            className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-primary/60 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              signIn("asgardeo", { callbackUrl: "/" });
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;
