function UseCoupons() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 如何使用优惠券 */}
        How to use coupons
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 在“个人中心”内的“我的优惠券”中，选择周边优惠券，并选择对应游戏，点击“查询”按钮，即可看到您在此款游戏下拥有的周边商城优惠券。 */}
          In "My Coupons" in "Personal Center", select peripheral coupons,
          select the corresponding game, and click the "Query" button to see the
          peripheral mall coupons you have for this game.
        </p>
        <p>
          {/* 1、对已过期的优惠券，我们将在每年1月份进行统一清理。清理后您将无法再查询到已过期优惠券信息； */}
          1. We will clean up expired coupons in January every year. After
          cleaning, you will no longer be able to query expired coupon
          information;
        </p>
        <p>
          {/* 2、优惠券使用后，对于未支付订单取消后，取消订单后优惠券将自动返回您的账户，其它情况下优惠券将不会退回。 */}
          2. After using the coupon, if you cancel the unpaid order, the coupon
          will be automatically returned to your account after the order is
          canceled. In other cases, the coupon will not be returned.
        </p>
      </div>
    </div>
  );
}

export default UseCoupons;
