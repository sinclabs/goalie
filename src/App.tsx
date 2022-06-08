import type { Todo } from "./types"

import React, { useEffect, useState } from "react"
import { MantineProvider, Space, Button, Title, Box } from "@mantine/core"
import { invoke } from "@tauri-apps/api/tauri"
import { CirclePlus } from "tabler-icons-react"

import { Todo as TodoComponent } from "./Todo"

import "./App.css"

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    invoke("get_todos")
      .then((todo) => {
        todo && setTodos(JSON.parse(todo as string))
      })
      .catch((err) => console.error(">>> Error", err))
  }, [])

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="App">
        <header className="App-header">
          <div>
            <Title order={2}>Today's goals</Title>
            <Space h="md" />
            <Box
              sx={{
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {todos.map((todo, index) => (
                <>
                  <TodoComponent todo={todo} key={index} />
                  <Space h={"xs"} />
                </>
              ))}
            </Box>
            <Space h="sm" />
            <Button
              fullWidth
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              leftIcon={<CirclePlus />}
            >
              Add new goal
            </Button>
          </div>
        </header>
      </div>
    </MantineProvider>
  )
}

export default App
