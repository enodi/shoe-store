import React from "react";
import {Box} from "@chakra-ui/react";
import Alert from "./Alert";
import CountDownTimer from "./CountDownTimer";

interface Props {
  connectionError: boolean;
  hideAlert: () => void;
}

const TopSection: React.FC<Props> = ({connectionError, hideAlert}) => (
  <Box sx={{margin: "50px auto 0", maxW: "1200px"}}>
    <CountDownTimer />
    {connectionError && (
      <Alert
        handleOnClick={hideAlert}
        title="Network Error!"
        description="A network error occurred. Please try reconnecting again"
        status="error"
        closeButton={true}
      />
    )}
  </Box>
);

export default TopSection;
