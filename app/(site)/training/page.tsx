import TrainingHero from "@/components/specific/training-hero";
import TrainingDesignedFor from "@/components/specific/training-designed-for";
import TrainingProgramOutline from "@/components/specific/training-program-outline";

// Enable ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

export default function TrainingPage() {
  return (
    <>
      <TrainingHero />
      <TrainingDesignedFor />
      <TrainingProgramOutline />
    </>
  );
}
