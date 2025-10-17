import { useState } from "react"

export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState)

  const onInputChange = ({ target }) => {
    const { name, type, value, files } = target

    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }))
  }

  return {
    form,
    setForm,
    onInputChange,
  }
}
