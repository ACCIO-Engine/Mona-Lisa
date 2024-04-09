export default async function copyTextToClipboard(
  paths: string[]
): Promise<boolean> {
  try {
    const textToCopy = paths.length === 1 ? paths[0] : paths.join("\n");
    await navigator.clipboard.writeText(textToCopy);
    return true;
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
    return false;
  }
}
