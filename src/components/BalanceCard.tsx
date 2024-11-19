import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { useI18nContext } from "../localization/i18n-react";
import { useMemo } from "react";
import { ERoutes } from "../routes";

/** Parameters passed to the balance card */
export interface IBalanceCardParams {
  /** The balance money; if undefined will show a skeleton */
  balance?: number;

  /** If to enable to link to add more deposit */
  enableDepositLink: boolean;
}

/** Shows the balance of the account */
const BalanceCard = (params: IBalanceCardParams) => {
  const { LL, locale } = useI18nContext();

  const currencyFmt = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "BRL",
    });
  }, [locale]);

  return (
    <Card sx={{ maxWidth: 256 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {LL.BalanceCard.Label()}
        </Typography>
        <Typography gutterBottom variant="h4" component="div">
          {params.balance !== undefined ? (
            currencyFmt.format(params.balance)
          ) : (
            <Skeleton />
          )}
        </Typography>
      </CardContent>
      <CardActions>
        {params.enableDepositLink && (
          <Button size="small" startIcon={<Add />} href={ERoutes.Deposit}>
            {LL.BalanceCard.LinkDeposit()}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BalanceCard;
