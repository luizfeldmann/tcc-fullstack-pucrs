import {
  Button,
  Input,
  Link,
  Stack,
  FormLabel,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const Login = () => {
  const [bShowPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!bShowPassword);
  };

  return (
    <Stack>
      <FormLabel>E-Mail:</FormLabel>
      <Input />
      <FormLabel>Password:</FormLabel>
      <Input
        type={bShowPassword ? "text" : "password"}
        endAdornment={
          <IconButton onClick={handleClickShowPassword}>
            {bShowPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        }
      />
      <Button variant="contained">Submit</Button>
      <center>
        <Link>Reset Password</Link>
      </center>
    </Stack>
  );
};

export default Login;
