import { useForm, SubmitHandler } from 'react-hook-form'

type Fields = {
  email: string
  password: string
}

// https://twitter.com/ReactTraining/status/1729155744665416137

export function LoginForm() {
  const methods = useForm<Fields>()

  // { register, handleSubmit, formState }
  // {...register('email', { required: true })

  const onSubmit: SubmitHandler<Fields> = (values) => {
    console.log(values)
  }

  // Talking Points
  // Notice how register w/required doesn't give us a `required` attribute to spread
  // Add `required` attribute and then `noValidate` on form

  return (
    <form className="space-y-3">
      <div>
        <label>Email</label>
        <input type="email" className="form-field" autoComplete="off" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" className="form-field" />
      </div>

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}
