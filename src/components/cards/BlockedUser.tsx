import React from "react"

const BlockedUserCard = () => {
  return (
    <div className="card-bg p-5 w-96 flex flex-col items-center">
        <img src="../icons/block.png" className="card-img pb-4" alt="" />
        <p className="card-text">Blocked Page</p>
    </div>
  )
};

export default BlockedUserCard;
