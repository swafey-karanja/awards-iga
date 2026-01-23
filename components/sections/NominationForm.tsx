"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  FormData,
  TextInput,
  PhoneInput,
  PageHeader,
  NavigationButtons,
  TextAreaField,
  SingleSelectField,
  FormErrors,
} from "@/components/ui/MultistepForm";
import { awardsCategories } from "@/lib/Appdata";
import { SelectChangeEvent } from "@mui/material";
import { fetchCSRFToken } from "@/app/services/api";
import { toast } from "sonner";

const TOTAL_PAGES = 2;

export default function NominationForm(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    companyName: "",
    role: "",
    nominatedCompany: "",
    reasonForNomination: "",
    specialContribution: "",
    impactOfNominee: "",
    award_category: null,
  });

  // Derived state: Get award category name from ID
  const getAwardCategoryName = (): string => {
    if (!formData.award_category) return "";

    const category = awardsCategories.find(
      (cat) => cat.id === formData.award_category,
    );
    return category?.title || "";
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (newValue: string): void => {
    setFormData((prev) => ({
      ...prev,
      phone: newValue,
    }));
  };

  const handleSingleSelectChange =
    <K extends keyof FormData>(field: K) =>
    (event: SelectChangeEvent<number>): void => {
      const {
        target: { value },
      } = event;

      setFormData((prev) => ({
        ...prev,
        [field]: (value === null ? null : Number(value)) as FormData[K],
      }));
    };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const validateLinkedIn = (url: string): boolean => {
  //   const linkedInRegex =
  //     /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/;
  //   return linkedInRegex.test(url);
  // };

  const validatePage = (page: number): boolean => {
    switch (page) {
      case 1:
        return !!(
          formData.firstName.trim() &&
          formData.lastName.trim() &&
          formData.email.trim() &&
          validateEmail(formData.email) &&
          formData.phone.trim() &&
          formData.companyName.trim() &&
          formData.role.trim() &&
          (!formData.linkedin || formData.linkedin)
        );
      case 2:
        return !!(
          formData.nominatedCompany.trim() &&
          formData.reasonForNomination.trim() &&
          formData.impactOfNominee.trim() &&
          formData.specialContribution.trim() &&
          formData.award_category !== null &&
          formData.award_category > 0
        );
      default:
        return false;
    }
  };

  const nextPage = (): void => {
    if (validatePage(currentPage)) {
      setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = (): void => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Page 1 validations
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Your company name is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Your role is required";
    }

    // if (formData.linkedin && !validateLinkedIn(formData.linkedin)) {
    //   newErrors.linkedin = "Please enter a valid LinkedIn profile URL";
    // }

    // Page 2 validations
    if (!formData.nominatedCompany.trim()) {
      newErrors.nominatedCompany = "Nominated company name is required";
    }

    if (!formData.reasonForNomination.trim()) {
      newErrors.reasonForNomination = "Reason for nomination is required";
    }

    if (!formData.specialContribution.trim()) {
      newErrors.specialContribution = "Special contribution is required";
    }

    if (!formData.impactOfNominee.trim()) {
      newErrors.impactOfNominee =
        "Impact of nominee's contribution is required";
    }

    if (formData.award_category === null || formData.award_category === 0) {
      newErrors.award_category = "Please select an award category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      // Find first page with errors
      const hasPage1Errors = !!(
        errors.firstName ||
        errors.lastName ||
        errors.email ||
        errors.phone ||
        errors.companyName ||
        errors.role ||
        errors.linkedin
      );

      if (hasPage1Errors && currentPage !== 1) {
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setIsSubmitting(true);

    const toastId = toast.loading("Submitting nomination...");

    try {
      // Get award category name for submission
      const awardCategoryName = getAwardCategoryName();

      // Combine first and last name
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

      // Prepare submission data with category name as an array (single item)
      const submissionData = {
        fullName,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        companyName: formData.companyName,
        role: formData.role,
        nominatedCompany: formData.nominatedCompany,
        reasonForNomination: formData.reasonForNomination,
        specialContribution: formData.specialContribution,
        impactOfNominee: formData.impactOfNominee,
        award_category: [awardCategoryName], // Send as array with single item
      };

      // console.log("Form submission data:", submissionData);

      const { csrfToken } = await fetchCSRFToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}nominations/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          body: JSON.stringify(submissionData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Submission failed, Please try again.",
        );
      }

      toast.success("Nomination submitted successfully!", {
        id: toastId,
      });

      // Reset form
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          linkedin: "",
          companyName: "",
          role: "",
          nominatedCompany: "",
          reasonForNomination: "",
          specialContribution: "",
          impactOfNominee: "",
          award_category: null,
        });
        setCurrentPage(1);
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);

      toast.error("Something went wrong. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateHome = (): void => {
    window.location.href = "/";
  };

  return (
    <div className="py-12 md:py-16 px-4 lg:px-8">
      <div className="mb-8 container mx-auto h-auto z-10">
        <button
          type="button"
          onClick={handleNavigateHome}
          className="flex items-center text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 mb-4 transition-colors font-bold cursor-pointer"
          aria-label="Navigate to home page"
        >
          <IoIosArrowBack className="mr-2" aria-hidden="true" />
          Back to home page
        </button>
        <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-green-700 to-green-600 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent py-2">
          Nomination Form
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl text-xs md:text-[13px] font-semibold">
          Nominate a deserving company for the iGaming AFRIKA Awards 2026
        </p>
        <p className="text-red-700 dark:text-red-400 max-w-5xl text-xs md:text-[15px] font-semibold">
          Note: Only one award nomination is allowed per form submission.
          Multiple nominations require separate form submissions.
        </p>
      </div>

      <div className="container mx-auto">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentPage} of {TOTAL_PAGES}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round((currentPage / TOTAL_PAGES) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-green-200 dark:bg-green-900/30 rounded-full h-2">
            <div
              className="bg-green-700 dark:bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / TOTAL_PAGES) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentPage}
              aria-valuemin={1}
              aria-valuemax={TOTAL_PAGES}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200/60 dark:border-green-700/30">
          <form onSubmit={handleSubmit} className="p-6 md:p-8" noValidate>
            {/* Page 1: Personal Information */}
            {currentPage === 1 && (
              <div className="space-y-6">
                <PageHeader
                  title="Personal Information"
                  description="Tell us about yourself and your company"
                />

                <div className="grid lg:grid-cols-2 gap-4">
                  <TextInput
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    helperText={errors.firstName}
                    disabled={isSubmitting}
                    autoComplete="given-name"
                    required
                  />

                  <TextInput
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    helperText={errors.lastName}
                    disabled={isSubmitting}
                    autoComplete="family-name"
                    required
                  />

                  <TextInput
                    name="email"
                    label="Work Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    helperText={errors.email}
                    placeholder="e.g. john.doe@company.com"
                    disabled={isSubmitting}
                    autoComplete="email"
                    required
                  />

                  <PhoneInput
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    disabled={isSubmitting}
                    required
                  />

                  <TextInput
                    name="companyName"
                    label="Your Company Name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    error={errors.companyName}
                    helperText={errors.companyName}
                    placeholder="Company you work for"
                    disabled={isSubmitting}
                    autoComplete="organization"
                    required
                  />

                  <TextInput
                    name="role"
                    label="Your Role/Title"
                    value={formData.role}
                    onChange={handleInputChange}
                    error={errors.role}
                    helperText={errors.role}
                    placeholder="e.g. Marketing Manager"
                    disabled={isSubmitting}
                    autoComplete="organization-title"
                    required
                  />
                </div>

                <TextInput
                  name="linkedin"
                  label="LinkedIn Profile (Optional)"
                  value={formData.linkedin ?? ""}
                  onChange={handleInputChange}
                  error={errors.linkedin}
                  helperText={errors.linkedin}
                  placeholder="e.g. https://www.linkedin.com/in/yourprofile"
                  disabled={isSubmitting}
                  autoComplete="url"
                />
              </div>
            )}

            {/* Page 2: Nomination Details */}
            {currentPage === 2 && (
              <div className="space-y-6">
                <PageHeader
                  title="Nomination Details"
                  description="Provide details about the company you want to nominate"
                />

                <TextInput
                  name="nominatedCompany"
                  label="Nominated Company Name"
                  value={formData.nominatedCompany}
                  onChange={handleInputChange}
                  error={errors.nominatedCompany}
                  helperText={errors.nominatedCompany}
                  placeholder="Name of the company you're nominating"
                  disabled={isSubmitting}
                  autoComplete="off"
                  required
                />

                <SingleSelectField
                  label="Award Category"
                  name="awardCategory"
                  value={formData.award_category}
                  onChange={handleSingleSelectChange("award_category")}
                  options={awardsCategories}
                  error={errors.award_category}
                  disabled={isSubmitting}
                  required
                />

                <TextAreaField
                  name="reasonForNomination"
                  label="Reason for Nomination"
                  value={formData.reasonForNomination}
                  onChange={handleInputChange}
                  placeholder="Give us some background information that explains why you are nominating the individual or company."
                  disabled={isSubmitting}
                  required
                  minRows={6}
                />

                <TextAreaField
                  name="impactOfNominee"
                  label="Nominee's special contribution or innovative solution to the gaming industry in Africa"
                  value={formData.impactOfNominee}
                  onChange={handleInputChange}
                  placeholder="Describe a specific instance or project where the individual or company exemplified their special contribution or innovative solution to the gaming industry in Africa."
                  disabled={isSubmitting}
                  required
                  minRows={6}
                />

                <TextAreaField
                  name="specialContribution"
                  label="Nominee's contribution's impact on the iGaming industry in Africa"
                  value={formData.specialContribution}
                  onChange={handleInputChange}
                  placeholder="What impact does the contribution/achievement have on the gaming industry in Africa?"
                  disabled={isSubmitting}
                  required
                  minRows={6}
                />
              </div>
            )}

            <NavigationButtons
              currentPage={currentPage}
              onPrev={prevPage}
              onNext={nextPage}
              onSubmit={(e) =>
                handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
              }
              canProceed={validatePage(currentPage)}
              isSubmitting={isSubmitting}
              totalPages={TOTAL_PAGES}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
