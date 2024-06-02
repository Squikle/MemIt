import { LoginForm } from "../components/LoginForm/LoginForm.tsx";
import "./pageStyles.css";

export function LoginPage() {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-100px",
  };

  return (
    <main className="container">
      <div className="content" style={style}>
        <LoginForm></LoginForm>
      </div>
    </main>
  );
}
