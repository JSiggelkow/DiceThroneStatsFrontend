"use client";

import { useEffect, useState } from "react";

import { HeroCardModel } from "@/types/models";
import HeroCard from "@/components/hero-card";
import HeroCardSelection from "@/components/hero-card-selection";

export default function Heroes() {
  const [heroCards, setHeroCards] = useState<HeroCardModel[]>([]);
  const [filteredHeroCards, setFilteredHeroCards] = useState<HeroCardModel[]>(
    [],
  );
  const [seasonFilter, setSeasonFilter] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/hero/cards", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      setHeroCards(data);
      setFilteredHeroCards(data);
    };

    fetchData().then();
  }, []);

  const filterHeroCards = (
    seasonSelection: string[],
    difficultySelection: string[],
    sortBy: string[],
  ) => {
    const filtered = heroCards.filter((hero) => {
      const seasonMatches =
        seasonSelection.length === 0 ||
        seasonSelection.includes("0") ||
        seasonSelection.includes(hero.season.toString());

      const difficultyMatches =
        difficultySelection.length === 0 ||
        difficultySelection.includes("0") ||
        difficultySelection.includes(hero.difficulty.toString());

      return seasonMatches && difficultyMatches;
    });

    const sorted = filtered.toSorted((a, b) => a.season - b.season);

    if (sortBy.at(0) === "1") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy.at(0) === "2") {
      sorted.sort((a, b) => a.difficulty - b.difficulty);
    }

    setFilteredHeroCards(sorted);
  };

  const handleSeasonFilterChange = (selection: string[]) => {
    setSeasonFilter(selection);
    filterHeroCards(selection, difficultyFilter, sortBy);
  };

  const handleDifficultyFilterChange = (selection: string[]) => {
    setDifficultyFilter(selection);
    filterHeroCards(seasonFilter, selection, sortBy);
  };

  const handleSortByChange = (selection: string[]) => {
    setSortBy(selection);
    filterHeroCards(seasonFilter, difficultyFilter, selection);
  };

  const handleResetChange = () => {
    setSeasonFilter([]);
    setDifficultyFilter([]);
    setSortBy(["0"]);

    filterHeroCards([], [], ["0"]);
  };

  return (
    <div className="flex flex-col">
      <HeroCardSelection
        handleDifficultyFilterChangeAction={handleDifficultyFilterChange}
        handleResetChangeAction={handleResetChange}
        handleSeasonFilterChangeAction={handleSeasonFilterChange}
        handleSortByChangeAction={handleSortByChange}
      />

      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 gap-4">
        {filteredHeroCards.map((heroCard: HeroCardModel) => (
          <HeroCard
            key={heroCard.name}
            difficulty={heroCard.difficulty}
            games={heroCard.games}
            name={heroCard.name}
            season={heroCard.season}
          />
        ))}
      </div>
    </div>
  );
}
