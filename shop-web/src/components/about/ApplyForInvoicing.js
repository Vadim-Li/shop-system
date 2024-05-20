function ApplyForInvoicing() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 如何申请开发票 */}
        How to apply for invoicing
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 若您有开发票需求，请联系平台卖家提供发票！ */}
          If you have invoicing needs, please contact the platform seller to
          provide an invoice!
        </p>
      </div>
    </div>
  );
}

export default ApplyForInvoicing;
