import ConversationFallback from "@/components/shared/Conversation/ConversationFallback";
import ItemList from "@/components/shared/item-list/ItemList";

type Props = {};
const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title="Friends">FriendsPage</ItemList>
      <ConversationFallback />
    </>
  );
};
export default FriendsPage;
