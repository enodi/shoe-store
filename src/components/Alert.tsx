import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from "@chakra-ui/react"

interface Props {
  handleOnClick?: () => void;
  title: string;
  description?: string;
  status?: "success" | "warning" | "error" | "info";
  closeButton?: boolean;
}

const AlertComponent:React.FC<Props> = ({
  handleOnClick,
  title,
  description,
  status = "info",
  closeButton = false
}) => (
  <Alert status={status} sx={{mb: 10}}>
    <AlertIcon />
    <AlertTitle mr={2}>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
    {closeButton && <CloseButton position="absolute" right="8px" top="8px" onClick={handleOnClick}/>}
  </Alert>
)

export default AlertComponent;
