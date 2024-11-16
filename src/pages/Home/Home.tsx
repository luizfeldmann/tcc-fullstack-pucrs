import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ERoutes } from "../../routes";
import { Login, PersonAdd } from "@mui/icons-material";

/**
 * The landing page (index) of the site
 */
const Home = () => {
  return (
    <>
      <h1>Welcome</h1>
      <Stack>
        <Button
          variant="contained"
          startIcon={<Login />}
          component={Link}
          to={ERoutes.Login}
        >
          Log-in
        </Button>
        <Button
          variant="outlined"
          startIcon={<PersonAdd />}
          component={Link}
          to={ERoutes.Signup}
        >
          Sign-up
        </Button>
      </Stack>
    </>
  );
};

export default Home;
