import { Box, Grid, Typography, Stack, Button} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useSession } from 'next-auth/react';

export default function Index() {
  const theme = useTheme()
  const { data: session, status } = useSession();

  // If the client session is loading, do this.
  // Todo: Replace with a nice loading screen.
  if (status === "loading") {
    return <p>Loading Session</p>
  }

  return (
    <Box component='div' sx={{ height: '100%', overflow: 'hidden' }} mt={4}>
      <Grid container spacing={6} direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '60vh' }}>
      <Grid item sm={12} xs={12}>
        <img src='/static/images/dsc-word.PNG' style={{height:"auto", width:"100%"}}/>
      </Grid>
      {/*-----Hashtag--------*/}
         <Grid container direction="row" spacing={3} alignItems="center" justifyContent="center" >
            <Grid item>
            <Typography  sx={{fontSize:{xs:12, sm: 17, md: 17, lg:17}}} component='div' color={ theme.palette.hashtags.main } >
              #developerstudentclubs
            </Typography>
            </Grid>
            <Grid item >
            <Typography sx={{fontSize:{xs:12, sm: 17, md: 17, lg:17}}} component='div' color={ theme.palette.hashtags.main } >
              #googlestudents
            </Typography>
            </Grid>
            <Grid item >
            <Typography sx={{fontSize:{xs:12, sm: 17, md: 17, lg:17}}} component='div' color={ theme.palette.hashtags.main } >
              #growwithgoogle
            </Typography>
            </Grid>
         </Grid>
         {/*----Button-------*/}
        <Grid item>
          <Button variant='contained' color='secondary'>Get Started</Button>
        </Grid>
      </Grid>
      {/*-----Wavesvg-------*/}
      <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center' sx={{ ml: -70, mt: -0.7 }}>
        <Grid item sx={{ mt: 10, zIndex: 3 }}>
          <Box component='img' sx={{ height: 250.61, width: 2671.24 }} alt='' src='/static/images/wave.svg'/>
        </Grid>
        <Grid item sx={{ mt: -37, zIndex: 2 }}>
          <Box component='img' sx={{ height: 250.61, width: 2671.24 }} alt='' src='/static/images/wave.svg'/>
        </Grid>
        <Grid item sx={{ mt: -37, zIndex: 1 }}>
          <Box component='img' sx={{ height: 250.61, width: 2671.24 }} alt='' src='/static/images/wave.svg' />
        </Grid>
      </Grid>
    </Box>
  )
}