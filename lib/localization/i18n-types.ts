// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'pt'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	Layout: {
		/**
		 * N​a​m​e​ ​o​f​ ​A​p​p
		 */
		AppTitle: string
		ProfileMenu: {
			/**
			 * A​c​c​o​u​n​t
			 */
			LinkAccount: string
			/**
			 * L​o​g​o​f​f
			 */
			LinkLogoff: string
		}
		DrawerMenu: {
			/**
			 * H​o​m​e
			 */
			LinkHome: string
			/**
			 * T​r​a​n​s​a​c​t​i​o​n​s
			 */
			LinkTransactions: string
			/**
			 * A​d​d​ ​D​e​p​o​s​i​t
			 */
			LinkDeposit: string
			/**
			 * S​e​l​l​e​r​ ​L​o​c​a​t​i​o​n​s
			 */
			LinkStores: string
			/**
			 * P​r​o​d​u​c​t​s
			 */
			LinkProducts: string
			/**
			 * A​b​o​u​t
			 */
			LinkAbout: string
		}
	}
	Home: {
		/**
		 * W​e​l​c​o​m​e
		 */
		Title: string
		/**
		 * L​o​g​i​n
		 */
		LoginButton: string
		/**
		 * S​i​g​n​u​p
		 */
		SignupButton: string
	}
	Login: {
		/**
		 * L​o​g​-​i​n
		 */
		Title: string
		/**
		 * F​o​r​g​o​t​ ​m​y​ ​p​a​s​s​w​o​r​d
		 */
		LinkForgotPassword: string
		Form: {
			/**
			 * E​-​m​a​i​l​ ​a​d​d​r​e​s​s
			 */
			Email: string
			/**
			 * T​h​e​ ​e​-​m​a​i​l​ ​i​s​ ​r​e​q​u​i​r​e​d
			 */
			EmailRequired: string
			/**
			 * T​h​i​s​ ​e​-​m​a​i​l​ ​i​s​ ​i​n​v​a​l​i​d
			 */
			EmailInvalid: string
			/**
			 * P​a​s​s​w​o​r​d
			 */
			Password: string
			/**
			 * T​h​e​ ​p​a​s​s​w​o​r​d​ ​i​s​ ​r​e​q​u​i​r​e​d
			 */
			PasswordRequired: string
			/**
			 * S​u​b​m​i​t
			 */
			ButtonSubmit: string
		}
		Status: {
			/**
			 * T​h​i​s​ ​u​s​e​r​ ​d​o​e​s​ ​n​o​t​ ​e​x​i​s​t
			 */
			BadUser: string
			/**
			 * T​h​e​ ​p​a​s​s​w​o​r​d​ ​i​s​ ​i​n​c​o​r​r​e​c​t
			 */
			BadPass: string
		}
	}
	Signup: {
		/**
		 * S​i​g​n​u​p
		 */
		Title: string
		Form: {
			/**
			 * F​i​r​s​t​ ​N​a​m​e
			 */
			FirstName: string
			/**
			 * Y​o​u​r​ ​f​i​r​s​t​ ​n​a​m​e​ ​i​s​ ​r​e​q​u​i​r​e​d
			 */
			FirstNameRequired: string
			/**
			 * L​a​s​t​ ​N​a​m​e
			 */
			LastName: string
			/**
			 * Y​o​u​r​ ​l​a​s​t​ ​n​a​m​e​ ​i​s​ ​r​e​q​u​i​r​e​d
			 */
			LastNameRequired: string
			/**
			 * E​-​m​a​i​l​ ​a​d​d​r​e​s​s
			 */
			Email: string
			/**
			 * I​n​f​o​r​m​ ​a​n​ ​e​-​m​a​i​l​ ​t​o​ ​a​s​s​o​c​i​a​t​e​d​ ​w​i​t​h​ ​y​o​u​r​ ​n​e​w​ ​a​c​c​o​u​n​t
			 */
			EmailRequired: string
			/**
			 * P​a​s​s​w​o​r​d
			 */
			Password: string
			/**
			 * C​r​e​a​t​e​ ​a​ ​u​n​i​q​u​e​ ​p​a​s​s​w​o​r​d​ ​f​o​r​ ​y​o​u​r​ ​n​e​w​ ​a​c​c​o​u​n​t
			 */
			PasswordRequired: string
			/**
			 * P​a​s​s​w​o​r​d​ ​C​o​n​f​i​r​m​a​t​i​o​n
			 */
			PasswordConfirmation: string
			/**
			 * T​y​p​e​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d​ ​a​g​a​i​n​ ​t​o​ ​c​o​n​f​i​r​m​ ​i​t
			 */
			PasswordConfirmationRequired: string
			/**
			 * C​r​e​a​t​e​ ​A​c​c​o​u​n​t
			 */
			ButtonSubmit: string
		}
		Status: {
			/**
			 * C​h​e​c​k​ ​y​o​u​r​ ​i​n​b​o​x​.​ ​A​n​ ​e​-​m​a​i​l​ ​w​a​s​ ​s​e​n​t​ ​w​i​t​h​ ​i​n​s​t​r​u​c​t​i​o​n​s​ ​t​o​ ​v​e​r​i​f​y​ ​y​o​u​r​ ​n​e​w​ ​a​c​c​o​u​n​t​.
			 */
			Sent: string
			/**
			 * A​n​ ​u​n​k​n​o​w​n​ ​e​r​r​o​r​ ​h​a​s​ ​o​c​c​u​r​r​e​d
			 */
			UnknownError: string
			/**
			 * T​h​i​s​ ​e​-​m​a​i​l​ ​i​s​ ​a​l​r​e​a​d​y​ ​r​e​g​i​s​t​e​r​e​d
			 */
			AlreadyExists: string
		}
	}
	Verify: {
		/**
		 * V​e​r​i​f​y​ ​n​e​w​ ​a​c​c​o​u​n​t
		 */
		Title: string
		Status: {
			/**
			 * A​n​ ​u​n​k​n​o​w​n​ ​e​r​r​o​r​ ​h​a​s​ ​o​c​c​u​r​r​e​d
			 */
			UnknownError: string
			/**
			 * P​l​e​a​s​e​ ​w​a​i​t​ ​w​h​i​l​e​ ​y​o​u​r​ ​a​c​c​o​u​n​t​ ​i​s​ ​v​e​r​i​f​i​e​d
			 */
			Loading: string
			/**
			 * Y​o​u​r​ ​a​c​c​o​u​n​t​ ​w​a​s​ ​v​e​r​i​f​i​e​d​ ​s​u​c​c​e​s​s​f​u​l​l​y
			 */
			Verified: string
			/**
			 * T​h​i​s​ ​a​c​c​o​u​n​t​ ​d​o​e​s​ ​n​o​t​ ​e​x​i​s​t
			 */
			NotExist: string
			/**
			 * T​h​e​ ​v​e​r​i​f​i​c​a​t​i​o​n​ ​l​i​n​k​ ​i​s​ ​i​n​v​a​l​i​d
			 */
			Invalid: string
		}
		/**
		 * G​o​ ​t​o​ ​L​o​g​i​n
		 */
		ButtonContinueLogin: string
	}
	Main: {
		/**
		 * H​o​m​e
		 */
		Title: string
	}
	Account: {
		/**
		 * Y​o​u​r​ ​a​c​c​o​u​n​t
		 */
		Title: string
		BasicInfoTab: {
			/**
			 * G​e​n​e​r​a​l
			 */
			Title: string
			UpdateInfoForm: {
				/**
				 * U​p​d​a​t​e​ ​y​o​u​r​ ​p​e​r​s​o​n​a​l​ ​i​n​f​o​r​m​a​t​i​o​n
				 */
				Title: string
				/**
				 * U​p​d​a​t​e
				 */
				SubmitButton: string
			}
		}
		SecurityTab: {
			/**
			 * S​e​c​u​r​i​t​y
			 */
			Title: string
			UpdatePasswordForm: {
				/**
				 * U​p​d​a​t​e​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d
				 */
				Title: string
				/**
				 * C​u​r​r​e​n​t​ ​p​a​s​s​w​o​r​d
				 */
				OldPassword: string
			}
		}
	}
	BalanceCard: {
		/**
		 * Y​o​u​r​ ​b​a​l​a​n​c​e
		 */
		Label: string
		/**
		 * A​d​d​ ​m​o​n​e​y
		 */
		LinkDeposit: string
	}
	Deposit: {
		/**
		 * A​d​d​ ​m​o​n​e​y​ ​t​o​ ​y​o​u​r​ ​b​a​l​a​n​c​e
		 */
		Title: string
		PaymentMethodCreditCard: {
			/**
			 * C​r​e​d​i​t​ ​C​a​r​d
			 */
			Title: string
		}
		PaymentMethodPix: {
			/**
			 * P​I​X
			 */
			Title: string
		}
		PaymentMethodRedeem: {
			/**
			 * R​e​d​e​e​m
			 */
			Title: string
			/**
			 * U​s​e​ ​a​ ​p​r​o​m​o​t​i​o​n​a​l​ ​c​o​d​e​ ​o​r​ ​g​i​f​t​ ​c​a​r​d​ ​t​o​ ​a​d​d​ ​b​a​l​a​n​c​e​ ​t​o​ ​y​o​u​r​ ​a​c​c​o​u​n​t
			 */
			Description: string
			Form: {
				/**
				 * C​o​d​e
				 */
				CodeField: string
				/**
				 * A​ ​r​e​d​e​e​m​a​b​l​e​ ​c​o​d​e​ ​i​s​ ​r​e​q​u​i​r​e​d
				 */
				CodeFieldRequired: string
				/**
				 * R​e​d​e​e​m
				 */
				ButtonSubmit: string
			}
			Status: {
				/**
				 * S​u​c​c​e​s​s​f​u​l​l​y​ ​d​e​p​o​s​i​t​e​d​ ​t​h​e​ ​f​u​n​d​s​ ​t​o​ ​y​o​u​r​ ​a​c​c​o​u​n​t
				 */
				Success: string
				/**
				 * T​h​i​s​ ​c​o​d​e​ ​i​s​ ​i​n​v​a​l​i​d
				 */
				BadCode: string
				/**
				 * T​h​i​s​ ​c​o​d​e​ ​i​s​ ​e​x​p​i​r​e​d​ ​o​r​ ​w​a​s​ ​a​l​r​e​a​d​y​ ​u​s​e​d
				 */
				ExpiredCode: string
				/**
				 * A​n​ ​u​n​k​n​o​w​n​ ​e​r​r​o​r​ ​h​a​s​ ​o​c​c​u​r​r​e​d
				 */
				UnknownError: string
			}
		}
		/**
		 * C​o​m​i​n​g​ ​S​o​o​n
		 */
		PaymentMethodComingSoon: string
	}
	Transactions: {
		/**
		 * Y​o​u​r​ ​t​r​a​n​s​a​c​t​i​o​n​s
		 */
		Title: string
		Table: {
			Columns: {
				/**
				 * D​a​t​e
				 */
				Date: string
				/**
				 * V​a​l​u​e
				 */
				Value: string
				/**
				 * D​e​s​c​r​i​p​t​i​o​n
				 */
				Description: string
			}
			TypeDescriptions: {
				/**
				 * R​e​d​e​e​m​e​d​ ​a​ ​c​o​d​e
				 */
				Redeem: string
				/**
				 * P​u​r​c​h​a​s​e
				 */
				Purchase: string
			}
		}
	}
	Stores: {
		/**
		 * S​t​o​r​e​s
		 */
		Title: string
		/**
		 * O​p​e​n
		 */
		OpenStatus: string
		/**
		 * O​p​e​n​s​ ​a​t​ ​{​0​}
		 * @param {string} 0
		 */
		OpeningTime: RequiredParams<'0'>
		/**
		 * C​l​o​s​e​d
		 */
		ClosedStatus: string
		/**
		 * C​l​o​s​e​s​ ​a​t​ ​{​0​}
		 * @param {string} 0
		 */
		ClosingTime: RequiredParams<'0'>
		/**
		 * O​p​e​n​s​ ​o​n​ ​{​0​}
		 * @param {string} 0
		 */
		OpeningDay: RequiredParams<'0'>
		/**
		 * N​o​ ​h​o​u​r​s​ ​i​n​f​o
		 */
		NoInfo: string
	}
	Products: {
		/**
		 * P​r​o​d​u​c​t​s
		 */
		Title: string
	}
	PasswordRequirements: {
		/**
		 * L​e​n​g​t​h​ ​m​u​s​t​ ​b​e​ ​a​t​ ​l​e​a​s​t​ ​{​0​}​ ​c​h​a​r​a​c​t​e​r​s
		 * @param {number} 0
		 */
		MinLen: RequiredParams<'0'>
		/**
		 * L​e​n​g​t​h​ ​m​u​s​t​ ​b​e​ ​a​t​ ​m​o​s​t​ ​{​0​}​ ​c​h​a​r​a​c​t​e​r​s
		 * @param {number} 0
		 */
		MaxLen: RequiredParams<'0'>
		/**
		 * M​u​s​t​ ​c​o​n​t​a​i​n​ ​a​ ​l​o​w​e​r​ ​c​a​s​e​ ​l​e​t​t​e​r
		 */
		LowerCase: string
		/**
		 * M​u​s​t​ ​c​o​n​t​a​i​n​ ​a​n​ ​u​p​p​e​r​ ​c​a​s​e​ ​l​e​t​t​e​r
		 */
		UpperCase: string
		/**
		 * M​u​s​t​ ​c​o​n​t​a​i​n​ ​a​ ​n​u​m​b​e​r
		 */
		Number: string
		/**
		 * R​e​q​u​i​r​e​d
		 */
		Required: string
		/**
		 * T​h​e​ ​p​a​s​s​w​o​r​d​ ​c​o​n​f​i​r​m​a​t​i​o​n​ ​m​u​s​t​ ​m​a​t​c​h​ ​t​h​e​ ​p​a​s​s​w​o​r​d
		 */
		Confirmation: string
	}
	ForgotPassword: {
		/**
		 * R​e​c​o​v​e​r​ ​y​o​u​r​ ​P​a​s​s​w​o​r​d
		 */
		Title: string
		Form: {
			/**
			 * E​-​m​a​i​l
			 */
			Email: string
			/**
			 * I​n​f​o​r​m​ ​t​h​e​ ​e​-​m​a​i​l​ ​o​f​ ​y​o​u​r​ ​l​o​s​t​ ​a​c​c​o​u​n​t
			 */
			EmailRequired: string
			/**
			 * T​h​i​s​ ​e​-​m​a​i​l​ ​i​s​ ​i​n​v​a​l​i​d
			 */
			EmailInvalid: string
			/**
			 * S​e​n​d​ ​R​e​c​o​v​e​r​y​ ​L​i​n​k
			 */
			ButtonSubmit: string
		}
		Status: {
			/**
			 * C​h​e​c​k​ ​y​o​u​r​ ​i​n​b​o​x​ ​f​o​r​ ​i​n​s​t​r​u​c​t​i​o​n​s​ ​o​n​ ​r​e​s​e​t​t​i​n​g​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d​.
			 */
			Sent: string
			/**
			 * U​s​e​r​ ​a​c​c​o​u​n​t​ ​f​o​r​ ​t​h​i​s​ ​e​-​m​a​i​l​ ​n​o​t​ ​f​o​u​n​d
			 */
			BadUser: string
		}
	}
	ChangePassword: {
		/**
		 * C​h​a​n​g​e​ ​y​o​u​r​ ​P​a​s​s​w​o​r​d
		 */
		Title: string
		Status: {
			/**
			 * P​a​s​s​w​o​r​d​ ​c​h​a​n​g​e​d​ ​s​u​c​c​e​s​s​f​u​l​l​y
			 */
			Success: string
			/**
			 * T​h​e​ ​l​i​n​k​ ​u​s​e​d​ ​i​s​ ​i​n​v​a​l​i​d​ ​o​r​ ​e​x​p​i​r​e​d
			 */
			Invalid: string
		}
		/**
		 * L​o​g​-​i​n
		 */
		ContinueLoginButton: string
		Form: {
			/**
			 * N​e​w​ ​p​a​s​s​w​o​r​d
			 */
			Password: string
			/**
			 * N​e​w​ ​p​a​s​s​w​o​r​d​ ​c​o​n​f​i​r​m​a​t​i​o​n
			 */
			ConfirmPassword: string
			/**
			 * S​a​v​e​ ​c​h​a​n​g​e
			 */
			Submit: string
		}
	}
	About: {
		/**
		 * A​b​o​u​t
		 */
		Title: string
	}
}

export type TranslationFunctions = {
	Layout: {
		/**
		 * Name of App
		 */
		AppTitle: () => LocalizedString
		ProfileMenu: {
			/**
			 * Account
			 */
			LinkAccount: () => LocalizedString
			/**
			 * Logoff
			 */
			LinkLogoff: () => LocalizedString
		}
		DrawerMenu: {
			/**
			 * Home
			 */
			LinkHome: () => LocalizedString
			/**
			 * Transactions
			 */
			LinkTransactions: () => LocalizedString
			/**
			 * Add Deposit
			 */
			LinkDeposit: () => LocalizedString
			/**
			 * Seller Locations
			 */
			LinkStores: () => LocalizedString
			/**
			 * Products
			 */
			LinkProducts: () => LocalizedString
			/**
			 * About
			 */
			LinkAbout: () => LocalizedString
		}
	}
	Home: {
		/**
		 * Welcome
		 */
		Title: () => LocalizedString
		/**
		 * Login
		 */
		LoginButton: () => LocalizedString
		/**
		 * Signup
		 */
		SignupButton: () => LocalizedString
	}
	Login: {
		/**
		 * Log-in
		 */
		Title: () => LocalizedString
		/**
		 * Forgot my password
		 */
		LinkForgotPassword: () => LocalizedString
		Form: {
			/**
			 * E-mail address
			 */
			Email: () => LocalizedString
			/**
			 * The e-mail is required
			 */
			EmailRequired: () => LocalizedString
			/**
			 * This e-mail is invalid
			 */
			EmailInvalid: () => LocalizedString
			/**
			 * Password
			 */
			Password: () => LocalizedString
			/**
			 * The password is required
			 */
			PasswordRequired: () => LocalizedString
			/**
			 * Submit
			 */
			ButtonSubmit: () => LocalizedString
		}
		Status: {
			/**
			 * This user does not exist
			 */
			BadUser: () => LocalizedString
			/**
			 * The password is incorrect
			 */
			BadPass: () => LocalizedString
		}
	}
	Signup: {
		/**
		 * Signup
		 */
		Title: () => LocalizedString
		Form: {
			/**
			 * First Name
			 */
			FirstName: () => LocalizedString
			/**
			 * Your first name is required
			 */
			FirstNameRequired: () => LocalizedString
			/**
			 * Last Name
			 */
			LastName: () => LocalizedString
			/**
			 * Your last name is required
			 */
			LastNameRequired: () => LocalizedString
			/**
			 * E-mail address
			 */
			Email: () => LocalizedString
			/**
			 * Inform an e-mail to associated with your new account
			 */
			EmailRequired: () => LocalizedString
			/**
			 * Password
			 */
			Password: () => LocalizedString
			/**
			 * Create a unique password for your new account
			 */
			PasswordRequired: () => LocalizedString
			/**
			 * Password Confirmation
			 */
			PasswordConfirmation: () => LocalizedString
			/**
			 * Type your password again to confirm it
			 */
			PasswordConfirmationRequired: () => LocalizedString
			/**
			 * Create Account
			 */
			ButtonSubmit: () => LocalizedString
		}
		Status: {
			/**
			 * Check your inbox. An e-mail was sent with instructions to verify your new account.
			 */
			Sent: () => LocalizedString
			/**
			 * An unknown error has occurred
			 */
			UnknownError: () => LocalizedString
			/**
			 * This e-mail is already registered
			 */
			AlreadyExists: () => LocalizedString
		}
	}
	Verify: {
		/**
		 * Verify new account
		 */
		Title: () => LocalizedString
		Status: {
			/**
			 * An unknown error has occurred
			 */
			UnknownError: () => LocalizedString
			/**
			 * Please wait while your account is verified
			 */
			Loading: () => LocalizedString
			/**
			 * Your account was verified successfully
			 */
			Verified: () => LocalizedString
			/**
			 * This account does not exist
			 */
			NotExist: () => LocalizedString
			/**
			 * The verification link is invalid
			 */
			Invalid: () => LocalizedString
		}
		/**
		 * Go to Login
		 */
		ButtonContinueLogin: () => LocalizedString
	}
	Main: {
		/**
		 * Home
		 */
		Title: () => LocalizedString
	}
	Account: {
		/**
		 * Your account
		 */
		Title: () => LocalizedString
		BasicInfoTab: {
			/**
			 * General
			 */
			Title: () => LocalizedString
			UpdateInfoForm: {
				/**
				 * Update your personal information
				 */
				Title: () => LocalizedString
				/**
				 * Update
				 */
				SubmitButton: () => LocalizedString
			}
		}
		SecurityTab: {
			/**
			 * Security
			 */
			Title: () => LocalizedString
			UpdatePasswordForm: {
				/**
				 * Update your password
				 */
				Title: () => LocalizedString
				/**
				 * Current password
				 */
				OldPassword: () => LocalizedString
			}
		}
	}
	BalanceCard: {
		/**
		 * Your balance
		 */
		Label: () => LocalizedString
		/**
		 * Add money
		 */
		LinkDeposit: () => LocalizedString
	}
	Deposit: {
		/**
		 * Add money to your balance
		 */
		Title: () => LocalizedString
		PaymentMethodCreditCard: {
			/**
			 * Credit Card
			 */
			Title: () => LocalizedString
		}
		PaymentMethodPix: {
			/**
			 * PIX
			 */
			Title: () => LocalizedString
		}
		PaymentMethodRedeem: {
			/**
			 * Redeem
			 */
			Title: () => LocalizedString
			/**
			 * Use a promotional code or gift card to add balance to your account
			 */
			Description: () => LocalizedString
			Form: {
				/**
				 * Code
				 */
				CodeField: () => LocalizedString
				/**
				 * A redeemable code is required
				 */
				CodeFieldRequired: () => LocalizedString
				/**
				 * Redeem
				 */
				ButtonSubmit: () => LocalizedString
			}
			Status: {
				/**
				 * Successfully deposited the funds to your account
				 */
				Success: () => LocalizedString
				/**
				 * This code is invalid
				 */
				BadCode: () => LocalizedString
				/**
				 * This code is expired or was already used
				 */
				ExpiredCode: () => LocalizedString
				/**
				 * An unknown error has occurred
				 */
				UnknownError: () => LocalizedString
			}
		}
		/**
		 * Coming Soon
		 */
		PaymentMethodComingSoon: () => LocalizedString
	}
	Transactions: {
		/**
		 * Your transactions
		 */
		Title: () => LocalizedString
		Table: {
			Columns: {
				/**
				 * Date
				 */
				Date: () => LocalizedString
				/**
				 * Value
				 */
				Value: () => LocalizedString
				/**
				 * Description
				 */
				Description: () => LocalizedString
			}
			TypeDescriptions: {
				/**
				 * Redeemed a code
				 */
				Redeem: () => LocalizedString
				/**
				 * Purchase
				 */
				Purchase: () => LocalizedString
			}
		}
	}
	Stores: {
		/**
		 * Stores
		 */
		Title: () => LocalizedString
		/**
		 * Open
		 */
		OpenStatus: () => LocalizedString
		/**
		 * Opens at {0}
		 */
		OpeningTime: (arg0: string) => LocalizedString
		/**
		 * Closed
		 */
		ClosedStatus: () => LocalizedString
		/**
		 * Closes at {0}
		 */
		ClosingTime: (arg0: string) => LocalizedString
		/**
		 * Opens on {0}
		 */
		OpeningDay: (arg0: string) => LocalizedString
		/**
		 * No hours info
		 */
		NoInfo: () => LocalizedString
	}
	Products: {
		/**
		 * Products
		 */
		Title: () => LocalizedString
	}
	PasswordRequirements: {
		/**
		 * Length must be at least {0} characters
		 */
		MinLen: (arg0: number) => LocalizedString
		/**
		 * Length must be at most {0} characters
		 */
		MaxLen: (arg0: number) => LocalizedString
		/**
		 * Must contain a lower case letter
		 */
		LowerCase: () => LocalizedString
		/**
		 * Must contain an upper case letter
		 */
		UpperCase: () => LocalizedString
		/**
		 * Must contain a number
		 */
		Number: () => LocalizedString
		/**
		 * Required
		 */
		Required: () => LocalizedString
		/**
		 * The password confirmation must match the password
		 */
		Confirmation: () => LocalizedString
	}
	ForgotPassword: {
		/**
		 * Recover your Password
		 */
		Title: () => LocalizedString
		Form: {
			/**
			 * E-mail
			 */
			Email: () => LocalizedString
			/**
			 * Inform the e-mail of your lost account
			 */
			EmailRequired: () => LocalizedString
			/**
			 * This e-mail is invalid
			 */
			EmailInvalid: () => LocalizedString
			/**
			 * Send Recovery Link
			 */
			ButtonSubmit: () => LocalizedString
		}
		Status: {
			/**
			 * Check your inbox for instructions on resetting your password.
			 */
			Sent: () => LocalizedString
			/**
			 * User account for this e-mail not found
			 */
			BadUser: () => LocalizedString
		}
	}
	ChangePassword: {
		/**
		 * Change your Password
		 */
		Title: () => LocalizedString
		Status: {
			/**
			 * Password changed successfully
			 */
			Success: () => LocalizedString
			/**
			 * The link used is invalid or expired
			 */
			Invalid: () => LocalizedString
		}
		/**
		 * Log-in
		 */
		ContinueLoginButton: () => LocalizedString
		Form: {
			/**
			 * New password
			 */
			Password: () => LocalizedString
			/**
			 * New password confirmation
			 */
			ConfirmPassword: () => LocalizedString
			/**
			 * Save change
			 */
			Submit: () => LocalizedString
		}
	}
	About: {
		/**
		 * About
		 */
		Title: () => LocalizedString
	}
}

export type Formatters = {}
