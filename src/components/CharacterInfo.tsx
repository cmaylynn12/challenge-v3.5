import { Character } from "@/types/Character";
import { FaCircle } from "react-icons/fa";
import {
  Dialog,
  Portal,
  CloseButton,
  Image,
  Box,
  Text,
  HStack,
  VStack,
  Badge,
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
    <Dialog.Root
      size="lg"
      open={true}
      placement="center"
      onInteractOutside={onClose}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content overflow="hidden">
            <Box background="linear-gradient(0deg, #a2ed3f, #d8ff007a)">
              <HStack gap="15px">
                <Image
                  src={selectedCharacter.image}
                  alt={`Image of ${selectedCharacter.name}`}
                />
                <VStack align="flex-start">
                  <Badge
                    colorPalette="green"
                    variant="solid"
                    textTransform="capitalize"
                  >
                    {selectedCharacter.species}
                  </Badge>
                  <Text
                    textStyle="3xl"
                    lineHeight="2.2rem"
                    className="bowlby-one-sc-regular "
                  >
                    {selectedCharacter.name}
                  </Text>
                  <HStack gap="6px" marginTop="-5px">
                    <FaCircle size="8px" color={statusColor} />
                    <Text
                      textStyle="sm"
                      fontWeight="600"
                      textTransform="capitalize"
                    >
                      {selectedCharacter.status} - {selectedCharacter.gender}
                    </Text>
                  </HStack>
                  <VStack align="flex-start" gap={0}>
                    <Text textStyle="sm" marginTop="12px" fontWeight="600">
                      Place of origin:
                    </Text>
                    <Text textStyle="sm" textTransform="capitalize">
                      {selectedCharacter.origin.name}
                    </Text>
                  </VStack>
                  <VStack align="flex-start" gap={0}>
                    <Text textStyle="sm" fontWeight="600">
                      Last known location:
                    </Text>
                    <Text textStyle="sm">
                      {selectedCharacter.location.name}
                    </Text>
                  </VStack>
                </VStack>
              </HStack>
            </Box>
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
