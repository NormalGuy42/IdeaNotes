import React from "react"

const EmptyUser = () => {
  return (
    <div className="card-bg p-5 w-96 flex flex-col items-center">
        <img src="../icons/empty-box.png" className="card-img pb-4" alt="" />
        <p className="card-text">Nothing to see here</p>
    </div>
  )
};

export default EmptyUser;
