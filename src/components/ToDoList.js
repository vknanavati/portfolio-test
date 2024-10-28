
import { useState } from 'react';
import {ListItemText, List, ListItem, Paper, Container, Typography, Button, TextField, Box} from '@mui/material'
import Grid from '@mui/material/Grid2';
import "../App.css"


export function ToDoList() {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(true);

    const handleClick = e => {
        e.preventDefault();

        console.log(`Task variable: ${task}`)
        console.log(`Task length: ${task.length}`)

        const taskObject = {
        id: Math.floor(Math.random() * 1000),
        value: task
        };

        setList([...list, taskObject]);

        console.log("useState variable 'list': ", list)
        console.log("taskObject:", taskObject)

        setTask("");
        setErrorMessage(true)
    }

  const handleChange = e => {
    console.log("input text:>>> ", e)
    if (e.length < 1) {
      console.log('Input is less than 1')
      setErrorMessage(true)
    } else {
      console.log('Input is more than 1')
      setErrorMessage(false)
    }
    setTask(e)
  }

  const removeTask = (e, id) => {
    e.preventDefault();
    const updatedList = list.filter((taskObject) => taskObject.id !== id);
    setList(updatedList)
  }
    return (
        <Container>
        <Paper
          elevation={24}
          sx=
          {{
            paddingBottom: 10,
            marginTop: 15,
            marginBottom: 10
          }}
        >
        <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        >
          <Typography
          variant="h4"
          sx=
          {{
            marginTop: 5,
            marginBottom: 4,
            color: "#05998C"
          }}
          >
            To Do List
          </Typography>
          <form>
            <Grid
              container
              spacing={2}
              alignItems={"center"}
            >
              <Grid item>
                <TextField
                    sx={{
                      width: 200,
                      "& .MuiInputBase-root":{
                        height: 45
                      },
                      fieldset: {borderColor: "black"},
                      input: {fontSize: 20}
                    }}
                  type={"text"}
                  value={task}
                  onChange={e => handleChange(e.target.value)}
                  />
              </Grid>
              <Grid item>
                <Button
                  sx={{
                    border: "2px #4FBF8D solid",
                    color: "#4FBF8D",
                    "&:hover": {
                      border: "2px #4FBF8D solid",
                    },
                    fontWeight: 700
                  }}
                  disabled={errorMessage}
                  variant="outlined"
                  onClick={e => handleClick(e)}
                  type="submit"
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </form>
          </Grid>
        </Paper>
        <Container>
          <Box>
            {list.map((taskObject, i) => {
              return (
                <List>
                  <Box
                    display={"flex"}
                    backgroundColor={"#70D1D0"}
                    justifyContent={"space-between"}
                    padding={1}
                    borderRadius={3}
                  >
                    <Box>
                      <ListItem
                        key={taskObject.id}>
                        <ListItemText
                          primaryTypographyProps={{fontSize: '20px'}}
                          primary={taskObject.value}
                        />
                      </ListItem>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Button
                        sx={{
                          height:30,
                          minWidth: 0,
                          color: "#AC001E",
                          border: "3px #AC001E solid",
                          "&:hover": {
                            border: "3px #AC001E solid",
                          },
                          marginRight: 2
                        }}
                        onClick={(e) => removeTask(e, taskObject.id)}
                        variant="outlined"
                        >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </List>
              )})}
            </Box>
          </Container>
    </Container>
)
}