export function handleError(error: any) {
  const firebaseErrorCode = error.code;

  switch (firebaseErrorCode) {
    case "auth/invalid-login":
      return "Credenciais inválidas. Por favor, verifique seu email e senha e tente novamente.";
    default:
      return "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";
  }
}
