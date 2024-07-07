import { Typography } from '@mui/material'
import CustomSelect from '../../components/ComboBox/Select'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputDirectory from '../../components/InputDirectory/InputDirectory'
import SearchMode from '../../../application/types/SearchMode.enum'
// import TextModels from '../../../application/types/TextModels.enum'
import ImageModels from '../../../application/types/ImageModels.enum'
// import VideoModels from '../../../application/types/VideoModels.enum'
import SearchApproaches from '../../../application/types/SearchApproaches.enum'
import { useTheme } from '@mui/material'

interface SettingsProps {
  mode: string
  setMode: (mode: string) => void
  storageDBPath: string
  setStorageDBPath: (path: string) => void
  // textModel: string
  // setTextModel: (model: string) => void
  imageModel: string
  setImageModel: (model: string) => void
  // videoModel: string
  // setVideoModel: (model: string) => void
  defaultSearchApproach: string
  setDefaultSearchApproach: (approach: string) => void
}

export default function Settings(props: SettingsProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{ flexGrow: 1 }}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
    >
      <Grid container rowSpacing={1} alignItems={'center'}>
        <Grid item xs={3}>
          <Typography>Select mode</Typography>
        </Grid>
        <Grid item xs={7}>
          <CustomSelect
            label="mode"
            choices={Object.values(SearchMode)}
            selectedValue={props.mode}
            setSelectedValue={props.setMode}
          ></CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <Typography>Storage DB path</Typography>
        </Grid>
        <Grid item xs={7}>
          <InputDirectory directory={props.storageDBPath} setDirectory={props.setStorageDBPath} />
        </Grid>
        {/* <Grid item xs={3}>
          <Typography>Select text model</Typography>
        </Grid>
        <Grid item xs={7}>
          <CustomSelect
            label="Select text model"
            choices={Object.values(TextModels)}
            selectedValue={props.textModel}
            setSelectedValue={props.setTextModel}
          ></CustomSelect>
        </Grid> */}
        <Grid item xs={3}>
          <Typography>Select image model</Typography>
        </Grid>
        <Grid item xs={7}>
          <CustomSelect
            label="Select image model"
            choices={Object.values(ImageModels)}
            selectedValue={props.imageModel}
            setSelectedValue={props.setImageModel}
          ></CustomSelect>
        </Grid>
        {/* <Grid item xs={3}>
          <Typography>Select video model</Typography>
        </Grid>
        <Grid item xs={7}>
          <CustomSelect
            label="Select video model"
            choices={Object.values(VideoModels)}
            selectedValue={props.videoModel}
            setSelectedValue={props.setVideoModel}
          ></CustomSelect>
        </Grid> */}
        <Grid item xs={3}>
          <Typography>Default search approach</Typography>
        </Grid>
        <Grid item xs={7}>
          <CustomSelect
            label="Default search approach"
            choices={Object.values(SearchApproaches)}
            selectedValue={props.defaultSearchApproach}
            setSelectedValue={props.setDefaultSearchApproach}
          ></CustomSelect>
        </Grid>
      </Grid>
    </Box>
  )
}
