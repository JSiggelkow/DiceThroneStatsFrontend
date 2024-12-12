import { Select, SelectItem } from "@nextui-org/select";
import { Avatar } from "@nextui-org/avatar";
import { useState } from "react";

import { PlayerSelection } from "@/types/models";

interface HeroSelectionProps {
  heroCards: {
    key: number;
    name: string;
    season: number;
    difficulty: number;
    imageName: string;
  }[];
  label: string;
  handleHeroSelectionChangeAction: (selection: PlayerSelection) => void;
  player: number;
  disabledKeys: string[];
}

export default function HeroSelection({
  heroCards,
  label,
  handleHeroSelectionChangeAction,
  player,
  disabledKeys,
}: Readonly<HeroSelectionProps>) {
  const [selectedHero, setSelectedHero] = useState<number[]>([]);

  const handleHeroSelectionChange = (selection: Set<number>) => {
    const selectedArray = Array.from(selection);

    setSelectedHero(selectedArray);

    if (selectedArray.length === 0) {
      handleHeroSelectionChangeAction({
        heroId: 0,
        player: player,
      });

      return;
    }

    handleHeroSelectionChangeAction({
      heroId: selectedArray[0],
      player: player,
    });
  };

  return (
    <div className="flex flex-row max-w-xs w-full">
      <Select
        className="max-w-xs"
        classNames={{
          label: "group-data-[filled=true]:-translate-y-5",
          trigger: "min-h-16",
          listboxWrapper: "max-h-[400px]",
        }}
        disabledKeys={disabledKeys}
        items={heroCards}
        label={label}
        listboxProps={{
          itemClasses: {
            base: [
              "rounded-md",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        popoverProps={{
          classNames: {
            base: "before:bg-default-200",
            content: "p-0 border-divider",
          },
        }}
        renderValue={(items) => {
          return items.map((hero) => (
            <div key={hero.key} className="flex items-center gap-2">
              <Avatar
                alt={hero.data!.name}
                className="flex-shrink-0"
                size="sm"
                src={`/heroes/${hero.data!.imageName}.png`}
              />
              <div className="flex flex-col">
                <span>{hero.data!.name}</span>
                <span className="text-default-500 text-tiny">
                  {hero.data!.season}
                </span>
              </div>
            </div>
          ));
        }}
        selectedKeys={new Set(selectedHero)}
        onSelectionChange={(selected) =>
          handleHeroSelectionChange(selected as Set<number>)
        }
      >
        {(hero) => (
          <SelectItem key={hero.key} textValue={hero.name}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={hero.name}
                className="flex-shrink-0"
                size="sm"
                src={`/heroes/${hero.imageName}.png`}
              />
              <div className="flex flex-col">
                <span className="text-small">{hero.name}</span>
                <span className="text-tiny text-default-400">
                  {hero.season}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  );
}
