import CompanionCard from "../components/companion-card"; 
import CompanionsList from "../components/companionsList";
import CTA from "../components/CTA";
import { recentSessions } from "../constants";
export default function Home() {
  return (
    <main>
      <h1 className="text-2xl underline">
       Popular companions
       
      </h1>
      <section className="home-section">
         <CompanionCard 
        id="123"
        name="Neura the Brainy Explorer"
        topic="Neural Network of the Brain"
        subject="science"
        duration={45}
        color="#ffda6e"
        />
        <CompanionCard 
        id="456"
        name="Countsy the number wizard"
        topic="Derivative and Integrals"
        subject="Maths"
        duration={30}
        color="#e5d0ff"
        />
        <CompanionCard 
        id="789"
        name="Verba the Vocabulary Builder"
        topic="language"
        subject="English Literature"
        duration={45}
        color="#ffda6e"
        />
       
        
      </section>
      <section className="home-section">
        <CompanionsList
        title="Recently completed sessions"
        companions={recentSessions}
        classNames="w-2/3 max-lg:w-full"
         />
        <CTA />
      </section>

    </main>
  );
}