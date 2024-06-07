/* eslint-disable @typescript-eslint/no-unused-vars */
import RelativeTimeElement from "@github/relative-time-element";
import { FunctionComponent } from "react";

interface RelativeTimeComponentProps {
  datetime?: string;
  lang?: string;
}

const RelativeTimeComponent: FunctionComponent<RelativeTimeComponentProps> = (
  props
) => {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const _relative = RelativeTimeElement;

  return (
    <div>
      {/*ts-ignore*/}
      <relative-time {...props}></relative-time>
    </div>
  );
};

export default RelativeTimeComponent;
