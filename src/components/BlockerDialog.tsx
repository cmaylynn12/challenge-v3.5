import AuthContext from "@/contexts/AuthWrapper";
import {
  Button,
  CloseButton,
  Dialog,
  Input,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

type BlockerDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const BlockerDialog = ({ isOpen, setIsOpen }: BlockerDialogProps) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [jobTitleInput, setJobTitleInput] = useState("");

  const { username, jobTitle, setUserInfo } = useContext(AuthContext);

  // Load localStorage values just once (avoid flashing Dialog due to hydration)
  // Another option to use solely username and jobTitle from the context is the add a flag for isHydrated before loading the dialog
  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    const jobTitle = localStorage.getItem("jobTitle") || "";

    if (!username || !jobTitle) {
      setIsOpen(true);
    } else {
      setUsernameInput(username);
      setJobTitleInput(jobTitle);
    }
  }, [setIsOpen]);

  const handleSave = () => {
    // Potential to add stronger validation here i.e. length, sanitisation, checking against actual jobs
    // On that, the number of jobs could be endless, it would be a better idea to use a dropdown and draw values from an endpoint for users to select
    setUserInfo(usernameInput, jobTitleInput);
    setIsOpen(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSave();
    }
  };

  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      open={isOpen}
      placement="center"
    >
      {/* Dialog component from Chakra UI */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title className="bowlby-one-sc-regular" textStyle="2xl">
                {username && jobTitle
                  ? "Change your details"
                  : "Please enter your details to continue viewing"}
              </Dialog.Title>
              {username && jobTitle && (
                <Dialog.CloseTrigger asChild onClick={() => setIsOpen(false)}>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              )}
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap="15px">
                <Input
                  value={usernameInput}
                  placeholder="Enter your username"
                  onChange={(e) => setUsernameInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Input
                  value={jobTitleInput}
                  placeholder="Enter your job title"
                  onChange={(e) => setJobTitleInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                onClick={handleSave}
                disabled={!usernameInput || !jobTitleInput}
              >
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default BlockerDialog;
