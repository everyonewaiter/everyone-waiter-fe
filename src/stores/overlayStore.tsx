/* eslint-disable */
import { ReactNode } from "react";
import { createStore } from "zustand";

export type OverlayItem = ReactNode;
export type OverlayStore = {
  overlays: Map<string, OverlayItem>;
  addOverlay: (overlayId: string, overlayItem: OverlayItem) => void;
  deleteOverlay: (overlayId: string) => void;
};

export const createOverlayStore = () => {
  return createStore<OverlayStore>()((set) => ({
    overlays: new Map(),
    addOverlay: (overlayId, overlayItem) => {
      set((state) => {
        const overlays = new Map(state.overlays);
        overlays.set(overlayId, overlayItem);
        return { overlays };
      });
    },
    deleteOverlay: (overlayId) => {
      set((state) => {
        const overlays = new Map(state.overlays);
        overlays.delete(overlayId);
        return { overlays };
      });
    },
  }));
};
