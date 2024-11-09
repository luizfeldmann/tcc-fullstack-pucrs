import { Stack } from "@mui/material";
import { SignupForm } from "./SignupForm";

/** Page where the user may create a new account */
const Signup = () => {
  return (
    <Stack>
      <h1>Signup</h1>
      <SignupForm />
    </Stack>
  );
};

export default Signup;
