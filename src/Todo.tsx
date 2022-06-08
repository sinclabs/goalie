import type { Todo as TodoType } from "./types"

import React, { FC } from "react"
import { Checkbox, Text } from "@mantine/core"

const TodoLabel: FC<{ todo: TodoType }> = ({ todo }) => (
  <Text>
    {todo.content.split(" ").map((word, index) => {
      for (const context of todo.contexts) {
        if (context.index === index) {
          return (
            <>
              {" "}
              <Text
                sx={(theme) => ({
                  backgroundColor: theme.colors.red[8],
                  display: "inline-block",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: theme.colors.red[7],
                  },
                })}
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                }}
              >
                {`${word}`}
              </Text>
            </>
          )
        }
      }
      for (const project of todo.projects) {
        if (project.index === index) {
          return (
            <>
              {" "}
              <Text
                sx={(theme) => ({
                  backgroundColor: theme.colors.blue[9],
                  display: "inline-block",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: theme.colors.blue[7],
                  },
                })}
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                }}
              >
                {`${word}`}
              </Text>
            </>
          )
        }
      }
      return ` ${word}`
    })}
  </Text>
)

const Todo: FC<{ todo: TodoType }> = ({ todo }) => (
  <div>
    <Checkbox
      label={<TodoLabel todo={todo} />}
      checked={todo.is_complete}
      onChange={() => {}}
    />
  </div>
)

export { Todo }
