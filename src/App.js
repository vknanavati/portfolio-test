import { useState, useEffect } from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import {Home} from './components/Home';
import {About} from './components/About';
import {RecipeAppTS} from './components/recipe/RecipeAppTS';
import {FavoritesTS} from './components/recipe/FavoritesTS';
import {MakeRecipeTS} from './components/recipe/MakeRecipeTS';
import {AboutRecipeTS} from './components/recipe/AboutRecipeTS';
import {HomeRecipeTS} from './components/recipe/HomeRecipeTS';
import {Hostel} from './components/Hostel';
import {ToDoList} from './components/ToDoList';
import {Weather} from './components/Weather';
import {CurrencyTwo} from './components/CurrencyTwo';
import {Countdown} from './components/Countdown';
import {Counter} from './components/Counter';
import {Wallpaper} from './components/Wallpaper'
import {AppBar, Toolbar, Box, Container, Typography, Alert, AlertTitle, Button, Drawer, ListItem, ListItemButton,ListItemText, List, useTheme, useMediaQuery} from '@mui/material';

function App() {

  const [foodData, setFoodData] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [groceryList, setGroceryList] = useState({});
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [alertFavorite, setAlertFavorite] = useState(false);
  const [alertRemove, setAlertRemove] = useState(false);
  const [alertRecipe, setAlertRecipe] = useState(false)
  const [notes, setNotes] = useState("");
  const [notesList, setNotesList] = useState({});
  const [open, setOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const projects = [

    { name: 'Recipe Search', path: 'recipe/homeRecipe' },
    { name: 'Hostel Comparer', path: '/hostel' },
    { name: 'Countdown Timer', path: '/countdown' },
    { name: 'Currency Converter', path: '/currency'},

  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // useEffect(()=>{
  //   localStorage.clear()
  // })

  useEffect(()=> {
    const handleScroll = () => {
      if (window.scrollY > 68) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  // empty array dependency means useEffect runs once when the component mounts
  useEffect(()=>{
    const localGrocery = localStorage.getItem("grocery");
    setGroceryList( localGrocery ? JSON.parse(localGrocery) : {})
  }, [])

  useEffect(()=>{
    const localNotes = localStorage.getItem("notes");
    setNotesList( localNotes ? JSON.parse(localNotes) : {})
  }, [])

  const [favorites, setFavorites] = useState(()=> {
    return JSON.parse(localStorage.getItem("favorites")) || []
  });
  const [makeRecipe, setMakeRecipe] = useState(()=>{
    return JSON.parse(localStorage.getItem("make recipe")) || []
  });

  //this useEffect is triggered only when favorites array is not empty
  useEffect(() => {
    //favorites persists upon refresh in local storage when condition included
    if (favorites !== null) {localStorage.setItem("favorites", JSON.stringify(favorites))};
  }, [favorites]);

  useEffect(() => {
    if (makeRecipe !== null) {localStorage.setItem("make recipe", JSON.stringify(makeRecipe))};
  }, [makeRecipe]);

  useEffect(() => {
    if (groceryList !== null && Object.keys(groceryList).length > 0) {localStorage.setItem("grocery", JSON.stringify(groceryList))};
  }, [groceryList]);

  useEffect(() => {
    if (notesList !== null && Object.keys(notesList).length > 0) {localStorage.setItem("notes", JSON.stringify(notesList))};
  }, [notesList]);

  // useEffect(() => {
  //   console.log("groceryList updated: ", JSON.stringify(groceryList));
  //   console.log("makeRecipe updated: ", JSON.stringify(makeRecipe));
  //   console.log("favorites updated: ", JSON.stringify(favorites));
  //   console.log("Favorites LENGTH: ", favorites.length)
  // }, [groceryList, makeRecipe, favorites]);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggleDrawer = () => {
    setOpen(prevState => !prevState);
  };

    //add and remove favorite recipe card
  const addFavorite = (recipe) => {
  //adds recipe only if it is not already in favorites list
  //if length of filtered array > 0 then it will not add the recipe
  //checking if recipe exists in favorites array
    const currentFavorites = favorites || [];
    if (!(currentFavorites.filter(item => item.label === recipe.label).length > 0)) {
      setFavorites([...currentFavorites, recipe]);
      setAlertFavorite(true);
      setTimeout(() => {
        setAlertFavorite(false)
        }, 3000);
    } else {
      //keeps item in array if label of the item doesn't match the label of the recipe being passed
      //so if 'heart button' is clicked again on recipe card it will remove that recipe because it already exists in favorites
      //this happens because the condition the array is to return array that doesn't match recipe being passed
      //so a new array is created excluding matching recipe label
      setFavorites(currentFavorites.filter((item)=> item.label !== recipe.label));
      setAlertRemove(true);
      setTimeout(()=>{
        setAlertRemove(false)
      }, 3000);
    }
    console.log("favorites:", JSON.stringify(favorites))
  };

  const addMakeRecipe = (recipe) => {
    // if condition true, recipe not in makeRecipe, recipe is added to makeRecipe
    if (!(makeRecipe.filter(item => item.label === recipe.label).length > 0)){
      setMakeRecipe([...makeRecipe, recipe]);

      setAlertRecipe(true);

      setTimeout(()=>{
        setAlertRecipe(false);
      }, 3000)

      console.log("makeRecipe: ", makeRecipe);
      console.log("recipe added to makeRecipe: ", recipe);

    } else {
        // check item in makeRecipe and see if item.label in array does not match recipe.label
        //not matching the label is the condition so it will create a new array of recipes that don't match the recipe.label
        const updatedMakeRecipe = makeRecipe.filter((item)=> item.label !== recipe.label);
        setMakeRecipe(updatedMakeRecipe);

        setFilteredRecipe([]);

        setAlertRemove(true);

        setTimeout(()=> {
          setAlertRemove(false);
        }, 3000);

        console.log("recipe removed: ", recipe);
    }
  };

  // onClick={() => addGrocery(recipe.label, ingredient.food)}
  const addGrocery = (recipeName, ingredient) => {

    setGroceryList((groceryObject)=>{

      //sets current ingredients to groceryObject[recipeName] or to empty array if groceryObject[recipeName] does not exists
      const currentIngredients = groceryObject[recipeName] || [];

      console.log("currentIngredients: ", currentIngredients);
      console.log("before adding new ingredient to groceryObject ", groceryObject);
      console.log("recipeName: ", recipeName);
      console.log("grocery object: ", groceryObject)

      if (!currentIngredients.includes(ingredient)) {

        console.log("added new ingredient: ", ingredient)

        return { ...groceryObject, [recipeName] : [...currentIngredients, ingredient] };

      } else {
          console.log("ingredient already in list");

          const updatedIngredients = currentIngredients.filter((item) => item !== ingredient);

          return {...groceryObject, [recipeName]: updatedIngredients}
      }
    });
  };

  return (
    <Container maxWidth={"false"} disableGutters>
      <AppBar
        position="fixed"
        sx={{
          background: scrolling ? "linear-gradient(to right, #0D0D19E6, #260D26E6)" : "transparent",
          boxShadow: "none",
          alignItems: "center"
        }}
      >
        <Toolbar sx={{ width: "100%", position: "relative", paddingTop: 5 }}>
          <Box
            sx={{
                position: "absolute",
                top: "15px",
                padding: 0,
                paddingLeft: 4,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.10)",},
            }}
          >
            <Button
              sx={{
                textShadow: "1px 1px 2px #00FFFF, 0 0 35px #00FFFF, 0 0 10.5px #00FFFF",
                fontFamily: "'Tilt Neon', sans-serif",
                fontSize: isMobile ? "15px" : "40px",
                fontStyle: "italic",
                textTransform: "none",
                color: "#AEFFFF",
                fontWeight: 800,
              }}
              onClick={handleToggleDrawer}>
                Projects
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              whiteSpace: "nowrap",
              overflow: "auto",
              flexGrow: 1
            }}
          >
            <Typography
              component={Link}
              to="/"
            >
              <Button
                sx={{
                  textShadow: '1px 1px 2px #00FFFF, 0 0 35px #00FFFF, 0 0 10.5px #00FFFF',
                  "&:hover": {
                    textShadow: '0 0 20px #00FFFF, 0 0 20px #00FFFF, 0 0 10px #00FFFF',
                  },
                  fontFamily: "'Tilt Neon', sans-serif",
                  fontSize: isMobile ? '20px' : '50px',
                  color: '#AEFFFF',
                  fontWeight: 800,
                }}
              >
                Home
              </Button>
            </Typography>
            <Typography
              component={Link}
              to="/about"
            >
              <Button
                sx={{
                  textShadow: "1px 1px 2px #00FFFF, 0 0 35px #00FFFF, 0 0 10.5px #00FFFF",
                  "&:hover": {
                    textShadow: "0 0 20px #00FFFF, 0 0 20px #00FFFF, 0 0 10px #00FFFF",
                  },
                  fontFamily: "'Tilt Neon', sans-serif",
                  fontSize: isMobile ? '20px' : '50px',
                  color: "#AEFFFF",
                  fontWeight: 800,
                }}
              >
                About
              </Button>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant="temporary"
        open={open}
        onClose={(_, reason) =>
          reason === "backdropClick" && setOpen(false)
        }
        onClick={()=>setOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
              width: isMobile ? "100%" : 300,
              alignItems: isMobile ? "center" : "",
              marginTop: isMobile ? "60px" : "90px",
              height: isMobile ? "calc(100% - 60px)" : "calc(100% - 90px)",
              pt: isMobile ? 2 : 4,
              background: "linear-gradient(145deg, #140A26F2, #580F58E6)",
              borderTop: "2px solid #FF00FF",
              borderRight: "2px solid #FF00FF",
              boxShadow: "0 0 20px #FF00FF",
              borderTopRightRadius: isMobile ? "0" : "20px"
            },
        }}
      >
        <List>
          {projects.map((project, index) => (
            <ListItem
              key={index}
              component={Link}
              to={project.path}
              onClick={handleDrawerClose}
              disablePadding
              sx={{
                textShadow: "1px 1px 2px #00FFFF, 0 0 35px #00FFFF, 0 0 10.5px #00FFFF",
                "&:hover": {
                  textShadow: '0 0 20px #00FFFF, 0 0 20px #00FFFF, 0 0 10px #00FFFF',
                },
                fontFamily: "'Tilt Neon', sans-serif",
                fontStyle: "italic",
                textTransform: "none",
                color: "#AEFFFF",
                fontWeight: 800,
              }}
              >
              <ListItemButton
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: "30px",
                }
              }}>
                <ListItemText primary={project.name}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {alertFavorite && (
        <Alert
          severity="success"
          onClose={() => setAlertFavorite(false)}
          sx={{
            position: "fixed",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "auto",
            zIndex: 9999
          }}
        >
          <AlertTitle>Success</AlertTitle>
          Recipe added to Favorites!
        </Alert>
      )}
      {alertRecipe && (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "auto",
            zIndex: 9999
          }}
        >
          <AlertTitle>Success</AlertTitle>
          Added to Recipes
        </Alert>
      )}
      {alertRemove && (
        <Alert
          severity="warning"
          onClose={() => setAlertFavorite(false)}
          sx={{
            position: "fixed",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "auto",
            zIndex: 9999
          }}
        >
          Removed Recipe
        </Alert>
      )}
      <Wallpaper>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>

        <Route path="/recipe" element={<RecipeAppTS favorites={favorites} makeRecipe={makeRecipe}/>}>
          <Route path="aboutRecipe" element={<AboutRecipeTS/>}/>
          <Route
            path="homeRecipe"
            element={
              <HomeRecipeTS
                addFavorite={addFavorite}
                foodData={foodData}
                setFoodData={setFoodData}
                addMakeRecipe={addMakeRecipe}
                favorites={favorites}
                recipeData={recipeData}
                setRecipeData={setRecipeData}
              />
            }
          />
          <Route path="favorites" element={
            <FavoritesTS
              favorites={favorites}
              addFavorite={addFavorite}
              addMakeRecipe={addMakeRecipe}/>
              }
            />
          <Route path="make" element={
            <MakeRecipeTS
              makeRecipe={makeRecipe}
              addGrocery={addGrocery}
              groceryList={groceryList}
              filteredRecipe={filteredRecipe}
              setFilteredRecipe={setFilteredRecipe}
              setNotes={setNotes}
              notes={notes}
              notesList={notesList}
              setNotesList={setNotesList}
              addMakeRecipe={addMakeRecipe}
            />
          }/>
        </Route>

        <Route path="/hostel" element={<Hostel/>}/>
        <Route path="/todo" element={<ToDoList/>}/>
        <Route path="/weather" element={<Weather/>}/>
        <Route path="/currency" element={<CurrencyTwo/>}/>
        <Route path="/countdown" element={<Countdown/>}/>
        <Route path="/counter" element={<Counter/>}/>

      </Routes>
      </Wallpaper>
    </Container>
  );
}

export default App;
