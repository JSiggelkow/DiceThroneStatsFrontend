import { useState } from "react";

import { heroCardSelection } from "@/config/site";
import HeroSelection from "@/components/hero-selection";
import { PlayerSelection } from "@/types/models";

export default function HeroSelectionBar() {
  const [playerSelections, setPlayerSelections] = useState<PlayerSelection[]>(
    [],
  );

  const heroes = heroCardSelection.heroCards;

  const handleHeroSelectionChange = (selection: PlayerSelection) => {
    setPlayerSelections((prevSelections) => {
      const playerIndex = prevSelections.findIndex(
        (sel) => sel.player === selection.player,
      );

      if (selection.heroId === 0) {
        if (playerIndex !== -1) {
          const updatedSelections = [...prevSelections];

          updatedSelections.splice(playerIndex, 1);

          return updatedSelections;
        }

        return prevSelections;
      }

      if (playerIndex !== -1) {
        const updatedSelections = [...prevSelections];

        updatedSelections[playerIndex] = selection;

        return updatedSelections;
      }

      return [...prevSelections, selection];
    });
  };

  return (
    <div className="flex sm:flex-row flex-col items-center mb-4 gap-4">
      <HeroSelection
        disabledKeys={playerSelections
          .filter((sel) => sel.player != 1)
          .map((sel) => sel.heroId.toString())}
        handleHeroSelectionChangeAction={handleHeroSelectionChange}
        heroCards={heroes}
        label={"Player One"}
        player={1}
      />
      <HeroSelection
        disabledKeys={playerSelections
          .filter((sel) => sel.player != 2)
          .map((sel) => sel.heroId.toString())}
        handleHeroSelectionChangeAction={handleHeroSelectionChange}
        heroCards={heroes}
        label={"Player Two"}
        player={2}
      />
    </div>
  );
}
