export type GpuDebugFlags = {
  noAurora: boolean;
  noContactFx: boolean;
  noMotion: boolean;
};

function readSearchParams(): URLSearchParams | null {
  if (typeof window === "undefined") return null;
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return null;
  }
}

export function getGpuDebugFlags(): GpuDebugFlags {
  const params = readSearchParams();
  const has = (key: string) => (params ? params.has(key) : false);
  return {
    noAurora: has("noaurora"),
    noContactFx: has("nocontactfx"),
    noMotion: has("nomotion"),
  };
}

