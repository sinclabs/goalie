import type { Todo } from "./types"

import React, { useEffect, useState } from "react"
import {
  MantineProvider,
  Space,
  Button,
  Title,
  Box,
  MultiSelect,
  SimpleGrid,
} from "@mantine/core"
import { invoke } from "@tauri-apps/api/tauri"
import { CirclePlus, Plus, At } from "tabler-icons-react"

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
        <div className="App-header">
          <Title order={2}>Today's goals</Title>
          <Box
            sx={{
              textAlign: "initial",
            }}
          >
            <SimpleGrid cols={2}>
              <MultiSelect
                data={[{ value: "Someproject", label: "Someproject" }]}
                placeholder={"Select projects to filter"}
                searchable
                clearable
                nothingFound="Nothing found"
                icon={<Plus size={"15"} />}
                variant={"default"}
              />
              <MultiSelect
                data={[{ value: "Place", label: "Someplace" }]}
                placeholder={"Select contexts to filter"}
                searchable
                clearable
                nothingFound="Nothing found"
                icon={<At size={"15"} />}
                variant={"default"}
              />
            </SimpleGrid>
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
          </Box>
        </div>
      </div>
    </MantineProvider>
  )
}

export default App
