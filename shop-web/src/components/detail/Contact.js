function Contact() {
  return (
    <>
      <div className="my-3">
        <i
          className="fa fa-bank"
          style={{ fontSize: "15px", color: "#A6A6A6" }}
        ></i>
        &nbsp;
        {/* 商家：唐昊科技（武汉）有限公司 */}Merchant: Tang Hao Technology
        (Wuhan) Co., Ltd.
      </div>
      <div className="mb-2">
        <i
          className="fa fa-phone"
          style={{ fontSize: "18px", color: "#A6A6A6" }}
        ></i>
        &nbsp;
        {/* 商家联系方式 */}Business contact information
      </div>
      <div>Telephone：4001013788</div>
      <div>ＱＱ：800848983</div>
      <div className="mb-3">{/* 微信：暂无 */}WeChat: None</div>

      <div className="mb-2">
        <i
          className="fa fa-clock-o"
          style={{ fontSize: "18px", color: "#A6A6A6" }}
        ></i>
        &nbsp;
        {/* 商家服务时间 */}Merchant service hours
      </div>
      <div className="mb-3">
        {/* 在线时间：每天上午09:00-晚上24:00 */}Online hours: 09:00 am to 24:00
        pm every day
      </div>

      <div className="my-3">
        <i
          className="fa fa-archive"
          style={{ fontSize: "15px", color: "#A6A6A6" }}
        ></i>
        &nbsp; 
        {/* 经营者证照信息 */}Operator license information
      </div>
    </>
  );
}

export default Contact;
