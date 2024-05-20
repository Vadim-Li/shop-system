function RegistrationAndLogin() {
  return (
    <div style={{ backgroundColor: "white", padding: "40px" }}>
      <h2
        style={{
          color: "#ffd04b",
          borderBottom: "1px solid #eee",
          height: "60px",
        }}
      >
        {/* 账号注册与登录 */}Account registration and login
      </h2>
      <div style={{ paddingTop: "40px" }}>
        <p>
          {/* 1、如果您已经拥有账号，请点击页面右上方登录按钮，在弹出的对话框内直接输入账号和密码即可。 */}
          1. If you already have an account, please click the login button at
          the top right of the page and enter your account and password directly
          in the pop-up dialog box.
        </p>
        <p>
          {/* 2、如果您没有账号，请申请新的账号，再进行登录。 */}
          2. If you do not have an account, please apply for a new account and
          then log in.
        </p>
      </div>
    </div>
  );
}

export default RegistrationAndLogin;
