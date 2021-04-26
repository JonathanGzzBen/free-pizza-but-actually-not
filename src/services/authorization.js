import { tokenName } from "./firebase";
import Cookies from "cookies";

const validateOnServerSide = async (req, res) => {
  const cookies = new Cookies(req, res);
  const headers = {
    "Content-Type": "application/json",
    Authorization: JSON.stringify({
      token: cookies.get(tokenName),
    }),
  };
  const response = await fetch(`${process.env.APP_HOST}/api/validate`, {
    headers,
  });
  const user = (await response.json()).user;
  return user;
};

const redirectIfUserNotSignedIn = async (req, res) => {
  const user = await validateOnServerSide(req, res);
  if (!user) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return null;
};

const allowIfSignedIn = () => {
  const getServerSidePropsFunction = async ({ req, res }) => {
    const user = await validateOnServerSide(req, res);
    if (!user) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }
    return {
      props: { user: user },
    };
  };
  return getServerSidePropsFunction;
};

const allowIfNotSignedIn = () => {
  const getServerSidePropsFunction = async ({ req, res }) => {
    const user = await validateOnServerSide(req, res);
    if (user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  };
  return getServerSidePropsFunction;
};

const allowOnlyIfOnRole = (roles) => {
  const getServerSidePropsFunction = async ({ req, res }) => {
    const user = await validateOnServerSide(req, res);
    if (roles.indexOf(user?.customClaims?.puesto) === -1) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }
    return {
      props: { user: user },
    };
  };
  return getServerSidePropsFunction;
};

export {
  validateOnServerSide,
  allowIfSignedIn,
  allowIfNotSignedIn,
  allowOnlyIfOnRole,
  redirectIfUserNotSignedIn,
};
