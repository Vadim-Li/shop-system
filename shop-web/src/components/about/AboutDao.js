import { Container, Row, Col } from "react-bootstrap";

function AboutDao() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 关于道聚城 */}
        About Daoju City
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 道聚城是腾讯游戏的官方道具购买商城，无需等待游戏内直接收货,更安全、更便捷、更实惠。 */}
          Daoju City is the official item purchase mall of Tencent Games. There
          is no need to wait for the goods to be received directly in the game,
          which is safer, more convenient and more affordable.
        </p>
        <p>
          {/* 目前已开通20多款腾讯热门游戏，玩家可以通过网银、财付通和Q点Q币支付购买，通过一系列形式丰富的活动、让玩家享受到实惠。 */}
          At present, more than 20 popular Tencent games have been launched.
          Players can pay for them through online banking, Tenpay and Q-point Q
          coins. Through a series of rich activities, players can enjoy
          benefits.
        </p>
      </div>
    </div>
  );
}

export default AboutDao;
