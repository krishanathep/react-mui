import React,{useState,useEffect} from "react";
import { Button, Box, Container, Card, CardContent, Grid, Typography, CardMedia, CardActions } from "@mui/material";

export default function Home() {

    const [attractions, setAttractions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function getData() {
        try {
            setLoading(true)
            fetch('https://mongo-express-server.herokuapp.com/api/attractions')
                .then((res)=>res.json())
                .then((res)=>setAttractions(res))
        } catch(error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 9,
        pb: 6,
      }}
    >
    <Container>
      <Grid container spacing={2}>
        {attractions.map((att,i)=>(
            <Grid item xs={12} lg={4}>
            <Card>
            <CardMedia 
                component="img"
                height="140"
                image={att.coverimage}
                alt="green iguana"
            />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {att.name}
                </Typography>
              </CardContent>
              <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
    </Box>
  );
}
