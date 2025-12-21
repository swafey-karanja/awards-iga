// ============================================================================
// FILE: components/form/FormComponents.tsx
// ============================================================================

import { ChangeEvent } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  // CloudUploadIcon,
} from "lucide-react";
// import { styled } from "@mui/material/styles";
import {
  TextField,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  // Button,
  SelectChangeEvent,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface AwardCategory {
  id: number;
  title: string;
  description?: string;
  focusAreas?: string[];
}

export interface CompanyType {
  value: string;
  label: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  companyName: string;
  role: string;
  companyType: string;
  reasonForNomination: string;
  award_category: number[];
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  companyName?: string;
  role?: string;
  companyType?: string;
  reasonForNomination?: string;
  award_category?: string;
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

interface TextInputProps {
  name: keyof FormData;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

interface PhoneInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  defaultCountry?: string;
  name?: string;
}

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
  required?: boolean;
}

interface MultiSelectFieldProps {
  label: string;
  name: string;
  value: number[]; // selected award category IDs
  onChange: (event: SelectChangeEvent<number[]>) => void;
  options: AwardCategory[];
  error?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean; // NEW
}
interface TextAreaFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  minRows?: number;
}

// interface FileUploadFieldProps {
//   label: string;
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
//   multiple?: boolean;
//   name?: string;
// }

interface PageHeaderProps {
  title: string;
  description: string;
}

interface NavigationButtonsProps {
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
  canProceed: boolean;
  isSubmitting: boolean;
  totalPages?: number;
}

// ============================================================================
// FORM COMPONENTS
// ============================================================================

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  htmlFor,
  children,
}) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-black mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  placeholder,
  disabled = false,
  type = "text",
  required = false,
  autoComplete,
}) => {
  const fieldId = `${name}-input`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <TextField
        fullWidth
        id={fieldId}
        type={type}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={helperText}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        size="small"
        required={required}
        autoComplete={autoComplete}
        inputProps={{
          id: fieldId,
          name: name,
          autoComplete: autoComplete,
        }}
      />
    </FormField>
  );
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  defaultCountry = "KE",
  name = "phone",
}) => {
  const fieldId = `${name}-input`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <MuiTelInput
        id={fieldId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultCountry={defaultCountry}
        name={name}
        inputProps={{
          id: fieldId,
          name: name,
          autoComplete: "tel",
        }}
      />
    </FormField>
  );
};

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  const fieldId = `${name}-group`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <FormControl component="fieldset">
        <RadioGroup
          id={fieldId}
          aria-labelledby={`${name}-label`}
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio id={`${name}-${option.value}`} name={name} />}
              label={option.label}
              className="text-black"
            />
          ))}
        </RadioGroup>
      </FormControl>
    </FormField>
  );
};

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  disabled = false,
  required = false,
  multiple = true, // default to multi-select
}) => {
  const fieldId = `${name}-select`;
  const labelId = `${name}-label`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <FormControl fullWidth size="small" error={!!error} disabled={disabled}>
        <InputLabel id={labelId}>{label}</InputLabel>

        <Select
          labelId={labelId}
          id={fieldId}
          name={name}
          multiple={multiple}
          value={value}
          onChange={onChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return "Select award category";
            }

            return options
              .filter((opt) => selected.includes(opt.id))
              .map((opt) => opt.title)
              .join(", ");
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {multiple && <Checkbox checked={value.includes(option.id)} />}
              <ListItemText
                primary={option.title}
                secondary={option.description}
              />
            </MenuItem>
          ))}
        </Select>

        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </FormField>
  );
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  minRows = 5,
}) => {
  const fieldId = `${name}-textarea`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <TextareaAutosize
        id={fieldId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={label}
        minRows={minRows}
        style={{ width: "100%" }}
        className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 text-black"
      />
    </FormField>
  );
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
    <p className="text-md font-medium text-gray-600">{description}</p>
  </div>
);

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentPage,
  onPrev,
  onNext,
  onSubmit,
  canProceed,
  isSubmitting,
  totalPages = 2,
}) => (
  <div className="flex justify-between mt-8 pt-6 border-t">
    <button
      type="button"
      onClick={onPrev}
      disabled={currentPage === 1}
      className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-green-500 text-black hover:bg-green-600"
      }`}
    >
      <ChevronLeft size={20} className="mr-2" />
      Back
    </button>

    {currentPage < totalPages ? (
      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
          canProceed
            ? "bg-green-500 text-black hover:bg-green-600"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
        <ChevronRight size={20} className="ml-2" />
      </button>
    ) : (
      <button
        type="submit"
        onClick={onSubmit}
        disabled={!canProceed || isSubmitting}
        className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
          canProceed && !isSubmitting
            ? "bg-[#14a45c] text-black hover:bg-green-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        <Check size={20} className="mr-1" />
        Submit
      </button>
    )}
  </div>
);
