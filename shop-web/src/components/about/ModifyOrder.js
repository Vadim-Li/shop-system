function ModifyOrder() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 下单后如何修改订单 */}
        How to modify an order after placing it
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 客户订单在支付成功后如需修改订单信息的，请务必于付款后的次日十二点前电话联系商城客服，以便在货物发出前及时帮助进行修改，感谢您的支持与配合。 */}
          If the customer order needs to modify the order information after the
          payment is successful, please be sure to contact the mall customer
          service by phone before 12 o'clock the next day after payment, so that
          timely assistance can be made to make modifications before the goods
          are shipped. Thank you for your support and cooperation.
        </p>
      </div>
    </div>
  );
}

export default ModifyOrder;
