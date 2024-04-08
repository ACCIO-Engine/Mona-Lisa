export default async function copyTextToClipboard(
  text: string
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
    return false;
  }
}
