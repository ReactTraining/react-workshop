import * as React from "react";
import classnames from "classnames";
import "YesterTech/Avatar.scss";

interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  src?: string | null | undefined;
  alt?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 3,
  className,
  alt = "Avatar",
  children,
  style,
  ...rest
}) => {
  const commonProps = {
    className: classnames("avatar", className),
    ...rest,
  };
  return src ? (
    <img src={src} alt={alt} style={style} {...commonProps} />
  ) : (
    <div
      children={children}
      style={{ fontSize: `${size}rem`, ...style }}
      {...commonProps}
    />
  );
};

export default Avatar;
