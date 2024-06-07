export { type SelectOption } from './select-option.model';
export {
  type RegistrationFormData,
  type LoginFormData,
  type AddressInformationFormData,
  type PersonalInformationFormData,
} from './forms.model';
export type OperationResult = { success: true } | { success: false; error: Error };
