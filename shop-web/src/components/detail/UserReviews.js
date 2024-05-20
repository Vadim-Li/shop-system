function UserReviews() {
  return (
    <div className="mt-5" style={{ textAlign: "center", fontSize: "18px" }}>
      {/* 玩家综合评分： */}Player overall rating:&nbsp;&nbsp;
      <span style={{ marginRight: "5px" }}>
        <i
          className="fa fa-star"
          style={{ fontSize: "28px", color: "red" }}
        ></i>
        &nbsp;
        <i
          className="fa fa-star"
          style={{ fontSize: "28px", color: "red" }}
        ></i>
        &nbsp;
        <i
          className="fa fa-star"
          style={{ fontSize: "28px", color: "red" }}
        ></i>
        &nbsp;
        <i className="fa fa-star-o" style={{ fontSize: "28px" }}></i>&nbsp;
        <i className="fa fa-star-o" style={{ fontSize: "28px" }}></i>&nbsp;
      </span>
      <span style={{ color: "#FFCA11", fontSize: "28px" }}>3.0</span>
    </div>
  );
}

export default UserReviews;
