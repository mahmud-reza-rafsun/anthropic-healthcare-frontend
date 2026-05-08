import Courses from "@/components/section/Courses/Courses";
import FaqSection from "@/components/section/FaqSection/FaqSection";
import HappyPatients from "@/components/section/FeedBackSection/HappyPatients ";
import { HeroSection } from "@/components/section/HeroSectoon/HeroSectoon";
import OutDoctor from "@/components/section/OutDoctor/OutDoctor";
export const dynamic = "force-dynamic";


export default async function Home() {
  return (
    <main>
      <HeroSection />
      <Courses />
      <OutDoctor />
      <HappyPatients />
      <FaqSection />
    </main>
  );
}
