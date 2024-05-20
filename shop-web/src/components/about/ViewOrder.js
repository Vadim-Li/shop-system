function ViewOrder() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 如何查看订单 */}How to view an order
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 1、页面顶部点击“我的账户-我的订单” 即可查看我的全部订单信息
          ,未登录用户需要先进行登录 */}
          1. Click "My Account - My Orders" at the top of the page to view all
          my order information. Users who are not logged in need to log in
          first.
        </p>
        <p>
          {/* 2、进入我的订单页面 点击 订单详情即可查看订单详细信息。 */}
          2. Enter the My Order page and click Order Details to view the order
          details.
        </p>
      </div>
    </div>
  );
}

export default ViewOrder;
