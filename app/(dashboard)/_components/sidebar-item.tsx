import { LucideIcon } from "lucide-react";
import React from "react";
interface SideItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}
export const SidebarItem = ({ icon, label, href }: SideItemProps) => {
  return <div>Sidebar Item!</div>;
};
