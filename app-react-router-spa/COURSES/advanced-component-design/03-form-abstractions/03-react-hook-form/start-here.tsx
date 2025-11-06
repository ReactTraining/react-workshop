import { useForm, SubmitHandler } from 'react-hook-form'

type Fields = {
  email: string
  password: string
}

// https://twitter.com/ReactTraining/status/1729155744665416137

export function LoginForm() {
  const { register, handleSubmit, formState } = useForm<Fields>()

  const onSubmit: SubmitHandler<Fields> = (values) => {
    console.log(values)
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          {...register('email', { required: true })}
          type="email"
          className="form-field"
          autoComplete="off"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          {...register('password', { required: true })}
          type="password"
          className="form-field"
        />
      </div>

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}
