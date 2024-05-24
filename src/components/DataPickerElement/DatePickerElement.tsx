// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// TODO
import { DatePicker, DatePickerProps, DatePickerSlotProps } from '@mui/x-date-pickers/DatePicker';
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { TextFieldProps, useForkRef } from '@mui/material';
import { forwardRef, ReactNode, Ref } from 'react';
import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import { useLocalizationContext, validateDate } from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import { useFormError, useTransform } from 'react-hook-form-mui';

const defaultErrorMessages: {
  [v in NonNullable<DateValidationError>]: string;
} = {
  disableFuture: 'Date must be in the past',
  maxDate: 'Date is later than the maximum allowed date',
  disablePast: 'Past date is not allowed',
  invalidDate: 'Date is invalid',
  minDate: 'Date is earlier than the minimum allowed date',
  shouldDisableDate: 'Date is not allowed',
  shouldDisableMonth: 'Month is not allowed',
  shouldDisableYear: 'Year is not allowed',
};

export type DatePickerElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends PickerValidDate = PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
> = Omit<DatePickerProps<TValue>, 'value' | 'slotProps'> & {
  name: TName;
  required?: boolean;
  isDate?: boolean;
  parseError?: (error: FieldError | DateValidationError) => ReactNode;
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  control?: Control<TFieldValues>;
  inputProps?: TextFieldProps;
  helperText?: TextFieldProps['helperText'];
  textReadOnly?: boolean;
  slotProps?: Omit<DatePickerSlotProps<TValue, TEnableAccessibleFieldDOMStructure>, 'textField'>;
  overwriteErrorMessages?: typeof defaultErrorMessages;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue | null;
    output?: (
      value: TValue | null,
      context: PickerChangeHandlerContext<DateValidationError>,
    ) => PathValue<TFieldValues, TName>;
  };
};

function getTimezone<TDate>(adapter, value: TDate): string | null {
  return value == null || !adapter.utils.isValid(value) ? null : adapter.utils.getTimezone(value);
}

const DatePickerElement = forwardRef((props: DatePickerElementProps, ref: Ref<HTMLDivElement>) => {
  const {
    parseError,
    name,
    required,
    rules = {},
    inputProps,
    control,
    textReadOnly,
    slotProps,
    overwriteErrorMessages,
    inputRef,
    transform,
    ...rest
  } = props;

  const adapter = useLocalizationContext();

  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;

  const errorMessages = {
    ...defaultErrorMessages,
    ...overwriteErrorMessages,
  };

  const rulesTmp = {
    ...rules,
    ...(required &&
      !rules.required && {
        required: 'This field is required',
      }),
    validate: {
      internal: (value) => {
        const internalError = validateDate({
          props: {
            shouldDisableDate: rest.shouldDisableDate,
            shouldDisableMonth: rest.shouldDisableMonth,
            shouldDisableYear: rest.shouldDisableYear,
            disablePast: Boolean(rest.disablePast),
            disableFuture: Boolean(rest.disableFuture),
            minDate: rest.minDate,
            maxDate: rest.maxDate,
            timezone: rest.timezone ?? getTimezone(adapter, value) ?? 'default',
          },
          value,
          adapter,
        });
        return internalError == null || errorMessages[internalError];
      },
      ...rules.validate,
    },
  };

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: rulesTmp,
    disabled: rest.disabled,
    defaultValue: null,
  });

  const { value, onChange } = useTransform({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input:
        typeof transform?.input === 'function'
          ? transform.input
          : (newValue) =>
              newValue && typeof newValue === 'string'
                ? adapter.utils.date(newValue) // need to see if this works for all localization adaptors
                : newValue,
      output: typeof transform?.output === 'function' ? transform.output : (newValue) => newValue,
    },
  });

  const handleInputRef = useForkRef(field.ref, inputRef);

  // eslint-disable-next-line no-nested-ternary
  const errorMessage = error ? (typeof customErrorFn === 'function' ? customErrorFn(error) : error.message) : null;

  return (
    <DatePicker
      {...rest}
      {...field}
      value={value}
      ref={ref}
      inputRef={handleInputRef}
      onClose={(...args) => {
        field.onBlur();
        if (rest.onClose) {
          rest.onClose(...args);
        }
      }}
      onChange={(newValue, context) => {
        onChange(newValue, context);
        if (typeof rest.onChange === 'function') {
          rest.onChange(newValue, context);
        }
      }}
      slotProps={{
        ...slotProps,
        textField: {
          ...inputProps,
          required,
          onBlur: (event) => {
            field.onBlur();
            if (typeof inputProps?.onBlur === 'function') {
              inputProps.onBlur(event);
            }
          },
          error: !!errorMessage,
          helperText: errorMessage || inputProps?.helperText || rest.helperText,
          inputProps: {
            readOnly: !!textReadOnly,
            ...inputProps?.inputProps,
          },
        },
      }}
    />
  );
});
DatePickerElement.displayName = 'DatePickerElement';
export { DatePickerElement };
