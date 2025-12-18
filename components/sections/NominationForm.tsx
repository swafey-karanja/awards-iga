"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { SelectChangeEvent } from "@mui/material";
import { toast } from "react-hot-toast";
import {
  FormData,
  FormErrors,
  ParticipationType,
  TextInput,
  PhoneInput,
  RadioGroupField,
  MultiSelectField,
  TextAreaField,
  FileUploadField,
  PageHeader,
  NavigationButtons,
} from "@/components/ui/MUltistepForm";
import { companyTypes } from "@/lib/Appdata";
// import { fetchCSRFToken } from "@/services/api";

// Constants
const participationTypes: ParticipationType[] = [
  { id: "conference-speaker", label: "Conference Speaker" },
  { id: "podcast-participation", label: "Podcast Participation" },
];

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
    websiteUrl: "",
    companyType: "",
    participationType: [],
    topicDescription: "",
    talkTitle: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleMultiSelectChange =
    (field: keyof FormData) =>
    (event: SelectChangeEvent<string[]>): void => {
      setFormData((prev) => ({
        ...prev,
        [field]:
          typeof event.target.value === "string"
            ? event.target.value.split(",")
            : event.target.value,
      }));
    };

  const validatePage = (page: number): boolean => {
    switch (page) {
      case 1:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      case 2:
        return !!(
          formData.companyName &&
          formData.role &&
          formData.companyType
        );
      case 3:
        return !!(
          formData.participationType.length > 0 && formData.topicDescription
        );
      default:
        return false;
    }
  };

  const nextPage = (): void => {
    if (validatePage(currentPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = (): void => {
    setCurrentPage((prev) => prev - 1);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.role.trim()) newErrors.role = "Your role is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const linkedInRegex =
      /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/;
    if (formData.linkedin && !linkedInRegex.test(formData.linkedin)) {
      newErrors.linkedin = "Please enter a valid LinkedIn profile URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    if (!validatePage(3)) return;

    // try {
    //   const { csrf_token } = await fetchCSRFToken();
    //   console.log({ csrf_token });

    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}speakers/become-a-speaker/`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-CSRF-Token": csrf_token,
    //       },
    //       body: JSON.stringify(formData),
    //     }
    //   );

    //   let data: { message?: string } | null = null;
    //   const text = await response.text();

    //   try {
    //     data = text ? JSON.parse(text) : null;
    //   } catch (jsonError) {
    //     console.warn("Failed to parse JSON response:", jsonError);
    //   }

    //   if (response.ok) {
    //     toast.success("Application submitted successfully!", {
    //       id: "submit-toast",
    //     });
    //     setTimeout(() => {
    //       setFormData({
    //         firstName: "",
    //         lastName: "",
    //         email: "",
    //         phone: "",
    //         linkedin: "",
    //         companyName: "",
    //         role: "",
    //         websiteUrl: "",
    //         companyType: "",
    //         participationType: [],
    //         topicDescription: "",
    //         talkTitle: "",
    //       });

    //       setCurrentPage(1);
    //     }, 1500);
    //   } else {
    //     toast.error(data?.message || "Submission failed", {
    //       id: "submit-toast",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Submission error:", error);
    //   toast.error("Submission failed. Try Again", { id: "submit-toast" });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleNavigateHome = (): void => {
    window.location.href = "/";
  };

  return (
    <div className="py-8 md:py-15 px-4 container mx-auto">
      <div className="mb-8">
        <button
          onClick={handleNavigateHome}
          className="flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors font-bold cursor-pointer"
        >
          <span className="mr-2 font-bold">
            <IoIosArrowBack />
          </span>
          Back to home page
        </button>
        <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-green-700 to-green-600 bg-clip-text text-transparent py-2">
          Speaker Registration
        </h1>
        <p className="text-white max-w-3xl text-xs md:text-[13px] font-semibold">
          Complete your registration as a speaker for iGaming AFRIKA Summit 2026
        </p>
      </div>

      <div className="lg:min-w-6xl mx-auto">
        <div className="bg-green-600/20 rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Page 1: Personal Information */}
            {currentPage === 1 && (
              <div className="space-y-6">
                <PageHeader
                  title="Personal Information"
                  description="We'll use this information to reach out to you before the event. Your details will not be shared externally."
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
                </div>

                <TextInput
                  name="linkedin"
                  label="LinkedIn Profile"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  error={errors.linkedin}
                  helperText={errors.linkedin}
                  placeholder="e.g. https://www.linkedin.com/in/yourprofile"
                  disabled={isSubmitting}
                  autoComplete="url"
                />
              </div>
            )}

            {/* Page 2: Organization Details */}
            {currentPage === 2 && (
              <div className="space-y-6">
                <PageHeader
                  title="Company Details"
                  description="This helps us understand your professional context. We often match speakers with themes or partners from similar sectors."
                />

                <TextInput
                  name="companyName"
                  label="Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  error={errors.companyName}
                  helperText={errors.companyName}
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
                  disabled={isSubmitting}
                  autoComplete="organization-title"
                  required
                />

                <TextInput
                  name="websiteUrl"
                  label="Website URL"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  autoComplete="url"
                />

                <RadioGroupField
                  label="Company Type"
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleInputChange}
                  options={companyTypes}
                  required
                />
              </div>
            )}

            {/* Page 3: Speaking Topic */}
            {currentPage === 3 && (
              <div className="space-y-6">
                <PageHeader
                  title="What would you like to speak about?"
                  description="We're looking for original, insightful, and valuable topics that resonate with our audience."
                />

                <MultiSelectField
                  label="Type of Participation"
                  name="participationType"
                  value={formData.participationType}
                  onChange={handleMultiSelectChange("participationType")}
                  options={participationTypes}
                  error={errors.participationType}
                  disabled={isSubmitting}
                  required
                />

                <TextInput
                  name="talkTitle"
                  label="Talk Title"
                  value={formData.talkTitle}
                  onChange={handleInputChange}
                  error={errors.talkTitle}
                  helperText={errors.talkTitle}
                  placeholder="e.g Reimagining gaming in Africa: Trends and Opportunities"
                  disabled={isSubmitting}
                  autoComplete="off"
                />

                <TextAreaField
                  label="Topic Description"
                  name="topicDescription"
                  value={formData.topicDescription}
                  onChange={handleInputChange}
                  placeholder="e.g An in-depth look at emerging trends in the African iGaming market, exploring new technologies, player behaviors, and regulatory changes shaping the industry's future."
                  disabled={isSubmitting}
                  required
                />

                <FileUploadField
                  label="Upload Supporting Files"
                  name="supportingFiles"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
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
              totalPages={3}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
