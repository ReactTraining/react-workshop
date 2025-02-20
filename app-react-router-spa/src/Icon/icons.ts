import { LuPalmtree } from 'react-icons/lu'
import { FiShoppingCart } from 'react-icons/fi'
import { CgMenu } from 'react-icons/cg'
import { HiChevronDown } from 'react-icons/hi'
import { MdEmail, MdCancel, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { FaTrashAlt, FaPlus, FaMinus, FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { BsCalendar2Week } from 'react-icons/bs'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export const icons = {
  calendar: BsCalendar2Week,
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
  star: AiFillStar,
  starOutline: AiOutlineStar,
  trash: FaTrashAlt,
  warning: FaExclamationCircle,
  xCircle: MdCancel,
} as const

export type Icons = keyof typeof icons
