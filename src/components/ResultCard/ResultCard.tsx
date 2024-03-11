import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const ResultCard: React.FC = () => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 300,
        p: 2
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image="icon.png"
      />
      <CardContent
        sx={{
          p: 0
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          File Name
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          p: 0,
          width: '100%'
        }}
      >
        <IconButton color="primary">
            <ContentCopyIcon />
          </IconButton>
          <IconButton color="primary">
            <FileOpenIcon />
          </IconButton>
          <IconButton color="primary">
            <FolderOpenIcon />
          </IconButton>
      </CardActions>
    </Card>
  )
}

export default ResultCard
