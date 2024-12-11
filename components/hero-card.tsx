import React from "react";
import Image from "next/image";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { HeroCardModel } from "@/types/models";

const HeroCard: React.FC<HeroCardModel> = ({
  season,
  name,
  games,
  difficulty,
}) => {
  const imageName = name.replace(/ /g, "-");

  let seasonName;

  switch (season) {
    case 1:
      seasonName = "One";
      break;
    case 2:
      seasonName = "Two";
      break;
    case 3:
      seasonName = "Marvel";
      break;
    case 4:
      seasonName = "Christmas";
  }

  return (
    <Card className="py-4 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out flex flex-row md:flex-col h-32 md:h-auto">
      <CardHeader className="pb-0 pt-2 px-4 flex-grow flex-col items-start w-auto md:w-full">
        <h4 className="font-bold text-large">{name}</h4>
        <small className="text-default-500">Season: {seasonName}</small>
        <small className="text-default-500">Difficulty: {difficulty}</small>
        <small className="text-default-500">Games: {games}</small>
      </CardHeader>
      <CardBody className="overflow-visible pb-0 pt-2 px-4 flex justify-center">
        <Image
          alt="Hero card image"
          className="object-cover md:rounded-xl rounded-full h-20 w-20 md:h-full md:w-full ml-auto"
          height={0}
          src={`/heroes/${imageName}.png`}
          width={200}
        />
      </CardBody>
    </Card>
  );
};

export default HeroCard;
