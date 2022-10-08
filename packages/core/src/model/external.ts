import { BookElements } from "./elements";
import { TokenGetter } from "./model";

export type ExternalProps = BookElements["external"]["props"];
export type ExternalBuilder<Token> = Record<
  string,
  Record<string, TokenGetter<ExternalProps, Token>>
> & {
  custom?: Record<string, TokenGetter<ExternalProps, Token>> & {
    local?: TokenGetter<ExternalProps, Token>;
  };
};
