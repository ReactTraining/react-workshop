// https://github.com/eps1lon/types-react-codemod

interface Props {
  stuff: string
}

const MyComp: React.FC<Props> = () => {}

////// React.FunctionComponent<React.PropsWithChildren<Props>>

const MyComp2: React.FunctionComponent<React.PropsWithChildren<Props>> = ({ stuff, children }) => {
  return <div></div>
}

///////

interface Props3 {
  children: React.ReactNode
  stuff: string
}

function MyComp3({ children, stuff }: Props3) {}
