import OS from "../types/OS.enum";

export function getOS(): OS {
  const platform = window.navigator.platform.toLowerCase();
  if (platform.includes("win")) {
    return OS.WINDOWS;
  } else if (platform.includes("linux")) {
    return OS.LINUX;
  } else if (platform.includes("mac")) {
    return OS.MAC;
  } else {
    throw new Error("Unsupported OS");
  }
}
