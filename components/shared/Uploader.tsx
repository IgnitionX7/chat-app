"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { Json } from "@uploadthing/shared";
import { toast } from "sonner";
import { UploadThingError } from "uploadthing/server";

type Props = {
  onChange: (urls: string[]) => void;
  type: "image" | "file";
};
const Uploader = ({ onChange, type }: Props) => {
  return (
    <UploadDropzone
      endpoint={type}
      onClientUploadComplete={(res) => onChange(res.map((item) => item.ufsUrl))}
      onUploadError={(error: UploadThingError<Json>) => {
        toast.error(error.message);
      }}
    />
  );
};
export default Uploader;
