import "./signin.styles.scss";
import React from "react";
import { Button, Input } from "../../components/Form";
import { useUser } from "context/user";
import Avatar from "assets/avatar.jpg";

const SignIn = () => {
  const { dispatch } = useUser();

  const handleSubmit = ev => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (email === "admin@admin.com" && password === "admin1234") {
      dispatch({
        type: "LoggedIn",
        payload: {
          user: {
            uid: 534870928,
            displayName: "Admin",
            email,
            photoURL: Avatar,
          },
        },
      });
    }
  };

  return (
    <main id="signin">
      <form onSubmit={handleSubmit}>
        <Input label="email" type="text" defaultValue="admin@admin.com" />
        <Input label="password" type="password" defaultValue="admin1234" />
        <div>
          <Button.Primary>Sign In</Button.Primary>{" "}
          <Button.Secondary type="button">Sign In with Google</Button.Secondary>
        </div>
      </form>
      <form onSubmit={handleSubmit}>
        <Input label="name" type="text" />
        <Input label="email" type="email" />
        <Input label="password" type="password" />
        <Input label="confirm password" type="password" />
        <Input type="checkbox" label="accept policy" />
        <Button.Secondary>Register</Button.Secondary>
      </form>
    </main>
  );
};

export default SignIn;
