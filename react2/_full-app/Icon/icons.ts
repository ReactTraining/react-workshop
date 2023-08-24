// import { IoLogoTwitter, IoLogoGithub } from 'react-icons/io'
import { FiShoppingCart } from 'react-icons/fi'
import { CgMenu } from 'react-icons/cg'
import { MdEmail, MdCancel, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { BsArrowRightCircleFill } from 'react-icons/bs'
import { TiArrowLeft, TiArrowRight, TiArrowDown } from 'react-icons/ti'
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa'

export const icons = {
  email: MdEmail,
  xCircle: MdCancel,
  menu: CgMenu,
  arrowLeft: TiArrowLeft,
  arrowRight: TiArrowRight,
  arrowDown: TiArrowDown,
  arrowRightCircle: BsArrowRightCircleFill,
  checkboxOn: MdCheckBox,
  checkboxOff: MdCheckBoxOutlineBlank,
  cart: FiShoppingCart,
  minus: FaMinus,
  plus: FaPlus,
  trash: FaTrashAlt,
} as const

export type Icons = keyof typeof icons
