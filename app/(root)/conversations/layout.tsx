import ItemList from "@/components/shared/item-list/ItemList";

type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <>
      <ItemList title="Conversations">Conversations page</ItemList>
      {children}
    </>
  );
};
export default layout;
