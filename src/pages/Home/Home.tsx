import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useI18nContext } from "../../localization/i18n-react";
import { ERoutes } from "../../routes";
import { Login, PersonAdd } from "@mui/icons-material";

/**
 * The landing page (index) of the site
 */
const Home = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <h1>{LL.Home.Title()}</h1>
      <Stack>
        <Button
          variant="contained"
          startIcon={<Login />}
          component={Link}
          to={ERoutes.Login}
        >
          {LL.Home.LoginButton()}
        </Button>
        <Button
          variant="outlined"
          startIcon={<PersonAdd />}
          component={Link}
          to={ERoutes.Signup}
        >
          {LL.Home.SignupButton()}
        </Button>
      </Stack>
    </>
  );
};

export default Home;
