"use client";

import { Loader2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

const MAX_BYTES = 10 * 1024 * 1024;

type ImageExt = "png" | "jpeg" | "webp";

function fileToUploadParams(file: File): { extension: ImageExt; contentType: "image/png" | "image/jpeg" | "image/webp" } | null {
  if (file.type === "image/png") return { extension: "png", contentType: "image/png" };
  if (file.type === "image/jpeg" || file.type === "image/jpg") return { extension: "jpeg", contentType: "image/jpeg" };
  if (file.type === "image/webp") return { extension: "webp", contentType: "image/webp" };
  return null;
}

export function MealizeImageUploadField({
  label,
  value,
  onChange,
  helperText,
  required,
  className,
  hideLabel = false,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  required?: boolean;
  className?: string;
  /** When the parent section already shows a visible title. */
  hideLabel?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const presign = trpc.upload.presignedPut.useMutation();
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const processFile = useCallback(
    async (file: File | undefined) => {
      setLocalError(null);
      if (!file) return;
      const params = fileToUploadParams(file);
      if (!params) {
        setLocalError("Use a PNG, JPEG, or WebP image.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setLocalError("Image must be 10 MB or smaller.");
        return;
      }
      setUploading(true);
      try {
        const { uploadUrl, publicUrl } = await presign.mutateAsync({
          contentType: params.contentType,
          extension: params.extension,
        });
        const put = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": params.contentType },
        });
        if (!put.ok) {
          throw new Error(`Storage upload failed (${put.status}). Check S3 bucket CORS for PUT from this origin.`);
        }
        onChange(publicUrl);
      } catch (e) {
        const msg =
          e instanceof Error
            ? e.message
            : "Upload failed. Ensure S3_BUCKET and AWS credentials are set on the server.";
        setLocalError(msg);
      } finally {
        setUploading(false);
      }
    },
    [onChange, presign],
  );

  const uploadError = presign.error?.message ?? null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className={hideLabel ? "sr-only" : "text-sm font-semibold text-foreground"}>
        {label}
        {required ? " *" : null}
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="sr-only"
        onChange={(e) => {
          void processFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="gap-2 font-semibold text-foreground"
        >
          {uploading ? <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden /> : <Upload className="size-4 shrink-0" aria-hidden />}
          {uploading ? "Uploading…" : value ? "Replace image" : "Choose image"}
        </Button>
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1 text-foreground hover:bg-muted hover:text-foreground"
            onClick={() => {
              onChange("");
              setLocalError(null);
            }}
          >
            <X className="size-4" aria-hidden /> Remove
          </Button>
        ) : null}
      </div>
      {value ? (
        <div className="overflow-hidden rounded-lg border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="mx-auto max-h-56 w-auto max-w-full object-contain" />
        </div>
      ) : null}
      {helperText ? <p className="text-xs font-medium leading-relaxed text-muted-foreground">{helperText}</p> : null}
      {localError ? <p className="text-sm font-medium text-destructive">{localError}</p> : null}
      {uploadError && !localError ? <p className="text-sm font-medium text-destructive">{uploadError}</p> : null}
    </div>
  );
}
