import axios from "axios";
import { useState } from "react";
import { useConnect, Provider } from "wagmi";

interface Window {
  ethereum: any;
}

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [
    {
      data: { connectors },
    },
    connect,
  ] = useConnect();
  const [accessToken, setAcceesToken] = useState("");

  const api = () =>
    axios.create({
      baseURL: "http://localhost:4001",
    });

  const apiGetChallenge = () => {
    return api().get("/auth/challenge");
  };

  const apiSendSignature = (signature: string) => {
    return api().post("/auth/getaccesstoken", {
      signature,
    });
  };

  // const renderBody = () => {
  //   return (
  //     <div>
  //       <button
  //         onClick={async () => {
  //           const { data: wallet } = await connect(connectors?.[0]);
  //           const { data: challenge } = await apiGetChallenge();
  //           console.log(1);

  //           const signature = await (window as Window).ethereum.request({
  //             method: "eth_signTypedData",
  //             params: [challenge, wallet?.account],
  //           });
  //           console.log(2);

  //           const { data: address } = await apiSendSignature(signature);
  //           console.log(address);
  //         }}
  //       >
  //         login
  //       </button>
  //     </div>
  //   );
  // };

  return (
    <div>
      <button
        onClick={async () => {
          const { data: wallet } = await connect(connectors?.[0]);
          const { data: challenge } = await apiGetChallenge();
          const signature = await (window as Window).ethereum.request({
            method: "eth_signTypedData",
            params: [challenge, wallet?.account],
          });
          const {
            data: { accessToken },
          } = await apiSendSignature(signature);
          setAcceesToken(accessToken);
        }}
      >
        login
      </button>
      <div>accessToken: {accessToken}</div>
    </div>
  );

  // return (
  //   <Provider autoConnect connectors={connectors}>
  //     {renderBody()}
  //   </Provider>
  // );
}
