function DeliveryServiceDescription() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 配送服务说明 */}Delivery Service Description
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 1、运费收取标准 */}
          1. Freight charging standards
        </p>
        <p>
          {/* 部分商品支持包邮服务。对于不包邮商品和地区我们将根据快递收费标准收取少量配送费用。 */}
          Some products support free shipping service. For products and areas
          that do not include free shipping, we will charge a small delivery fee
          based on express delivery standards.
        </p>
        <p>
          {/* 2、配送范围 */}
          2. Delivery scope
        </p>
        <p>
          {/* 聚诚品周边商城的配送范围目前已经覆盖全国境内500多个城市，暂不支持港澳台地区。 */}
          The delivery scope of Jueslite peripheral malls currently covers more
          than 500 cities across the country, and does not currently support
          Hong Kong, Macao and Taiwan.
        </p>
        <p>
          {/* 3、配送所需时间 */}
          3. Delivery time
        </p>
        <p>
          {/* 我们将在核对您所订购的商品（不包括预售及缺货商品）、收货地址、邮政编码、款项
          支付等信息确认无误后，我们会尽快在72小时内将您所下单的商品发货（节假日顺延，活动商品以活动页为准），我们为您提
          供的是最安全与最快捷的快递公司，根据您所在区域的不同，您收到商品的时间可能在
          2至5个工作日内。 */}
          After we verify that the goods you ordered (excluding pre-sale and
          out-of-stock goods), delivery address, postal code, payment and other
          information are correct, we will ship the goods you ordered as soon as
          possible within 72 hours. The goods (postponed on holidays, event
          products are subject to the event page), we provide you with the
          safest and fastest express delivery company, depending on your area,
          the time you receive the goods may be 2 to 5 working days Inside.
        </p>
        <p>
          {/* 4、配送公司 */}
          4. Distribution company
        </p>
        <p>
          {/* 我们为了保证货品能够安全快速的送达，将根据收货地址为您选择不同快递进行配送。
          您可以在登录账号后，点击"我的订单"来及时查看物流信息订单配送的最新动态。 */}
          In order to ensure that the goods can be delivered safely and quickly,
          we will choose different express delivery for you according to the
          delivery address. You can click "My Orders" after logging in to your
          account to view the latest updates on logistics information and order
          delivery in a timely manner.
        </p>
      </div>
    </div>
  );
}

export default DeliveryServiceDescription;
