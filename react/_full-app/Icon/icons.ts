import { LuPalmtree } from 'react-icons/lu'
import { FiShoppingCart } from 'react-icons/fi'
import { CgMenu } from 'react-icons/cg'
import { HiChevronDown } from 'react-icons/hi'
import { MdEmail, MdCancel, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
// import { BsArrowRightCircleFill } from 'react-icons/bs'
// import { TiArrowLeft, TiArrowRight, TiArrowDown } from 'react-icons/ti'
import { FaTrashAlt, FaPlus, FaMinus, FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

export const icons = {
  cart: FiShoppingCart,
  chevronDown: HiChevronDown,
  checkboxOn: MdCheckBox,
  checkboxOff: MdCheckBoxOutlineBlank,
  email: MdEmail,
  menu: CgMenu,
  minus: FaMinus,
  palm: LuPalmtree,
  plus: FaPlus,
  signIn: FaSignInAlt,
  trash: FaTrashAlt,
  warning: FaExclamationCircle,
  xCircle: MdCancel,
} as const

export type Icons = keyof typeof icons
