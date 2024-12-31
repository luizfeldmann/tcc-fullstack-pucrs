"use client";

import { ERoutes } from "@/lib/constants/ERoutes";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useBalanceQuery } from "./useBalanceQuery";
import { useAuthContext } from "../Providers/AuthProvider";

export const BalanceCard = (props: { enableDepositLink: boolean }) => {
  // Localization
  const { LL, locale } = useI18nContext();

  // Formatting for the currency
  const currencyFmt = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "BRL",
    });
  }, [locale]);

  // Read the balance data
  const authContext = useAuthContext();
  const balance = useBalanceQuery(authContext?.token);

  // Show the card
  return (
    <Card sx={{ maxWidth: 256 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {LL.BalanceCard.Label()}
        </Typography>
        <Typography gutterBottom variant="h4" component="div">
          {balance.isSuccess ? (
            currencyFmt.format(balance.data.balance)
          ) : (
            <Skeleton />
          )}
        </Typography>
      </CardContent>
      <CardActions>
        {props.enableDepositLink && (
          <Button size="small" startIcon={<Add />} href={ERoutes.Deposit}>
            {LL.BalanceCard.LinkDeposit()}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
