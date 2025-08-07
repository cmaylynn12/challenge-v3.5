import AuthContext from "@/contexts/AuthWrapper";
import { Flex, Image, Text, Avatar, defineStyle } from "@chakra-ui/react";
import { useContext } from "react";

type HeaderProps = {
  onOpen: () => void;
};

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "#c3ed3f",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

export const Header = ({ onOpen }: HeaderProps) => {
  const { username, jobTitle } = useContext(AuthContext);

  return (
    <Flex justify="space-between" padding="20px" background="#9a3eaa">
      <Image src="/rick-and-morty.svg" w="200px" />
      <Flex alignItems="center" gap="16px">
        {username && jobTitle && (
          <>
            <Text
              color="#FFF"
              fontWeight="600"
            >{`Hi, ${username} the ${jobTitle}`}</Text>
            <Avatar.Root
              css={ringCss}
              size="lg"
              onClick={onOpen}
              variant="solid"
              colorPalette="purple"
            >
              <Avatar.Fallback name={username || "user"} />
            </Avatar.Root>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
