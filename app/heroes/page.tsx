import { HeroCardModel } from "@/types/models";
import HeroCard from "@/components/hero-card";

export default async function Heroes() {
  const data = await fetch("http://localhost:8080/hero/cards");
  const heroCards = await data.json();

  return (
    <div className="grid grid-cols-5 gap-4">
      {heroCards.map((heroCard: HeroCardModel) => (
        <HeroCard
          key={heroCard.name}
          difficulty={heroCard.difficulty}
          games={heroCard.games}
          name={heroCard.name}
          season={heroCard.season}
        />
      ))}
    </div>
  );
}
