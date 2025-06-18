import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
  args: {
    id: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) throw new ConvexError("User not found");

    const conversation = await ctx.db.get(args.id);
    if (!conversation) throw new ConvexError("Conversation not found");

    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId_conversationId", (q) =>
        q
          .eq("memberId", currentUser._id)
          .eq("conversationId", conversation._id),
      )
      .unique();

    if (!membership)
      throw new ConvexError("You are not a member of this conversation");

    const allConversationMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_conversationId", (q) => q.eq("conversationId", args.id))
      .collect();

    if (!conversation.isGroup) {
      const otherMembership = allConversationMemberships.filter(
        (membership) => membership.memberId !== currentUser._id,
      )[0];
      const otherMemberDetails = await ctx.db.get(otherMembership.memberId);

      return {
        ...conversation,
        otherMember: {
          ...otherMemberDetails,
          lastSeenMessageId: otherMembership.lastSeenMessage,
        },
        otherMembers: null, // This will be used for group chats
      };
    } else {
      const otherMemberships = allConversationMemberships.filter(
        (membership) => membership.memberId !== currentUser._id,
      );
      const otherMembers = await Promise.all(
        otherMemberships.map(async (membership) => {
          const member = await ctx.db.get(membership.memberId);
          if (!member) throw new ConvexError("Member could not be found");

          return {
            _id: member._id,
            username: member.username,
          };
        }),
      );
      return { ...conversation, otherMembers, otherMember: null };
    }
  },
});

export const createGroup = mutation({
  args: {
    members: v.array(v.id("users")),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) throw new ConvexError("User not found");

    const conversationId = await ctx.db.insert("conversations", {
      isGroup: true,
      name: args.name,
    });

    await Promise.all(
      [...args.members, currentUser._id].map(async (memberId) => {
        await ctx.db.insert("conversationMembers", {
          memberId,
          conversationId,
        });
      }),
    );
  },
});
export const deleteGroup = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) throw new ConvexError("User not found");

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) throw new ConvexError("Conversation not found");

    if (!conversation.isGroup) {
      throw new ConvexError("This is not a group conversation");
    }

    const memberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_conversationId", (q) =>
        q.eq("conversationId", args.conversationId),
      )
      .collect();

    // Check if there are no memberships at all
    if (!memberships || memberships.length === 0) {
      throw new ConvexError("This conversation does not have any members");
    }

    // Verify the current user is a member
    const userMembership = memberships.find(
      (m) => m.memberId === currentUser._id,
    );
    if (!userMembership) {
      throw new ConvexError("You are not a member of this group");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversationId", (q) =>
        q.eq("conversationId", args.conversationId),
      )
      .collect();

    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
    await Promise.all(
      memberships.map((membership) => ctx.db.delete(membership._id)),
    );
    await ctx.db.delete(args.conversationId);

    // await ctx.db.delete(args.conversationId);

    // await Promise.all(
    //   memberships.map(async (membership) => {
    //     await ctx.db.delete(membership._id);
    //   }),
    // );
    // console.log("Delete group was called");
    // // DELETING ALL THE MESSAGES AS WELL IF NO LONGER FRIENDS
    // await Promise.all(
    //   messages.map(async (message) => {
    //     await ctx.db.delete(message._id);
    //   }),
    // );
  },
});

export const leaveGroup = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) throw new ConvexError("User not found");

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) throw new ConvexError("Conversation not found");

    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId_conversationId", (q) =>
        q
          .eq("memberId", currentUser._id)
          .eq("conversationId", args.conversationId),
      )
      .unique();
    if (!membership)
      throw new ConvexError("You are not a member of this group");
    console.log("leave group was called");
    await ctx.db.delete(membership._id);
  },
});

export const markRead = mutation({
  args: {
    conversationId: v.id("conversations"),
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) throw new ConvexError("User not found");

    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId_conversationId", (q) =>
        q
          .eq("memberId", currentUser._id)
          .eq("conversationId", args.conversationId),
      )
      .unique();
    if (!membership)
      throw new ConvexError("You are not a member of this group");

    const lastMessage = await ctx.db.get(args.messageId);

    await ctx.db.patch(membership._id, {
      lastSeenMessage: lastMessage ? lastMessage._id : undefined,
    });
  },
});
