import React from 'react';
import classNames from 'classnames';

export interface RoundedIconProps extends React.ComponentProps<"div"> {}

export const RoundedIcon = ({ children, className, ...props }: RoundedIconProps) => {
	const styles = classNames("flex justify-center items-center rounded-full", className);
  return (
    <div {...props} className={styles}>
			{children}
    </div>
  );
}
