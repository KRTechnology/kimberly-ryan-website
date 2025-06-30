"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/common/button";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNewsletterSubscription } from "@/hooks/useNewsletterSubscription";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/common/form";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

interface NewsletterSubscriptionFormProps {
  privacyTextColor?: string;
  source?: string;
}

export default function NewsletterSubscriptionForm({
  privacyTextColor = "text-amberwood-50",
  source = "website_hero",
}: NewsletterSubscriptionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    subscribe,
    isSubmitting,
    status,
    message,
    reset: resetSubscription,
  } = useNewsletterSubscription({
    source,
    onSuccess: () => {
      form.reset(); // Reset form on success
    },
  });

  const onSubmit = async (data: FormData) => {
    await subscribe(data.email);
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Desktop: Side by side layout */}
          <div className="hidden lg:flex lg:gap-4 lg:items-start">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isSubmitting ? "Subscribing..." : "Get started"}
            </Button>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="lg:hidden space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isSubmitting ? "Subscribing..." : "Get started"}
            </Button>
          </div>

          {/* Error message */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormMessage className="text-red-300" />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Status Messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-lg bg-green-900/20 border border-green-500/30 flex items-center gap-2"
          >
            <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
            <span className="text-green-200 text-sm">{message}</span>
          </motion.div>
        )}

        {status === "duplicate" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-lg bg-yellow-900/20 border border-yellow-500/30 flex items-center gap-2"
          >
            <CheckCircle size={16} className="text-yellow-400 flex-shrink-0" />
            <span className="text-yellow-200 text-sm">{message}</span>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-lg bg-red-900/20 border border-red-500/30 flex items-center gap-2"
          >
            <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
            <span className="text-red-200 text-sm">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <p className={`text-sm ${privacyTextColor}`}>
        We care about your data in our{" "}
        <a
          href="/privacy-policy"
          className="underline hover:opacity-80 transition-opacity"
        >
          privacy policy
        </a>
        .
      </p>
    </div>
  );
}
