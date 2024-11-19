import { Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import UpdateAccountBasicsForm from "./UpdateAccountBasicsForm";
import UpdateAccountPasswordForm from "./UpdateAccountPasswordForm";
import { Info, Security } from "@mui/icons-material";
import { useI18nContext } from "../../localization/i18n-react";

/** Parameters passed to the account page */
export interface IAccountPageParams {
  /** The authentication token when logged in */
  token: string;
}

/**
 * Page where the user consults or changes account information
 */
const Account = (params: IAccountPageParams) => {
  /** Localization */
  const { LL } = useI18nContext();

  /** Indexes the tabs */
  enum ETabs {
    Basic,
    Security,
  }

  // Used to manage the active tab state
  const [currentTab, setCurrentTab] = useState<ETabs>(ETabs.Basic);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Stack>
      <h1>{LL.Account.Title()}</h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={currentTab} onChange={handleChangeTab}>
            <Tab
              label={LL.Account.BasicInfoTab()}
              iconPosition="start"
              icon={<Info />}
              value={ETabs.Basic}
            />
            <Tab
              label={LL.Account.SecurityTab()}
              iconPosition="start"
              icon={<Security />}
              value={ETabs.Security}
            />
          </Tabs>
        </Box>
        <div hidden={currentTab != ETabs.Basic}>
          <UpdateAccountBasicsForm />
        </div>
        <div hidden={currentTab != ETabs.Security}>
          <UpdateAccountPasswordForm />
        </div>
      </Box>
    </Stack>
  );
};

export default Account;
