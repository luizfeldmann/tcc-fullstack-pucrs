"use client";

import { UpdateAccountBasicsForm } from "@/lib/components/UpdateAccountBasicsForm/UpdateAccountBasicsForm";
import { UpdateAccountPasswordForm } from "@/lib/components/UpdateAccountPasswordForm/UpdateAccountPasswordForm";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Info, Security } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";

/**
 * Page where the user consults or changes account information
 */
export default function AccountPage() {
  // Localization
  const { LL } = useI18nContext();

  /** Indexes the tabs */
  enum ETabs {
    Basic,
    Security,
  }

  // Used to manage the active tab state
  const [currentTab, setCurrentTab] = useState<ETabs>(ETabs.Basic);

  const handleChangeTab = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setCurrentTab(newValue);
    },
    [setCurrentTab]
  );

  return (
    <Stack>
      <h1>{LL.Account.Title()}</h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={currentTab} onChange={handleChangeTab}>
            <Tab
              label={LL.Account.BasicInfoTab.Title()}
              iconPosition="start"
              icon={<Info />}
              value={ETabs.Basic}
            />
            <Tab
              label={LL.Account.SecurityTab.Title()}
              iconPosition="start"
              icon={<Security />}
              value={ETabs.Security}
            />
          </Tabs>
        </Box>
        <div hidden={currentTab != ETabs.Basic}>
          <h2>{LL.Account.BasicInfoTab.UpdateInfoForm.Title()}</h2>
          <UpdateAccountBasicsForm />
        </div>
        <div hidden={currentTab != ETabs.Security}>
          <h2>{LL.Account.SecurityTab.UpdatePasswordForm.Title()}</h2>
          <UpdateAccountPasswordForm />
        </div>
      </Box>
    </Stack>
  );
}
