import { getSession, signIn, signOut } from "next-auth/react";

const Header = (session: any, org: any) => (
  <header>
    <div className={`max-w-4xl mx-auto py-16 px-14 sm:px-6 lg:px-8`}>
      <h1
        className={`font-sans font-bold text-4xl md:text-5xl lg:text-8xl text-center leading-snug text-gray-800`}
      >
        Asgardeo-NextJs Sample Application
      </h1>
      <div className={`max-w-xl mx-auto`}>
        <p className={`mt-10 text-gray-500 text-center text-xl lg:text-3xl`}>
          Create seamless login experiences in minutes.Try out Asgardeo for free
          and see how much time you can save
        </p>
      </div>
      <div className={`mt-10 flex justify-center items-center w-full mx-auto`}>
        {session ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn("asgardeo", { callbackUrl: "/" });
            }}
          >
            Login with Asgardeo
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut({ callbackUrl: "/" });
            }}
            style={{ marginTop: "30px", marginBottom: "40px" }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  </header>
);

export default Header;

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
      org: process.env.ASGARDEO_ORGANIZATION_NAME,
    },
  };
}
