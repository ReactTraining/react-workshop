import * as z from 'zod'

const allRules = z.object({
  email: z.string().email().max(150, { message: 'Cannot be more than 150 characters' }),
  username: z.string().min(5, { message: 'Must be at least 5 characters' }),
  password: z.string().min(5, { message: 'Must be at least 5 characters' }),
})

function makeZodSchema(keys: string[]) {
  type Picks = { [key: string]: true }
  const picks = keys.reduce((all: Picks, key: string) => {
    all[key] = true
    return all
  }, {})
  return allRules.pick(picks)
}

/****************************************
 Basic Form Validation
*****************************************/

// const formSchema = allRules.pick({ username: true, password: true })
// // const formSchema = makeZodSchema(['username', 'password'])

// // Can be used in useState<FormErrorType>() for saving state
// // type FormDataType = z.infer<typeof formSchema>
// // type FormErrorType = {
// //   [k in keyof FormDataType]?: string[] | undefined
// // }

// const formValues = { username: 'admin', password: 'pass' }
// const results = formSchema.safeParse(formValues)

// // results.data fails

// if (results.success) {
//   console.log(results.data)
// } else {
//   console.log(results.error.flatten().fieldErrors)
// }
