import { useRef } from 'react'

export function ConfirmationCode() {
  // Task 3
  // Make 4 refs (one for each input)
  const inputRef1 = useRef<HTMLInputElement>(null!)

  // Then remember to attach them to their input DOM and you'll
  // need to listen to each input's onChange to know when to
  // focus on the next input

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // const code =
    //   inputRef1.current.value +
    //   inputRef2.current.value +
    //   inputRef3.current.value +
    //   inputRef4.current.value

    // console.log(code)
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
          // ref={}
          // onChange={}
        />
        <input
          type="text"
          name="input2"
          className="form-field text-3xl text-center"
          autoComplete="off"
        />
        <input
          type="text"
          name="input3"
          className="form-field text-3xl text-center"
          autoComplete="off"
        />
        <input
          type="text"
          name="input4"
          className="form-field text-3xl text-center"
          autoComplete="off"
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
