import { useState } from "react";

interface UseNewsletterSubscriptionProps {
  source?: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  onDuplicate?: (message: string) => void;
}

interface SubscriptionState {
  isSubmitting: boolean;
  status: "idle" | "success" | "error" | "duplicate";
  message: string;
}

export function useNewsletterSubscription({
  source = "website",
  onSuccess,
  onError,
  onDuplicate,
}: UseNewsletterSubscriptionProps = {}) {
  const [state, setState] = useState<SubscriptionState>({
    isSubmitting: false,
    status: "idle",
    message: "",
  });

  const subscribe = async (email: string) => {
    setState((prev) => ({ ...prev, isSubmitting: true, status: "idle" }));

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setState({
          isSubmitting: false,
          status: "success",
          message: result.message,
        });
        onSuccess?.(result.message);
      } else {
        if (result.error === "duplicate") {
          setState({
            isSubmitting: false,
            status: "duplicate",
            message: result.message,
          });
          onDuplicate?.(result.message);
        } else {
          const errorMessage =
            result.error || "Something went wrong. Please try again.";
          setState({
            isSubmitting: false,
            status: "error",
            message: errorMessage,
          });
          onError?.(errorMessage);
        }
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      const errorMessage = "Something went wrong. Please try again.";
      setState({
        isSubmitting: false,
        status: "error",
        message: errorMessage,
      });
      onError?.(errorMessage);
    }
  };

  const reset = () => {
    setState({
      isSubmitting: false,
      status: "idle",
      message: "",
    });
  };

  return {
    subscribe,
    reset,
    isSubmitting: state.isSubmitting,
    status: state.status,
    message: state.message,
  };
}
