"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { Button } from "@nextui-org/button";

import { heroCardSelection } from "@/config/site";

interface HeroCardSelectionProps {
  handleSeasonFilterChangeAction: (selection: string[]) => void;
  handleDifficultyFilterChangeAction: (selection: string[]) => void;
  handleSortByChangeAction: (selection: string[]) => void;
  handleResetChangeAction: () => void;
}

export default function HeroCardSelection({
  handleSeasonFilterChangeAction,
  handleDifficultyFilterChangeAction,
  handleSortByChangeAction,
  handleResetChangeAction,
}: Readonly<HeroCardSelectionProps>) {
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedSortBy, setSelectedSortBy] = useState<string[]>(["0"]);

  const handleSelectionSeasonChange = (selection: Set<string>) => {
    const selectionArray = Array.from(selection);

    if (selectedSeasons.includes("0")) {
      selectionArray.splice(selectionArray.indexOf("0"), 1);
      setSelectedSeasons(selectionArray);
      handleSeasonFilterChangeAction(selectionArray);
    } else if (!selectedSeasons.includes("0") && selectionArray.includes("0")) {
      setSelectedSeasons(["0"]);
      handleSeasonFilterChangeAction(["0"]);
    } else {
      setSelectedSeasons(selectionArray);
      handleSeasonFilterChangeAction(selectionArray);
    }
  };

  const handleSelectionDifficultyChange = (selection: Set<string>) => {
    const selectionArray = Array.from(selection);

    if (selectedDifficulty.includes("0")) {
      selectionArray.splice(selectionArray.indexOf("0"), 1);
      setSelectedDifficulty(selectionArray);
      handleDifficultyFilterChangeAction(selectionArray);
    } else if (
      !selectedDifficulty.includes("0") &&
      selectionArray.includes("0")
    ) {
      setSelectedDifficulty(["0"]);
      handleDifficultyFilterChangeAction(["0"]);
    } else {
      setSelectedDifficulty(selectionArray);
      handleDifficultyFilterChangeAction(selectionArray);
    }
  };

  const handleSortByChange = (selection: Set<string>) => {
    const selectionArray = Array.from(selection);

    setSelectedSortBy(selectionArray);

    handleSortByChangeAction(selectionArray);
  };

  const handleResetChange = () => {
    setSelectedSortBy(["0"]);
    setSelectedSeasons([]);
    setSelectedDifficulty([]);
    handleResetChangeAction();
  };

  return (
    <div className="mb-4 flex sm:flex-row flex-col items-center">
      {/*Sort by selection*/}
      <Select
        className="max-w-xs p-2"
        label="Sort by"
        placeholder="Select a sort by"
        selectedKeys={new Set(selectedSortBy)}
        onSelectionChange={(selected) =>
          handleSortByChange(selected as Set<string>)
        }
      >
        {heroCardSelection.heroCardSortBy.map((sortBy) => (
          <SelectItem key={sortBy.key}>{sortBy.label}</SelectItem>
        ))}
      </Select>
      {/*Season selection*/}
      <Select
        className="max-w-xs p-2"
        label="Season"
        placeholder="Select a season"
        selectedKeys={new Set(selectedSeasons)}
        selectionMode="multiple"
        onSelectionChange={(selected) =>
          handleSelectionSeasonChange(selected as Set<string>)
        }
      >
        {heroCardSelection.heroCardSelectionSeason.map((season) => (
          <SelectItem key={season.key}>{season.label}</SelectItem>
        ))}
      </Select>
      {/*Difficulty selection*/}
      <Select
        className="max-w-xs p-2"
        label="Difficulty"
        placeholder="Select a difficulty"
        selectedKeys={new Set(selectedDifficulty)}
        selectionMode="multiple"
        onSelectionChange={(selected) =>
          handleSelectionDifficultyChange(selected as Set<string>)
        }
      >
        {heroCardSelection.heroCardSelectionDifficulty.map((difficulty) => (
          <SelectItem key={difficulty.key}>{difficulty.label}</SelectItem>
        ))}
      </Select>
      {/*Reset button*/}
      <Button
        className="ml-2 p-2 max-w-xs dark:bg-amber-500 dark:text-black"
        size="lg"
        variant="solid"
        onPress={handleResetChange}
      >
        Reset
      </Button>
    </div>
  );
}
