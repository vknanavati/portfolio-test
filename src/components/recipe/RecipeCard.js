import {Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/joy/IconButton';
import { FavoriteOutlined } from '@mui/icons-material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export function RecipeCard ({recipe, addFavorite, addMakeRecipe, favorites}) {

  const isFavorite = favorites && favorites.some(item => item.label === recipe.label);

  // console.log("recipe", recipe)
  return (
      <Grid
          xs={12}
          sm={8}
          sx={{
            boxShadow: 6,
            margin: 4,
            padding: 2,
            textAlign: "center",
            width: "370px",
            height: "auto",
            borderRadius: 3,
            backgroundColor: "white"
          }}
      >
        {isFavorite ? (
            <IconButton
            variant="plain"
            onClick={()=>addFavorite(recipe)}
          >
            <FavoriteOutlined sx={{ color: "red" }}/>
          </IconButton>
        ):(
          <IconButton onClick={()=>addFavorite(recipe)}>
            <FavoriteBorder/>
          </IconButton>
        )}
        <Grid>
          <Button
            onClick={()=>addMakeRecipe(recipe)}
          >
            Make Recipe
          </Button>
        </Grid>
        <Typography variant="h6" >{recipe.label}</Typography>
        <img
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
          alt="food-photo"
          src={recipe.image}
        />
        <Typography sx={{wordWrap: "break-word", marginTop: 2}}>
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
          Full Recipe
            </a>
        </Typography>
    </Grid>
  )
}