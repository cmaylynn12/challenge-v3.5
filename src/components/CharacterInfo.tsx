import { Character } from "@/types/Character";
import { FaCircle } from "react-icons/fa";
import {
  Dialog,
  Portal,
  Flex,
  CloseButton,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";

type CharacterInfoProps = {
  selectedCharacter: Character;
  onClose: () => void;
};

export const CharacterInfo = ({
  selectedCharacter,
  onClose,
}: CharacterInfoProps) => {
  let statusColor = undefined;

  switch (selectedCharacter.status.toLocaleLowerCase()) {
    case "alive":
      statusColor = "green";
      break;
    case "dead":
      statusColor = "red";
      break;
  }

  return (
    <Dialog.Root open={true} placement="center" onInteractOutside={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content overflow="hidden">
            <Flex gap={5} alignItems="center">
              <Flex>
                <Image
                  objectFit="cover"
                  maxW="200px"
                  src={selectedCharacter.image}
                  alt={`Image of ${selectedCharacter.name}`}
                />
              </Flex>
              <Box as="ul">
                <Text
                  as="li"
                  textStyle="4xl"
                  fontFamily="fantasy"
                  lineHeight="2.2rem"
                >
                  {selectedCharacter.name}
                </Text>
                <Flex alignItems="center" gap="8px" marginTop="8px">
                  <FaCircle size="8px" color={statusColor} />

                  <Text as="li" textStyle="md" fontWeight="600">
                    {selectedCharacter.status} - {selectedCharacter.species} -{" "}
                    {selectedCharacter.gender}
                  </Text>
                </Flex>

                <Text as="li" textStyle="sm" marginTop="12px" fontWeight="600">
                  Last known location:
                </Text>
                <Text as="li" textStyle="lg">
                  {selectedCharacter.location.name}
                </Text>
              </Box>
            </Flex>
            <Dialog.CloseTrigger asChild onClick={onClose}>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CharacterInfo;
