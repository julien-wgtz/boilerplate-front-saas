import React, {
  useEffect,
  useState,
} from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

interface AvatarViewerProps {
  imageUrl: string;
  name: string;
  type?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const AvatarViewer: React.FC<
  AvatarViewerProps
> = ({
  imageUrl,
  name,
  type = "primary",
  size = "small",
}) => {
  const [avatar, setAvatar] = useState(imageUrl);
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    setKey(Date.now());
    setAvatar(imageUrl);
  }, [imageUrl]);
  const sizeSquare =
    size === "small"
      ? "w-8 h-8"
      : size === "medium"
      ? "w-12 h-12"
      : "w-24 h-24";
  const sizeText =
    size === "small"
      ? "text-xs"
      : size === "medium"
      ? "text-sm"
      : "text-3xl";
  return (
    <Avatar
      className={`${sizeSquare} rounded-lg`}
    >
      <AvatarImage
        key={key}
        src={avatar}
        alt={name}
      />
      <AvatarFallback
        className={`rounded-lg ${
          type == "primary"
            ? "bg-muted text-primary"
            : "bg-primary text-secondary"
        } ${sizeText}`}
      >
        {name[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarViewer;
