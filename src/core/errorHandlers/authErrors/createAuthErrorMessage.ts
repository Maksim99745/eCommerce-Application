type ErrorWithBody = Error & { body?: { errors?: Array<{ code?: string; field?: string }> } };

function isErrorWithBody(error: unknown): error is ErrorWithBody {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return error instanceof Error && !!(error as ErrorWithBody).body;
}

export function createAuthErrorMessage(error: unknown): string {
  if (isErrorWithBody(error)) {
    const errorDetails = error.body?.errors?.[0];
    const errorCode = errorDetails?.code;
    const field = errorDetails?.field ?? 'credentials';

    let message: string;

    switch (errorCode) {
      case 'DuplicateField':
        message = `An account with the provided ${field} already exists. 
      Please log in with your existing account or use a different ${field} to sign up.`;
        break;
      case 'InvalidCredentials':
        message = `No account was found with the provided email and password. 
      Please check your credentials and try again. 
      If you don't have an account, you can sign up.`;
        break;
      case 'ResourceNotFound':
        message = `Oops! The resource you’re looking for couldn’t be found.
        Please check the details and try again.`;
        break;
      default:
        message = error.message;
        break;
    }

    return message;
  }

  return String(error);
}
