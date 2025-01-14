import React from "react";
import { MediaQueryMatchers } from "react-responsive";
import { Formatter } from "react-timeago";

import { ClickFarAwayRegister } from "../ClickOutside";

export interface UIContextProps {
  /** Allows to integrate translated strings into `RelativeTime` Component */
  timeagoFormatter?: Formatter | null;
  /** Allows testing `MatchMedia` by setting media query values */
  mediaQueryValues?: Partial<MediaQueryMatchers>;
  /**
   * A way to listen for clicks that are e.g. outside of the
   * current frame for `ClickOutside`
   */
  registerClickFarAway?: ClickFarAwayRegister;

  locales?: string[];

  /**
   * This is the target window, where our React Elements are rendered to.
   * This could be different than the global `window` object when we render
   * to a Portal which lives in a another frame.
   */
  renderWindow: Window;
}

const UIContext = React.createContext<UIContextProps>({} as any);

export const useUIContext = () => React.useContext(UIContext);

export default UIContext;
