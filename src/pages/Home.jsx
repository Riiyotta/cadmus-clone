import Hero from '../components/Hero.jsx'
import Intro from '../components/Intro.jsx'
import Experience from '../components/Experience.jsx'
import ConnectedProducts from '../components/ConnectedProducts.jsx'
import WhyChoose from '../components/WhyChoose.jsx'
import ImpactCounter from '../components/ImpactCounter.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import RoiCard from '../components/RoiCard.jsx'
import FeaturedVideo from '../components/FeaturedVideo.jsx'
import TwoColumnRows from '../components/TwoColumnRows.jsx'
import SolutionCards from '../components/SolutionCards.jsx'
import Integrations from '../components/Integrations.jsx'
import CaseStudy from '../components/CaseStudy.jsx'
import Careers from '../components/Careers.jsx'
import Chronicle from '../components/Chronicle.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Experience />
      <ConnectedProducts />
      <WhyChoose />
      <ImpactCounter />
      <LogoMarquee />
      <RoiCard />
      <FeaturedVideo />
      <TwoColumnRows />
      <SolutionCards />
      <Integrations />
      <CaseStudy />
      <Careers />
      <Chronicle />
    </>
  )
}
