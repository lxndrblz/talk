import React, { FunctionComponent, ReactNode } from "react";
import Responsive, { MediaQueryMatchers } from "react-responsive";

import { UIContext } from "coral-ui/components/v2";
import breakpoints from "coral-ui/theme/breakpoints";
import { PropTypesOf } from "coral-ui/types";

type Breakpoints = keyof typeof breakpoints;

interface Props {
  /** greater than or equal width. */
  gteWidth?: Breakpoints;

  /** greater than width. */
  gtWidth?: Breakpoints;

  /** less than equals width. */
  lteWidth?: Breakpoints;

  /** less than equals width. */
  ltWidth?: Breakpoints;

  /** greater than or equal device width. */
  gteDeviceWidth?: Breakpoints;

  /** greater than device width. */
  gtDeviceWidth?: Breakpoints;

  /** less than equals device width. */
  lteDeviceWidth?: Breakpoints;

  /** less than equals device width. */
  ltDeviceWidth?: Breakpoints;

  children: ReactNode | ((matches: boolean) => React.ReactNode);
  className?: string;
  component?:
    | string
    | React.SFC<any>
    | React.ClassType<any, any, any>
    | React.ComponentClass<any>;
  all?: boolean;
  print?: boolean;
  screen?: boolean;
  speech?: boolean;
  values?: Partial<MediaQueryMatchers>;
}

export const MatchMedia: FunctionComponent<Props> = (props) => {
  const {
    speech,
    gteWidth,
    gtWidth,
    lteWidth,
    ltWidth,
    gteDeviceWidth,
    gtDeviceWidth,
    lteDeviceWidth,
    ltDeviceWidth,
    ...rest
  } = props;
  const mapped = {
    // TODO: Temporarily map newer speech to older aural type until
    // react-responsive supports the speech prop.
    aural: speech,
    minWidth: gtWidth
      ? breakpoints[gtWidth] + 1
      : gteWidth
      ? breakpoints[gteWidth]
      : undefined,
    maxWidth: ltWidth
      ? breakpoints[ltWidth] - 1
      : lteWidth
      ? breakpoints[lteWidth]
      : undefined,
    minDeviceWidth: gtDeviceWidth
      ? breakpoints[gtDeviceWidth] + 1
      : gteDeviceWidth
      ? breakpoints[gteDeviceWidth]
      : undefined,
    maxDeviceWidth: ltDeviceWidth
      ? breakpoints[ltDeviceWidth] - 1
      : lteDeviceWidth
      ? breakpoints[lteDeviceWidth]
      : undefined,
  };
  return <Responsive {...rest} {...mapped} />;
};

const MatchMediaWithContext: FunctionComponent<Props> = (props) => (
  <UIContext.Consumer>
    {({ mediaQueryValues }) => (
      <MatchMedia {...props} values={mediaQueryValues} />
    )}
  </UIContext.Consumer>
);

export default MatchMediaWithContext;
export type MatchMediaProps = PropTypesOf<typeof MatchMediaWithContext>;
