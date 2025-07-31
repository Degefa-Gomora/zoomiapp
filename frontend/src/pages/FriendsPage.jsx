import React, { useEffect, useState } from "react";
import { getUserFriends } from "../../src/lib/api"; 
import FriendCard from "../components/FriendCard"; 

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const data = await getUserFriends(); // GET /users/friends
        setFriends(data);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFriends();
  }, []);

  if (loading) return <div className="p-4">Loading friends...</div>;

  if (friends.length === 0)
    return <div className="p-4 text-center">You have no friends yet</div>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {friends?.map((friend) => (
        <FriendCard key={friend._id} friend={friend} />
      ))}
    </div>
  );
};

export default FriendsPage;
