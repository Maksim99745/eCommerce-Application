import {
  isDuplicateFieldError,
  isErrorWithMessage,
  isInvalidCredentialsError,
  isResourceNotFoundError,
} from './errors';
import { isErrorWithBody } from './ErrorWithBody';
// TODO: check if it works after Roma fix his issue
export function createAppErrorMessage(error: unknown): string {
  if (isErrorWithBody(error)) {
    const errorDetails = error.body.errors[0];
    const field = errorDetails?.field ?? 'credentials';

    if (isDuplicateFieldError(errorDetails)) {
      return `An account with the provided ${field} already exists. 
      Please log in with your existing account or use a different ${field} to sign up.`;
    }

    if (isResourceNotFoundError(errorDetails)) {
      return `It looks like the page or resource you're looking for isn't available. 
     Please make sure the web address is correct.`;
    }

    if (isInvalidCredentialsError(errorDetails)) {
      return `No account was found with the provided email and password.
       Please check your credentials and try again.
       If you don't have an account, you can sign up.`;
    }
  }

  if (isErrorWithMessage(error)) {
    return error.message;
  }
  return String(error);
}
