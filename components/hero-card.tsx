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

  return (
    <Card className="py-4 inline-flex hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{name}</h4>
        <small className="text-default-500">Season: {season}</small>
        <small className="text-default-500">Difficulty: {difficulty}</small>
        <small className="text-default-500">Games: {games}</small>
      </CardHeader>
      <CardBody className={"overflow-visible py-2"}>
        <Image
          alt="Hero card image"
          className={"object-fill rounded-xl"}
          height={200}
          src={`/heroes/${imageName}.png`}
          width={200}
        />
      </CardBody>
    </Card>
  );
};

export default HeroCard;
