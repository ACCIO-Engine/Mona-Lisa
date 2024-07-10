import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme
} from "@mui/material";
import { pink } from "@mui/material/colors";
import IndexType from "../../../application/types/IndexType.enum";

interface IndexTypesProps {
  isLoading: boolean;
  isError: boolean;
  result: any;
}

/*
{inClassical: true, inSemanticKeywords: false, inSemanticPassageEmbeddings: false, inCbirClassical: false, inCbirDeep: false}
 */

const getIndexTypeComponent = (theme: any, type: string, value: boolean) => {
  const CustomCheckbox = (value: boolean) => {
    return (
      <Checkbox
        size="small"
        sx={{
          color: theme.palette.common.white,
          "&.Mui-checked": {
            color: theme.palette.common.white
          }
        }}
        checked={value}
      />
    );
  };
  console.log("type", type);
  switch (type) {
    case IndexType.Classical:
      return (
        <FormControlLabel
          control={CustomCheckbox(value)}
          label={
            <Typography
              sx={{
                fontSize: 15
              }}
            >
              Classical Index
            </Typography>
          }
        />
      );
    case IndexType.SemanticKeywords:
      return (
        <FormControlLabel
          control={CustomCheckbox(value)}
          label={
            <Typography
              sx={{
                fontSize: 15
              }}
            >
              Semantic Keywords Index
            </Typography>
          }
        />
      );
    case IndexType.SemanticPassageEmbeddings:
      return (
        <FormControlLabel
          control={CustomCheckbox(value)}
          label={
            <Typography
              sx={{
                fontSize: 15
              }}
            >
              Semantic Passage Index
            </Typography>
          }
        />
      );
    case IndexType.CbirClassical:
      return (
        <FormControlLabel
          control={CustomCheckbox(value)}
          label={
            <Typography
              sx={{
                fontSize: 15
              }}
            >
              CBIR Classical Index
            </Typography>
          }
        />
      );
    case IndexType.CbirDeep:
      return (
        <FormControlLabel
          color="secondary"
          control={CustomCheckbox(value)}
          label={
            <Typography
              sx={{
                fontSize: 15
              }}
            >
              CBIR Deep Index
            </Typography>
          }
        />
      );
    default:
      return <Typography>Unknown index type</Typography>;
  }
};

const IndexTypes = (props: IndexTypesProps) => {
  const { isLoading, isError, result } = props;
  const theme = useTheme();
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (isError) {
    return <Typography>Cannot fetch index types!</Typography>;
  }
  return (
    <Box width={200}>
      {Object.keys(result).map((key) => {
        return getIndexTypeComponent(theme, key, result[key]);
      })}
    </Box>
  );
};

export default IndexTypes;
