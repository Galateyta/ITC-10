import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from '@material-ui/core';
import employee1 from '../../assets/employee1.png'
import employee2 from '../../assets/employee2.png'
import employee3 from '../../assets/employee3.png'

import './About.css';

function ImgMediaCard() {
  return (
    <Grid container direction="row" justify="space-between" id="cards">
      {[employee1, employee2, employee3].map((employee) => (
        <Card className="card">
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image={employee}
              title="Contemplative Reptile"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Grid>
  );
}

export default ImgMediaCard;