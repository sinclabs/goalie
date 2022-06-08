type SpecialContentToken = {
  value: string
  index: number
}

type Todo = {
  is_complete: boolean
  priority: string
  creation_date: string
  completion_date: string
  projects: SpecialContentToken[]
  contexts: SpecialContentToken[]
  content: string
}

export type { Todo }
