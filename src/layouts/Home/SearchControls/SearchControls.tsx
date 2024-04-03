import { useState } from "react";
import LargeSearch from "../../../components/TextFields/LargeSearch";
import { FieldContainer } from "./SearchControls.styled";

export default function SearchControls() {
  const [currentControl, setCurrentControl] = useState("text");
  const onChooseImage = () => {
    console.log("Choose Image");
    // setCurrentControl("image");
  };
  const onSearch = () => {
    console.log("Search");
  };
  const onChooseMic = () => {
    console.log("Choose Mic");
    setCurrentControl("mic");
  };
  return (
    <FieldContainer>
      {currentControl === "text" && (
        <LargeSearch
          onChooseImage={onChooseImage}
          onSearch={onSearch}
          onChooseMic={onChooseMic}
        />
      )}
    </FieldContainer>
  );
}
