import { CgMenu } from 'react-icons/cg'
import { IoClose, IoSearch, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineListAlt } from 'react-icons/md'
import { BiUser } from 'react-icons/bi'
import { HiHeart, HiOutlineHeart, HiOutlineViewGridAdd } from 'react-icons/hi'
import { BsCalendar3, BsArrowLeftCircle, BsArrowRightCircle, BsChatDots } from 'react-icons/bs'
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa'
import { RiHomeFill } from 'react-icons/ri'

export const icons = {
  calendar: BsCalendar3,
  chat: BsChatDots,
  close: IoClose,
  circleArrowLeft: BsArrowLeftCircle,
  circleArrowRight: BsArrowRightCircle,
  createCourse: HiOutlineViewGridAdd,
  courses: MdOutlineListAlt,
  heart: HiHeart,
  heartOutline: HiOutlineHeart,
  home: RiHomeFill,
  menu: CgMenu,
  minus: FaMinus,
  plus: FaPlus,
  search: IoSearch,
  settings: IoSettingsOutline,
  student: BiUser,
  trash: FaTrashAlt,
}
