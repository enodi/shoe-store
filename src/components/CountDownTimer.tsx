import React from "react";
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
  const [flashSaleEndDate, setFlashSaleEndDate] = React.useState(THREE_DAYS);

  React.useEffect(() => {
    handleTimer();
    const interval=setInterval(()=>{
      handleTimer();
     }, 5000)
       
     return () => clearInterval(interval);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimer = () => {
    let remainingTime = localStorage.getItem("countdown");
    if (remainingTime === null) {
      localStorage.setItem("countdown", THREE_DAYS.toString());
    } else if (Number(remainingTime) > 0) {
      const flashSaleDate = Number(remainingTime) - 5000;
      localStorage.setItem("countdown", flashSaleDate.toString());
      setFlashSaleEndDate(flashSaleDate);
    }
  }

  return (
    <Countdown date={Date.now() + flashSaleEndDate} renderer={renderer}/>
  );
}

export default CountDownTimer;