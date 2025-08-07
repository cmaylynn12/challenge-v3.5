import { Flex, Button } from "@chakra-ui/react";

type HeaderProps = {
  onOpen: () => void;
};

export const Header = ({ onOpen }: HeaderProps) => {
  return (
    <Flex justify="flex-end">
      <Button onClick={onOpen}>Change details</Button>
    </Flex>
  );
};

export default Header;
