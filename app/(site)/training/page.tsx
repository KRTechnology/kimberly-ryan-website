import TrainingHero from "@/components/specific/training-hero";
import TrainingDesignedFor from "@/components/specific/training-designed-for";
import TrainingProgramOutline from "@/components/specific/training-program-outline";
import TrainingEventDetails from "@/components/specific/training-event-details";
import TrainingProgrammeFees from "@/components/specific/training-programme-fees";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import { getLatestTraining } from "@/lib/sanity";
import { Training } from "@/types/sanity";

// Enable ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

export default async function TrainingPage() {
  const trainingData: Training | null = await getLatestTraining();

  if (!trainingData) {
    return (
      <div className="min-h-[calc(100vh-570px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-600 mb-4">
            No Training Available
          </h1>
          <p className="text-gray-500">
            Please check back later for upcoming training programs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <TrainingHero trainingData={trainingData} />
      <TrainingDesignedFor trainingData={trainingData} />
      <TrainingProgramOutline trainingData={trainingData} />
      <TrainingEventDetails trainingData={trainingData} />
      <TrainingProgrammeFees trainingData={trainingData} />
      <NewsletterSubscription />
    </>
  );
}
