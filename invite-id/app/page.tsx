import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import KoleksiSection from '@/components/sections/KoleksiSection'
import LayananSection from '@/components/sections/LayananSection'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function Home() {
  return (
    <>
      <div id="kontak" />
      <Header />
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <KoleksiSection />
      <LayananSection />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
