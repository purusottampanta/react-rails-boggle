// @flow

export Props = {
  seconds: number,
  minutes: number,
  hours: number,
  limit?: string,
  autoStart?: boolean,
  withLoop?: boolean,
  onChange?: () => void,
  onCallback: () => void,
  render: any,
  children: any,
};

export State = {
  text: string,
  stateHours: number,
  stateMinutes: number,
  stateSeconds: number,
};
