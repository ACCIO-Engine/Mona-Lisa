import { File, FileType } from "../../../application";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import useHighlights from "../../../application/usecases/highlights/useHighlights.usecase.ts";

const PDFFilePreview = ({ file }: { file: File }) => {
  return (
    <iframe
      title={file.name}
      src={`file://${file.path}#page=1`}
      width="100%"
      height="100%"
    />
  );
};
const TextFileViewer = ({ file }: { file: File }) => {
  const [content, setContent] = useState("");
  const { getHighlights, highlights, isError, isLoading, isSuccess } = useHighlights();

  useEffect(() => {
    if (file && file.path) {
      getHighlights(file.path);
    }
    if (highlights && highlights.content) {
      setContent(highlights.content);
    }
  }, [file, getHighlights, highlights]);

  const renderHighlightedContent = () => {
    if (!highlights || !highlights.highlights) {
      return content;
    }

    const parts = [];
    let lastIndex = 0;
    console.log("highlights", highlights.highlights);
    highlights.highlights.forEach((highlight, index) => {
        // Push the text before the highlight
        if (lastIndex < highlight.startInd) {
          // console.log("not highlighted", content.substring(lastIndex, highlight.start));
          parts.push(
            <span key={index}>{content.substring(lastIndex, highlight.startInd)}</span>
          );
        }
        parts.push(
          <span
            key={index}
            style={{
              backgroundColor:
                highlight.type === "Exact" ? "rgba(255,215,0,0.59)" : "rgba(255,99,71,0.67)"
            }}
          >
          {content.substring(highlight.startInd, highlight.endInd)}
        </span>
        );

        lastIndex = highlight.endInd;
      }
    );
    // Push the remaining text
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }
    return parts;
  };


  return (
    <>
      {
        file.type === FileType.PDF && highlights && !highlights.content &&
        <PDFFilePreview file={file} />
      }
      <div>
        {
          !isLoading &&
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: "1.1rem",
              lineHeight: "1.5rem"
            }}
          >
            {renderHighlightedContent()}
          </Typography>
        }
      </div>
    </>
  )
    ;
};

export default TextFileViewer;
