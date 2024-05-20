function DeliveryProgressQuery() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 配送进度查询 */}
        Delivery progress query
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 1、页面顶部点击"我的订单"进入订单列表页 */}
          1. Click "My Order" at the top of the page to enter the order list
          page
        </p>
        {/* <p>2、点击"订单详情"可看到对应订单配送进度详情，展示如下图</p> */}
        {/* <img
          src="//js01.daoju.qq.com/zb/mall/images/pic_1.jpg"
          width="908"
          height="178"
          alt="配送进度查询"
        ></img> */}
      </div>
    </div>
  );
}

export default DeliveryProgressQuery;
