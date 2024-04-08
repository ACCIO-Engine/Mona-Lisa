import { useState } from "react";
import LargeSearch from "../../../components/TextFields/LargeSearch";
import { FieldContainer } from "./SearchControls.styled";
import { useNavigate } from "react-router-dom";
import { SearchType, useSearch } from "../../../../application";

export default function SearchControls() {
  const [currentControl, setCurrentControl] = useState("text");
  const navigate = useNavigate();
  const { search } = useSearch();
  const onChooseImage = (image: string) => {
    search(image, SearchType.IMAGE);
    navigate("/search");
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
