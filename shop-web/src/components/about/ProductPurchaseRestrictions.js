function ProductPurchaseRestrictions() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 商品限购说明 */}Product purchase restrictions
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 根据不同业务及供应商限制，部分商品会限制单次购买数量与总购买数量，敬请理解。您可继续选购其它喜爱的商品。 */}
          Depending on business and supplier restrictions, some products may
          have a single purchase quantity and total purchase quantity limit,
          please understand. You can continue to purchase other favorite
          products.
        </p>
      </div>
    </div>
  );
}

export default ProductPurchaseRestrictions;
