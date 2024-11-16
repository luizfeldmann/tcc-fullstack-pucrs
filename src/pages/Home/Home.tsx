import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ERoutes } from "../../routes";

/**
 * The landing page (index) of the site
 */
const Home = () => {
  return (
    <>
      <h1>Welcome</h1>
      <Stack>
        <Button variant="contained" component={Link} to={ERoutes.Login}>
          Log-in
        </Button>
        <Button variant="outlined" component={Link} to={ERoutes.Signup}>
          Sign-up
        </Button>
      </Stack>
    </>
  );
};

export default Home;
