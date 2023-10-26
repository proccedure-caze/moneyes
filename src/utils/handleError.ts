export function handleError(error: any) {
  const firebaseErrorCode = error.code;

  switch (firebaseErrorCode) {
    case "auth/invalid-login":
      return "Credenciais inválidas. Por favor, verifique seu email e senha e tente novamente.";
    case "auth/email-already-in-use":
      return "E-mail já cadastrado. Por favor, use um e-mail diferente.";
    default:
      return "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";
  }
}
