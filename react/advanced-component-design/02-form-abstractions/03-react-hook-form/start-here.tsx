import { useForm, SubmitHandler } from 'react-hook-form'

type Fields = {
  email: string
  password: string
}

// https://twitter.com/ReactTraining/status/1729155744665416137

export function LoginForm() {
  const { register, handleSubmit, formState } = useForm<Fields>()

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="form-field"
          autoComplete="off"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: true })}
          className="form-field"
        />
      </div>

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}
