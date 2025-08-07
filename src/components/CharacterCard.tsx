import { Character } from "@/types/Character";
import { Card, Image } from "@chakra-ui/react";
import { useState } from "react";
import CharacterInfo from "./CharacterInfo";

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card.Root
        maxH="120px"
        maxW="120px"
        overflow="hidden"
        key={`character-${character.name}`}
        onClick={() => setIsOpen(true)}
        boxShadow="5px 5px 1px 1px #141414"
        border="2px solid #141414"
        borderRadius="md"
        bg="white"
        transition="transform 0.2s, box-shadow 0.2s"
        _hover={{
          transform: "scale(0.95)",
          cursor: "pointer",
        }}
      >
        <Image src={character.image} />
      </Card.Root>
      {isOpen && (
        <CharacterInfo
          selectedCharacter={character}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default CharacterCard;
