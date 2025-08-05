import LandingSection from "@/service/LandingSection";
import LandingPage from "@/components/LandingPage";
import GenreSection from "@/components/GenreSection";
import PopularBooks from "@/components/PopularBooks";
import { Testimonial } from "@/components/Testimonials";
import Purpose from "@/components/Purpose";

export default function Home() {
  return (
    <main>
      <LandingSection>
        <LandingPage />
      </LandingSection>

      <LandingSection>
        <GenreSection />
      </LandingSection>

      <LandingSection>
        <PopularBooks />
      </LandingSection>

      <LandingSection>
        <Testimonial />
      </LandingSection>

      <LandingSection>
        <Purpose />
      </LandingSection>
    </main>
  );
}
