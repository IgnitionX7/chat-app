"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  urls: string[];
};

type FileWithType = {
  url: string;
  isVideo: boolean;
};

const ImagePreview = ({ urls }: Props) => {
  const [files, setFiles] = useState<FileWithType[]>([]);

  useEffect(() => {
    const detectFileTypes = async () => {
      const results: FileWithType[] = await Promise.all(
        urls.map(async (url) => {
          const videoFilePattern = /\.(mp4|webm|ogg|mov|mkv)$/i;
          let isVideo = videoFilePattern.test(url);

          if (!isVideo) {
            try {
              const response = await fetch(url, { method: "HEAD" });
              const contentType = response.headers.get("content-type");
              isVideo = contentType?.startsWith("video/") ?? false;
            } catch (error) {
              console.error("Error detecting file type:", error);
            }
          }

          return { url, isVideo };
        }),
      );

      setFiles(results);
    };

    detectFileTypes();
  }, [urls]);

  if (files.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">Loading media...</div>
    );
  }

  return (
    <div
      className={cn("grid gap-2 justify-items-start", {
        "grid-cols-1": files.length === 1,
        "grid-cols-2": files.length > 1,
      })}
    >
      {files.map(({ url, isVideo }, index) => (
        <Dialog key={index}>
          <div
            className={cn("relative cursor-pointer", {
              "w-28 h-28 max-w-full": !isVideo,
            })}
          >
            <DialogTrigger asChild>
              {isVideo ? (
                <div className="aspect-video w-full h-full">
                  <video
                    className="object-cover w-48 rounded-md"
                    muted
                    playsInline
                  >
                    <source src={`${url}#t=0.1`} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <Image
                  src={url}
                  alt="Uploaded image"
                  referrerPolicy="no-referrer"
                  className="rounded-md"
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isVideo ? "Video Preview" : "Image Preview"}
                </DialogTitle>
              </DialogHeader>
              <div className="w-full h-96 relative flex items-center justify-center">
                {isVideo ? (
                  <video controls className="w-full h-full">
                    <source src={`${url}#t=0.1`} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={url}
                    alt="Uploaded image"
                    referrerPolicy="no-referrer"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
            </DialogContent>
          </div>
        </Dialog>
      ))}
    </div>
  );
};

export default ImagePreview;
