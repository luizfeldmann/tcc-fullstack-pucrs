import type { Translation } from "../i18n-types";

const pt = {
  Layout: {
    AppTitle: "Nome do App",
    ProfileMenu: {
      LinkAccount: "Minha conta",
      LinkLogoff: "Sair",
    },
    DrawerMenu: {
      LinkHome: "Início",
      LinkTransactions: "Extrato",
      LinkDeposit: "Depositar Saldo",
      LinkAbout: "Sobre",
    },
  },
  Home: {
    Title: "Bem-vindo",
    LoginButton: "Entrar",
    SignupButton: "Cadastro",
  },
  Login: {
    Title: "Entrar",
    LinkForgotPassword: "Esqueci a senha",
    Form: {
      Email: "Endereço de e-mail",
      EmailRequired: "O e-mail é obrigatório",
      EmailInvalid: "E-mail inválido",
      Password: "Senha",
      PasswordRequired: "A senha é obrigatória",
      ButtonSubmit: "Entrar",
    },
    Status: {
      BadUser: "Usuário não encontrado",
      BadPass: "Senha incorreta",
    },
  },
  Signup: {
    Title: "Cadastro",
    Form: {
      FirstName: "Nome",
      FirstNameRequired: "É necessário informar o nome",
      LastName: "Sobrenome",
      LastNameRequired: "É necessário informar seu sobrenome",
      Email: "E-mail",
      EmailRequired: "Informe um endereço de e-mail para sua nova conta",
      Password: "Senha",
      PasswordRequired: "Crie uma senha única para sua conta",
      PasswordConfirmation: "Confirme a senha",
      PasswordConfirmationRequired:
        "Digite a mesma senha novamente para confirmação",
      ButtonSubmit: "Criar conta",
    },
    Status: {
      Sent: "Um e-mail de confirmação foi enviado. Verifique sua caixa de entrada.",
      UnknownError: "Ocorreu um erro desconhecido",
      AlreadyExists: "Já existe uma conta registrada com esse e-mail",
    },
  },
  Verify: {
    Title: "Verificar nova conta",
    Status: {
      UnknownError: "Ocorreu um erro desconhecido",
      Loading: "Aguarde enquanto sua conta é verificada",
      Verified: "Sua conta foi verificada com sucesso",
      NotExist: "Essa conta não existe",
      Invalid: "Esse link de verificação é inválido",
    },
    ButtonContinueLogin: "Entrar",
  },
  Main: {
    Title: "Início",
  },
  Account: {
    Title: "Sua conta",
    BasicInfoTab: "Geral",
    SecurityTab: "Segurança",
  },
  BalanceCard: {
    Label: "Seu saldo",
    LinkDeposit: "Adicionar",
  },
  Deposit: {
    Title: "Adicionar saldo",
    PaymentMethodCreditCard: {
      Title: "Cartão de Crédito",
    },
    PaymentMethodPix: {
      Title: "PIX",
    },
    PaymentMethodRedeem: {
      Title: "Resgatar Voucher",
      Description:
        "Utilize um código promocional ou cartão de presente para resgatar um saldo para sua conta",
      Form: {
        CodeField: "Código",
        CodeFieldRequired: "Informe um código resgatável",
        ButtonSubmit: "Resgatar",
      },
      Status: {
        Success: "Os fundos foram depositados com sucesso em sua conta",
        BadCode: "Este código não é válido",
        ExpiredCode: "Este código já foi usado ou expirou",
        UnknownError:
          "O resgate não foi concluído devido a um erro desconhecido",
      },
    },
    PaymentMethodComingSoon: "Disponível em breve",
  },
  Transactions: {
    Title: "Extrato de transações",
    Table: {
      Columns: {
        Date: "Data",
        Value: "Valor",
        Description: "Descrição",
      },
      TypeDescriptions: {
        Redeem: "Resgatou um código",
        Purchase: "Efetuou uma compra",
      },
    },
  },
  PasswordRequirements: {
    MinLen: "Requer o tamanho mínimo de {0} caracteres",
    MaxLen: "Requer o tamanho máximo de {0} caracteres",
    LowerCase: "Deve conter uma letra minúscula",
    UpperCase: "Deve conter uma letra maiúscula",
    Number: "Deve conter um número",
    Required: "Obrigatório",
    Confirmation: "A confirmação deve ser igual a senha",
  },
  ResetPassword: {
    Title: "Recuperar sua Conta",
    Form: {
      Email: "E-mail",
      EmailRequired: "Informe o e-mail correspondente à conta a recuperar",
      EmailInvalid: "Endereço de e-mail inválido",
      ButtonSubmit: "Enviar link",
    },
    Status: {
      Sent: "Verifique sua caixa de entrada para instruções sobre como recuperar sua senha.",
      BadUser: "Endereço de e-mail não cadastrado",
    },
  },
  ChangePassword: {
    Title: "Altere sua Senha",
    SuccessMessage: "Senha alterada com sucesso",
    ContinueLoginButton: "Entrar",
    Form: {
      Password: "Nova senha",
      ConfirmPassword: "Confirmar nova senha",
      Submit: "Alterar",
    },
  },
  About: {
    Title: "Sobre",
  },
} satisfies Translation;

export default pt;
