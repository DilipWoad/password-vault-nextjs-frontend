const fallBackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    let success = document.execCommand("copy");
    let msg = success ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (error) {
    console.error("Fallback: Oops, unable to copy", error);
  }
};

const copyToClipBoard = async (text = "") => {
  if (!navigator.clipboard) {
    //Method using commandExec
    fallBackCopyTextToClipboard(text);
    return;
  }
  //First Method using navigator
  await navigator.clipboard.writeText(text).then(
    () => {
      console.log("Copying to clipboard Successfully!");
    },
    (err) => {
      console.error("Copying to clipboard Failed! : ", err);
    }
  );
};
export { copyToClipBoard };
