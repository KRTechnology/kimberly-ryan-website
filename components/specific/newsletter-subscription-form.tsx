"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/common/button";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function NewsletterSubscriptionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Handle form submission
      console.log("Email submitted:", data.email);
      // Add your API call here

      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Desktop: Side by side layout */}
        <div className="hidden lg:flex lg:gap-4 lg:items-start">
          <div className="flex-1">
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 whitespace-nowrap"
          >
            {isSubmitting ? "Submitting..." : "Get started"}
          </Button>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="lg:hidden space-y-4">
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Get started"}
          </Button>
        </div>

        {/* Error message positioned separately to not affect button layout */}
        {errors.email && (
          <p className="text-sm text-red-300 mt-2">{errors.email.message}</p>
        )}
      </form>

      <p className="text-sm text-amberwood-50">
        We care about your data in our{" "}
        <a
          href="/privacy-policy"
          className="underline hover:text-white transition-colors"
        >
          privacy policy
        </a>
        .
      </p>
    </div>
  );
}
