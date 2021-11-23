import Countdown from 'react-countdown';
import Alert from "./Alert";

interface Props {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const renderer: React.FC<Props> = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Alert title={"Flash sale completed!  🎉🎉🎉🎉🎉"} status={"success"}/>;
  } else {
    return <Alert title={`${days}day(s) ${hours}hours ${minutes}mins ${seconds}seconds left`}/>;
  }
};


const CountDownTimer = () => {
  const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
  return (
    <Countdown date={Date.now() + THREE_DAYS} renderer={renderer}/>
  );
}

export default CountDownTimer;