

import * as React from "react";
import classnames from "classnames";

import BlockTitle from "./BlockTitle.es6";
import BlockContent from "./BlockContent.es6";

type BlockChildren = React.ReactElement<typeof BlockTitle> | React.ReactElement<typeof BlockContent>;

type Props = {
  bottomDivider?: boolean;
  className?: string | {
    [key: string]: any;
  };
  children: React.ChildrenArray<BlockChildren> | BlockChildren;
};

function Block(props: Props) {
  return <div className={classnames({
    'ds-content-block': true,
    'ds-content-block--divider': props.bottomDivider
  }, props.className)}>
      {props.children}
    </div>;
}

export default Block;