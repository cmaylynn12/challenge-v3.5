import AuthContext from "@/contexts/AuthWrapper";
import { Flex, Image, Text, Avatar, defineStyle } from "@chakra-ui/react";
import { useContext, useId } from "react";
import { Tooltip } from "./ui/tooltip";

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
  const id = useId();

  return (
    <Flex
      justify="space-between"
      padding="20px"
      background="linear-gradient(#6c00e1, #8d04c5 100px)"
    >
      <Image src="/rick-and-morty.svg" w="200px" alt="Rick and Morty Logo" />
      <Flex alignItems="center" gap="16px">
        {username && jobTitle && (
          <>
            <Text
              color="#FFF"
              fontWeight="600"
              className="lacquer-regular"
            >{`Hi, ${username} the ${jobTitle}`}</Text>
            <Tooltip
              ids={{ trigger: id }}
              content="Click to change details"
              openDelay={0}
              closeDelay={0}
            >
              <Avatar.Root
                as="button"
                tabIndex={0}
                ids={{ root: id }}
                css={ringCss}
                size="lg"
                onClick={onOpen}
                variant="solid"
                colorPalette="cyan"
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{
                  cursor: "pointer",
                }}
              >
                <Avatar.Fallback name={username || "user"} />
              </Avatar.Root>
            </Tooltip>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
