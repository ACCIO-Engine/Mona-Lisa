import { useState } from "react";
import LargeSearch from "../../../components/TextFields/LargeSearch";
import { FieldContainer } from "./SearchControls.styled";
import { useNavigate } from "react-router-dom";

export default function SearchControls() {
  const [currentControl, setCurrentControl] = useState("text");
  const navigate = useNavigate();
  const onChooseImage = (image: string) => {
    console.log("Choose Image");
    // setCurrentControl("image");
    // set image to search params called query and set param called type to image
    navigate("/search?query=" + image + "&type=image");
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
