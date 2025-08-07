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

const BlockerDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [jobTitleInput, setJobTitleInput] = useState("");

  const { username, jobTitle, setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const jobTitleInput = localStorage.getItem("jobTitle");

    if (!username || !jobTitleInput) {
      setIsOpen(true);
    }
  });
  const handleSave = () => {
    setUserInfo(usernameInput, jobTitleInput);
    setIsOpen(false);
  };

  return (
    <Dialog.Root motionPreset="slide-in-bottom" open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                Please enter your details to continue viewing
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap="15px">
                <Input
                  value={usernameInput}
                  placeholder="Enter your username"
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
                <Input
                  value={jobTitleInput}
                  placeholder="Enter your job title"
                  onChange={(e) => setJobTitleInput(e.target.value)}
                />
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={handleSave}>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default BlockerDialog;
