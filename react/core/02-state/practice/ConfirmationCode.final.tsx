import { useRef } from 'react'

export function ConfirmationCode() {
  const inputRef1 = useRef<HTMLInputElement>(null!)
  const inputRef2 = useRef<HTMLInputElement>(null!)
  const inputRef3 = useRef<HTMLInputElement>(null!)
  const inputRef4 = useRef<HTMLInputElement>(null!)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const code =
      inputRef1.current.value +
      inputRef2.current.value +
      inputRef3.current.value +
      inputRef4.current.value

    // // We don't need state or refs to get the values of a form
    // const formData = new FormData(event.currentTarget)
    // const v1 = formData.get('input1') as string
    // const v2 = formData.get('input2') as string
    // const v3 = formData.get('input3') as string
    // const v4 = formData.get('input4') as string
    // const code = v1 + v2 + v3 + v4

    console.log(code)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <p className="text-center">Enter your verification code:</p>
      <div className="flex gap-3 m-auto">
        <input
          type="text"
          name="input1"
          className="form-field text-3xl text-center"
          autoComplete="off"
          ref={inputRef1}
          onChange={() => inputRef2.current.focus()}
        />
        <input
          type="text"
          name="input2"
          className="form-field text-3xl text-center"
          autoComplete="off"
          ref={inputRef2}
          onChange={() => inputRef3.current.focus()}
        />
        <input
          type="text"
          name="input3"
          className="form-field text-3xl text-center"
          autoComplete="off"
          ref={inputRef3}
          onChange={() => inputRef4.current.focus()}
        />
        <input
          type="text"
          name="input4"
          className="form-field text-3xl text-center"
          autoComplete="off"
          ref={inputRef4}
        />
      </div>
      <div className="w-fit m-auto">
        <button type="submit" className="button">
          Verify
        </button>
      </div>
    </form>
  )
}
