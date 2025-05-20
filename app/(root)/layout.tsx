import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";

type Props = {
  children: React.ReactNode;
};
function layout({ children }: Props) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
export default layout;
