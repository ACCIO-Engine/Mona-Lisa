import { File, FileType } from "../../../application";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import useHighlights from "../../../application/usecases/highlights/useHighlights.usecase.ts";
import { HourGlassLoader } from "../Loader/Loader.tsx";

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
    const mergeHighlights = (highlights) => {
        if (!highlights || highlights.length === 0) {
            return [];
        }

        highlights.sort((a, b) => a.startInd - b.startInd);

        const merged = [];
        let current = highlights[0];

        for (let i = 1; i < highlights.length; i++) {
            const next = highlights[i];
            if (current.endInd >= next.startInd) {
                // Determine the common part and adjust the current highlight
                if (current.startInd < next.startInd) {
                    merged.push({
                        startInd: current.startInd,
                        endInd: next.startInd,
                        type: current.type
                    });
                }
                merged.push({
                    startInd: next.startInd,
                    endInd: Math.min(current.endInd, next.endInd),
                    type: "Overlap"
                });
                if (current.endInd > next.endInd) {
                    current = { startInd: next.endInd, endInd: current.endInd, type: current.type };
                } else {
                    current = { startInd: current.endInd, endInd: next.endInd, type: next.type };
                }
            } else {
                merged.push(current);
                current = next;
            }
        }
        merged.push(current);
        return merged;
    };

    const renderHighlightedContent = () => {
        if (!highlights || !highlights.highlights) {
            return content;
        }

        const parts = [];
        let lastIndex = 0;
        const mergedHighlights = mergeHighlights(highlights.highlights);
        mergedHighlights.forEach((highlight, index) => {
            if (lastIndex < highlight.startInd) {
                parts.push(
                    <span key={lastIndex}>{content.substring(lastIndex, highlight.startInd)}</span>
                );
            }
            parts.push(
                <span
                    key={index}
                    style={{
                        backgroundColor:
                            highlight.type === "Exact" ? "rgba(255,215,0,0.59)" :
                                highlight.type === "Overlap" ? "rgba(144,238,144,0.75)" : "rgba(255,99,71,0.67)"
                    }}
                >
          {content.substring(highlight.startInd, highlight.endInd)}
        </span>
            );
            lastIndex = highlight.endInd;
        });

        if (lastIndex < content.length) {
            parts.push(<span key={lastIndex}>{content.substring(lastIndex)}</span>);
        }

        return parts;
    };

    return (
        <>
            {isLoading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}
                >
                    <HourGlassLoader />
                </Box>
            )}
            {file.type === FileType.PDF && highlights && !highlights.content && (
                <PDFFilePreview file={file} />
            )}
            <div>
                {!isLoading && (
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
                )}
            </div>
        </>
    );
};

export default TextFileViewer;
