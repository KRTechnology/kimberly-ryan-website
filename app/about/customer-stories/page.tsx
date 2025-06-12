import CustomerStoriesHero from "@/components/specific/customer-stories-hero";

export default function CustomerStoriesPage() {
  return (
    <>
      <CustomerStoriesHero />

      {/* Placeholder for additional testimonials content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold font-plex mb-6">
              More testimonials content coming soon...
            </h2>
            <p className="text-gray-600">
              This section will contain the actual customer testimonials and
              stories.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
