import { useForm, SubmitHandler } from 'react-hook-form'

type Fields = {
  email: string
  password: string
}

// https://twitter.com/ReactTraining/status/1729155744665416137

export function LoginForm() {
  const { register, handleSubmit, formState } = useForm<Fields>()

  // {...register('email', { required: true })

  const onSubmit: SubmitHandler<Fields> = (values) => {
    console.log(values)
  }

  // Talking Points
  // Notice how register w/required doesn't give us a `required` attribute to spread
  // Add `required` attribute and then `noValidate` on form

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label>Email</label>
        <input {...register('email')} type="email" className="form-field" autoComplete="off" />
      </div>
      <div>
        <label>Password</label>
        <input {...register('password')} type="password" className="form-field" />
      </div>

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}
