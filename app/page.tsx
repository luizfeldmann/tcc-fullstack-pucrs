"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useI18nContext } from "../lib/localization/i18n-react";
import { ERoutes } from "../lib/constants/ERoutes";
import { Login, PersonAdd } from "@mui/icons-material";
import Link from "next/link";

/**
 * The landing page (index) of the site
 */
export default function Home() {
  const { LL } = useI18nContext();

  return (
    <>
      <h1>{LL.Home.Title()}</h1>
      <Stack>
        <Button
          variant="contained"
          startIcon={<Login />}
          component={Link}
          href={ERoutes.Login}
        >
          {LL.Home.LoginButton()}
        </Button>
        <Button
          variant="outlined"
          startIcon={<PersonAdd />}
          component={Link}
          href={ERoutes.Signup}
        >
          {LL.Home.SignupButton()}
        </Button>
      </Stack>
    </>
  );
}
