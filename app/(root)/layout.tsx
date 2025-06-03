import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";

type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
export default Layout;
