function HowToPay() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 如何支付 */}
        How to pay
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 1、目前您可以通过微信扫码进行支付。 */}
          1. Currently you can pay by scanning the QR code on WeChat.
        </p>
        <p>
          {/* 2、到款时间。 */}
          2. Payment arrival time.
        </p>
        <div>
          {/* 网上支付均是支付成功即到账。若由于网络故障导致您已支付成功的订单未改变订单状态，请您联系我们的客服人员为您解决。 */}
          All online payments are credited to your account upon successful
          payment. If the order status of your successfully paid order does not
          change due to network failure, please contact our customer service
          staff to solve the problem for you.
          <br />
          <strong style={{ color: "#ffd04b" }}>
            {/* 温馨提示：在线支付付款等待期限为2小时。请您在订购成功后2小时内完成支付，否则我们将不会保留您的订单。 */}
            Warm reminder: The waiting period for online payment is 2 hours.
            Please complete the payment within 2 hours after the order is
            successfully placed, otherwise we will not keep your order.
          </strong>
        </div>
      </div>
    </div>
  );
}

export default HowToPay;
