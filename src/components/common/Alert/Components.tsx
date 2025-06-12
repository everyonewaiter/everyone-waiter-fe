"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import cn from "@/lib/utils";
import ResponsiveButton from "../Button/ResponsiveButton";
import Button from "../Button/Button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 h-screen w-screen bg-black/80",
      className
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed top-1/2 left-1/2 z-100 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-[20px] bg-white p-5 md:w-85 md:gap-8 lg:min-w-136 lg:rounded-[30px] lg:p-8",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex w-full items-center justify-center py-4", className)}
      {...props}
    />
  );
}
AlertDialogHeader.displayName = "AlertDialogHeader";

function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-row gap-2 md:gap-3", className)} {...props} />
  );
}
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      "w-full text-center text-base font-semibold break-words whitespace-pre-wrap md:text-lg",
      className
    )}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    noResponsive?: boolean;
    color?:
      | "approve"
      | "primary"
      | "black"
      | "grey"
      | "apply"
      | "reject"
      | "reapply"
      | null
      | undefined;
  }
>(({ className, onClick, noResponsive, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className="flex-1">
    {noResponsive ? (
      <Button
        type="button"
        onClick={onClick}
        className="button-xl w-full"
        {...props}
      />
    ) : (
      <ResponsiveButton
        asChild
        type="button"
        responsiveButtons={{
          lg: { buttonSize: "xl" },
          md: {
            buttonSize: "sm",
            className: "justify-center items-center flex",
          },
          sm: {
            buttonSize: "sm",
            className: "justify-center items-center flex",
          },
        }}
        onClick={onClick}
        {...props}
      />
    )}
  </AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & {
    hasNoAction?: boolean;
    noResponsive?: boolean;
    color?:
      | "approve"
      | "primary"
      | "black"
      | "grey"
      | "apply"
      | "reject"
      | "reapply"
      | null
      | undefined;
  }
>(({ className, hasNoAction, noResponsive, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel ref={ref} className="flex-1">
    {noResponsive ? (
      <Button type="button" className="button-xl w-full" {...props} />
    ) : (
      <ResponsiveButton
        asChild
        color="grey"
        type="button"
        responsiveButtons={{
          lg: { buttonSize: "xl" },
          md: {
            buttonSize: "sm",
            className: "justify-center items-center flex",
          },
          sm: {
            buttonSize: "sm",
            className: "justify-center items-center flex",
          },
        }}
        {...props}
      />
    )}
  </AlertDialogPrimitive.Cancel>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
};
