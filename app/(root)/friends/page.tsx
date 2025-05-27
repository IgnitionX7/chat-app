import ConversationFallback from "@/components/shared/Conversation/ConversationFallback";
import ItemList from "@/components/shared/item-list/ItemList";
import AddFriendDialog from "./_components/AddFriendDialog";

type Props = {};
const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog />}>
        FriendsPage
      </ItemList>
      <ConversationFallback />
    </>
  );
};
export default FriendsPage;
