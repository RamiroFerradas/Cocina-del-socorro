import FeatherIcon from "feather-icons-react";
import React from "react";
import classNames from "classnames";
import { RoundedIcon } from "./RoundedIcon";

export interface ToastProps {
  title: string;
  text: string;
  variant: "success" | "error";
}

export const toastSuccessStyles = "!bg-feedback-200";
export const toastErrorStyles = "!bg-feedback-400";

export const Toast = ({ title, text, variant }: ToastProps) => {
  const toastConfig = {
    success: {
      icon: "check-circle",
      bgIcon: "bg-feedback-600",
      text: "text-feedback-1000",
    },
    error: {
      icon: "x-circle",
      bgIcon: "bg-feedback-800",
      text: "text-feedback-1100",
    },
  };

  const roundedIconStyles = classNames("size-6", toastConfig[variant].bgIcon);
  const textContainerStyles = classNames(
    "flex flex-col gap-1",
    toastConfig[variant].text
  );

  return (
    <div className="flex items-start gap-2">
      <div>
        <RoundedIcon className={roundedIconStyles}>
          <FeatherIcon
            className="text-white"
            icon={toastConfig[variant].icon}
            size={16}
          />
        </RoundedIcon>
      </div>
      <div className={textContainerStyles}>
        <span className="text-smaller font-bold">{title}</span>
        <span className="text-caption">{text}</span>
      </div>
    </div>
  );
};
