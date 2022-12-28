import styled from "styled-components";
import { Modal, Button } from "antd";
import useGoogle from "../containers/hooks/google.js"

const StyledButton = styled(Button)`
    height: 60px;
    width: 150px;
    font-size: 15px; font-weight: bold;
    margin: 15px;
`;

const LoginPage = () => {
  const { handleLoginGoogle } = useGoogle();
  return <StyledButton onClick={handleLoginGoogle}>使用Google登入</StyledButton>
}

export default LoginPage