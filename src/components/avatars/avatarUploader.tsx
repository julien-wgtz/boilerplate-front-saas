import React, {
  useState,
  useRef,
  use,
  useEffect,
} from "react";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useTranslations } from "next-intl";
import { set } from "zod";
import UserService from "@/services/users";
import useUserStore from "@/stores/userStore";
import { Slider } from "../ui/slider";

interface AvatarUploaderProps {
  initialAvatar: string;
  fallbackAvatar: string;
  disabled?: boolean;
  onSave: (blob: Blob, fileName: string) => void;
}

const AvatarUploader: React.FC<
  AvatarUploaderProps
> = ({
  initialAvatar,
  fallbackAvatar,
  disabled = false,
  onSave,
}) => {
  const [image, setImage] = useState<File | null>(
    null
  );
  const [preview, setPreview] = useState(
    initialAvatar
  );
  const [isOpenDialog, setIsOpenDialog] =
    useState(false);
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor>(null);
  const t = useTranslations();
  const { user } = useUserStore();

  const handleDrop = (acceptedFiles: File[]) => {
    setIsOpenDialog(true);
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    setPreview(initialAvatar);
  }, [initialAvatar]);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas =
        editorRef.current.getImageScaledToCanvas();

      const highResCanvas =
        document.createElement("canvas");
      const scaleFactor = 4;
      highResCanvas.width =
        canvas.width * scaleFactor;
      highResCanvas.height =
        canvas.height * scaleFactor;

      const ctx = highResCanvas.getContext("2d");
      if (ctx) {
        ctx.scale(scaleFactor, scaleFactor);
        ctx.drawImage(canvas, 0, 0);
      }

      highResCanvas.toBlob(async (blob) => {
        if (!blob) return;
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const imageUrl =
            fileReader.result as string;
          setPreview(imageUrl);
          setImage(null);
        };
        fileReader.readAsDataURL(blob);
        await onSave(
          blob,
          image?.name || "avatar.png"
        );
      }, image?.type || "image/png"); // Assurez-vous que le type est "image/png"
    }
    setIsOpenDialog(false);
    setScale(1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <AlertDialog open={isOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Edit profile
            </AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to your profile here.
              Click save when you're done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={350}
            height={350}
            border={50}
            borderRadius={75} // Cercle
            scale={scale}
          />
          <AlertDialogFooter>
            <div className="flex flex-col w-full gap-4">
              <div>
                <Slider
                  defaultValue={[scale]}
                  max={5}
                  min={1}
                  step={0.1}
                  onValueChange={(value) => {
                    setScale(value[0]);
                  }}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="submit"
                  onClick={() => {
                    setIsOpenDialog(false);
                    setImage(null);
                    setScale(1);
                  }}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  onClick={handleSave}
                >
                  {t("save")}
                </Button>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {!image && (
        <Dropzone
          onDrop={handleDrop}
          accept={{ "image/*": [] }}
        >
          {({ getRootProps, getInputProps }) => (
            <Avatar
              className="h-24 w-24 rounded-lg cursor-pointer"
              {...getRootProps()}
            >
              <input
                disabled={disabled}
                {...getInputProps()}
              />
              <AvatarImage
                src={preview}
                alt={fallbackAvatar}
              />
              <AvatarFallback className="rounded-lg bg-muted text-3xl">
                {fallbackAvatar[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </Dropzone>
      )}
    </div>
  );
};

export default AvatarUploader;
