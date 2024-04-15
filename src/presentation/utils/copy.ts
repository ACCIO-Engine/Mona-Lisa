export default async function copyTextToClipboard(
  paths: string[]
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(paths.join("\n"));
    return true;
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
    return false;
  }
}