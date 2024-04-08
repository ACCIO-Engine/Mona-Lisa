import * as React from "react";
import { NestedMenuItem } from "mui-nested-menu";
import { MenuItem, Menu, Button, Box, Typography } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { StyledMenuItem } from "./MenuItem.styled";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

const NestedList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box marginLeft={2}>
      <Button onClick={handleClick} variant="contained">
        Search Options
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <StyledMenuItem onClick={handleClose}>
          <FolderCopyIcon />
          <Typography>All subfolders</Typography>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <FolderOpenIcon />
          <Typography>Current folder</Typography>
        </StyledMenuItem>
        <NestedMenuItem
          leftIcon={<DateRangeIcon />}
          label="Date modified"
          parentMenuOpen={open}
        >
          {[
            "today",
            "yesterday",
            "this week",
            "last week",
            "this month",
            "last month",
            "last year",
            "this year",
          ].map((value) => (
            <MenuItem key={value} onClick={handleClose}>
              {value}
            </MenuItem>
          ))}
        </NestedMenuItem>
        <NestedMenuItem
          label="Size"
          parentMenuOpen={open}
          leftIcon={<SnippetFolderIcon />}
        >
          {[
            "Empty (0 KB)",
            "Tiny (0 - 16 KB)",
            "Small (16 KB - 1 MB)",
            "Medium (1 - 128 MB)",
            "Large (128 MB - 1 GB)",
            "Huge (1 - 4 GB)",
            "Giantic (>4 GB)",
          ].map((value) => (
            <MenuItem key={value} onClick={handleClose}>
              {value}
            </MenuItem>
          ))}
        </NestedMenuItem>
        <NestedMenuItem
          label="Kind"
          parentMenuOpen={open}
          leftIcon={<BackupTableIcon />}
        >
          {["Image", "Document", "Video", "All"].map((value) => (
            <MenuItem key={value} onClick={handleClose}>
              {value}
            </MenuItem>
          ))}
        </NestedMenuItem>
      </Menu>
    </Box>
  );
};

export default NestedList;
