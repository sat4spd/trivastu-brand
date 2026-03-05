import CinematicHero from "@/components/hero/CinematicHero";
import StatsCounter from "@/components/home/StatsCounter";
import ScrollStorytelling from "@/components/home/ScrollStorytelling";
import AnimatedTimeline from "@/components/home/AnimatedTimeline";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import PortfolioGallery from "@/components/home/PortfolioGallery";
import InteractiveMap from "@/components/home/InteractiveMap";
import ConstructionJourney from "@/components/home/ConstructionJourney";
import ClientStories from "@/components/home/ClientStories";
import ServiceGateway from "@/components/home/ServiceGateway";
import SmartLeadCapture from "@/components/home/SmartLeadCapture";
import ChatAssistant from "@/components/ChatAssistant";
import ScrollReveal from "@/components/ScrollReveal";
import IntroLoader from "@/components/IntroLoader";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <CinematicHero />

      <ScrollReveal animation="fadeUp">
        <StatsCounter />
      </ScrollReveal>

      <ScrollReveal animation="blurIn">
        <ScrollStorytelling />
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.1}>
        <AnimatedTimeline />
      </ScrollReveal>

      <ScrollReveal animation="scaleUp">
        <ProjectShowcase />
      </ScrollReveal>

      <ScrollReveal animation="fadeUp">
        <PortfolioGallery />
      </ScrollReveal>

      <ScrollReveal animation="fadeLeft">
        <InteractiveMap />
      </ScrollReveal>

      <ScrollReveal animation="blurIn">
        <ConstructionJourney />
      </ScrollReveal>

      <ScrollReveal animation="fadeUp">
        <ClientStories />
      </ScrollReveal>

      <ScrollReveal animation="scaleUp">
        <ServiceGateway />
      </ScrollReveal>

      <ScrollReveal animation="fadeRight">
        <SmartLeadCapture />
      </ScrollReveal>

      <ChatAssistant />
    </>
  );
}
