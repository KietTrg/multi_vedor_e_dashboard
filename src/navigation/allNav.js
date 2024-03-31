import { AiOutlineDollar } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbCategory2 } from "react-icons/tb";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { FiUserX } from "react-icons/fi";
import { GrDocumentUser } from "react-icons/gr";
import { IoChatboxOutline } from "react-icons/io5";
import { TbApps, TbDiscount } from "react-icons/tb";
import { IoIosApps } from "react-icons/io";
import { LuUserCircle2 } from "react-icons/lu";
import { BsChat } from "react-icons/bs";
export const allNav = [
  {
    id: 1,
    title: "Dashboards",
    icon: <LiaTachometerAltSolid size={25} />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <HiOutlineDocumentText size={25} />,
    role: "admin",
    path: "/admin/dashboard/order",
  },
  {
    id: 3,
    title: "Category",
    icon: <TbCategory2 size={25} />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <LuUsers size={25} />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Payment Request",
    icon: <AiOutlineDollar size={25} />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 6,
    title: "Deactive Sellers",
    icon: <FiUserX size={25} />,
    role: "admin",
    path: "/admin/dashboard/deactive-sellers",
  },
  {
    id: 7,
    title: "Sellers Request",
    icon: <GrDocumentUser size={25} />,
    role: "admin",
    path: "/admin/dashboard/seller-request",
  },
  {
    id: 8,
    title: "Chat Seller",
    icon: <IoChatboxOutline size={25} />,
    role: "admin",
    path: "/admin/dashboard/chat-seller",
  },
  {
    id: 13,
    title: "Coupon",
    icon: <TbDiscount size={25} />,
    role: "admin",
    path: "/admin/dashboard/coupon",
  },
  {
    id: 9,
    title: "Dashboards",
    icon: <LiaTachometerAltSolid size={25} />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 10,
    title: "Add Product",
    icon: <TbApps size={25} />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 11,
    title: "All Product",
    icon: <IoIosApps size={25} />,
    role: "seller",
    path: "/seller/dashboard/all-product",
  },

  {
    id: 14,
    title: "Orders",
    icon: <HiOutlineDocumentText size={25} />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 15,
    title: "Payments",
    icon: <AiOutlineDollar size={25} />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: 16,
    title: "Chat Customer",
    icon: <BsChat size={25} />,
    role: "seller",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: 17,
    title: "Chat Support",
    icon: <IoChatboxOutline size={25} />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
  {
    id: 18,
    title: "Profile",
    icon: <LuUserCircle2 size={25} />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
];
