export default function showImagePath(
  inputFieldID: string,
  newValue: string
): void {
  // Get the input field by its id
  const inputField = document.getElementById(inputFieldID) as HTMLInputElement;

  // Check if the input field exists
  if (inputField) {
    // Change the value of the input field
    inputField.value = newValue;
  } else {
    console.error("Input field not found");
  }
}
