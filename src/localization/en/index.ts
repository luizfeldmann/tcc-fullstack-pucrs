import type { BaseTranslation } from "../i18n-types";

const en = {
  Layout: {
    AppTitle: "Name of App",
    ProfileMenu: {
      LinkAccount: "Account",
      LinkLogoff: "Logoff",
    },
    DrawerMenu: {
      LinkHome: "Home",
      LinkTransactions: "Transactions",
      LinkDeposit: "Add Deposit",
      LinkAbout: "About",
    },
  },
  Home: {
    Title: "Welcome",
    LoginButton: "Login",
    SignupButton: "Signup",
  },
  Login: {
    Title: "Log-in",
    LinkForgotPassword: "Forgot my password",
    Form: {
      Email: "E-mail address",
      EmailRequired: "The e-mail is required",
      EmailInvalid: "This e-mail is invalid",
      Password: "Password",
      PasswordRequired: "The password is required",
      ButtonSubmit: "Submit",
    },
    Status: {
      BadUser: "This user does not exist",
      BadPass: "The password is incorrect",
    },
  },
  Signup: {
    Title: "Signup",
    Form: {
      FirstName: "First Name",
      FirstNameRequired: "Your first name is required",
      LastName: "Last Name",
      LastNameRequired: "Your last name is required",
      Email: "E-mail address",
      EmailRequired: "Inform an e-mail to associated with your new account",
      Password: "Password",
      PasswordRequired: "Create a unique password for your new account",
      PasswordConfirmation: "Password Confirmation",
      PasswordConfirmationRequired: "Type your password again to confirm it",
      ButtonSubmit: "Create Account",
    },
    Status: {
      Sent: "Check your inbox. An e-mail was sent with instructions to verify your new account.",
      UnknownError: "An unknown error has occurred",
      AlreadyExists: "This e-mail is already registered",
    },
  },
  Verify: {
    Title: "Verify new account",
    Status: {
      UnknownError: "An unknown error has occurred",
      Loading: "Please wait while your account is verified",
      Verified: "Your account was verified successfully",
      NotExist: "This account does not exist",
      Invalid: "The verification link is invalid",
    },
    ButtonContinueLogin: "Go to Login",
  },
  Main: {
    Title: "Home",
  },
  Account: {
    Title: "Your account",
    BasicInfoTab: "General",
    SecurityTab: "Security",
  },
  BalanceCard: {
    Label: "Your balance",
    LinkDeposit: "Add money",
  },
  Deposit: {
    Title: "Add money to your balance",
    PaymentMethodCreditCard: {
      Title: "Credit Card",
    },
    PaymentMethodPix: {
      Title: "PIX",
    },
    PaymentMethodRedeem: {
      Title: "Redeem",
      Description:
        "Use a promotional code or gift card to add balance to your account",
      Form: {
        CodeField: "Code",
        CodeFieldRequired: "A redeemable code is required",
        ButtonSubmit: "Redeem",
      },
      Status: {
        Success: "Successfully deposited the funds to your account",
        BadCode: "This code is invalid",
        ExpiredCode: "This code is expired or was already used",
        UnknownError: "An unknown error has occurred",
      },
    },
    PaymentMethodComingSoon: "Coming Soon",
  },
  Transactions: {
    Title: "Your transactions",
    Table: {
      Columns: {
        Date: "Date",
        Value: "Value",
        Description: "Description",
      },
      TypeDescriptions: {
        Redeem: "Redeemed a code",
        Purchase: "Purchase",
      },
    },
  },
  PasswordRequirements: {
    MinLen: "Length must be at least {0:number} characters",
    MaxLen: "Length must be at most {0:number} characters",
    LowerCase: "Must contain a lower case letter",
    UpperCase: "Must contain an upper case letter",
    Number: "Must contain a number",
    Required: "Required",
    Confirmation: "The password confirmation must match the password",
  },
  ResetPassword: {
    Title: "Recover your Password",
    Form: {
      Email: "E-mail",
      EmailRequired: "Inform the e-mail of your lost account",
      EmailInvalid: "This e-mail is invalid",
      ButtonSubmit: "Send Recovery Link",
    },
    Status: {
      Sent: "Check your inbox for instructions on resetting your password.",
      BadUser: "User account for this e-mail not found",
    },
  },
  ChangePassword: {
    Title: "Change your Password",
    SuccessMessage: "Password changed successfully",
    ContinueLoginButton: "Log-in",
    Form: {
      Password: "New password:",
      ConfirmPassword: "New password confirmation",
      Submit: "Save change",
    },
  },
  About: {
    Title: "About",
  },
} satisfies BaseTranslation;

export default en;
